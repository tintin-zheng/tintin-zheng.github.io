// Development-only regression checks. No production files are modified.
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.FILM_PLAYWRIGHT_MODULE || 'playwright');

const indexUrl = pathToFileURL(path.resolve(__dirname, '../index.html')).href;
const scenarios = [
  { width: 1440, count: 12 },
  { width: 390, count: 12 },
  { width: 1920, count: 30 },
  { width: 1440, count: 3 },
  { width: 390, count: 30, reduced: true }
];

async function state(page, id) {
  return page.evaluate(id => {
    const roll = document.querySelector(`[data-roll="${id}"]`);
    const clip = roll.querySelector('.film-roll__clip');
    const strip = roll.querySelector('.film-strip');
    return {
      width: clip.clientWidth,
      stock: strip.offsetWidth,
      scroll: clip.scrollLeft,
      leader: strip.getBoundingClientRect().right - clip.getBoundingClientRect().left,
      pull: parseFloat(strip.style.getPropertyValue('--film-pull')) || 0,
      endPull: parseFloat(strip.style.getPropertyValue('--film-end-pull')) || 0,
      open: roll.classList.contains('is-open'),
      expanded: roll.querySelector('button').getAttribute('aria-expanded'),
      inert: roll.querySelector('.film-roll__drawer').inert
    };
  }, id);
}

async function sampleMotion(page, id, reduced, closing) {
  return page.evaluate(async ({ id, reduced, closing }) => {
    const roll = document.querySelector(`[data-roll="${id}"]`);
    const clip = roll.querySelector('.film-roll__clip');
    const strip = roll.querySelector('.film-strip');
    const from = clip.scrollLeft;
    const initialWidth = clip.clientWidth;
    const stock = strip.offsetWidth;
    const top = strip.getBoundingClientRect().top;
    const samples = [];
    if (closing) roll.querySelector('button').click();
    const start = performance.now();
    await new Promise(resolve => {
      function frame(now) {
        const width = clip.clientWidth;
        const max = Math.max(0, stock - width);
        const leader = strip.getBoundingClientRect().right - clip.getBoundingClientRect().left;
        samples.push({
          width,
          error: closing
            ? Math.abs(clip.scrollLeft - Math.min(max, from + Math.max(0, initialWidth - width)))
            : Math.abs(leader - Math.min(stock, width)),
          verticalShift: strip.getBoundingClientRect().top - top
        });
        if (now - start < (reduced ? 100 : 1050)) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });
    return samples;
  }, { id, reduced, closing });
}

async function run() {
  const browser = await chromium.launch({
    headless: true,
    ...(process.env.FILM_BROWSER_EXECUTABLE ? { executablePath: process.env.FILM_BROWSER_EXECUTABLE } : {})
  });
  try {
    for (const { width, count, reduced = false } of scenarios) {
      const page = await browser.newPage({
        viewport: { width, height: 1100 },
        reducedMotion: reduced ? 'reduce' : 'no-preference'
      });
      try {
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        // External icon/font services are not needed for film checks.
        await page.route('**/*', route => route.request().url().startsWith('file:') ? route.continue() : route.abort());
        await page.goto(indexUrl);
        await page.evaluate(count => {
          const originals = FILM_ROLLS[1].photos;
          FILM_ROLLS[1].photos = Array.from({ length: count }, (_, i) => originals[i % originals.length]);
          renderFilmRolls();
        }, count);
        for (const id of ['5219', 'gold-200']) {
          const label = `${id}, viewport ${width}, Gold frames ${count}, reduced ${reduced}`;
          const button = page.locator(`[data-roll="${id}"] .film-roll__canister`);
          await button.click();
          const opening = await sampleMotion(page, id, reduced, false);
          assert(Math.max(...opening.map(frame => frame.error)) < 1.5, `Opening leader alignment: ${label}`);
          const opened = await state(page, id);
          assert(opened.width <= opened.stock + 1, `No blank drawer length: ${label}`);
          assert(opened.open && opened.expanded === 'true' && !opened.inert, `Open state: ${label}`);

          await page.locator(`[data-roll="${id}"] .film-roll__clip`).hover();
          await page.mouse.wheel(-180, 0);
          await page.waitForTimeout(250);
          const browsed = await state(page, id);
          if (opened.scroll > 0) assert(browsed.scroll < opened.scroll, `Browsing must not stay locked: ${label}`);
          await page.mouse.wheel(-5000, 0);
          await page.waitForTimeout(300);
          const leftBounced = await state(page, id);
          assert(leftBounced.scroll === 0 && leftBounced.pull < 0.01 && leftBounced.endPull < 0.01, `Left rebound settles: ${label}`);
          await page.mouse.wheel(5000, 0);
          await page.waitForTimeout(300);
          const bounced = await state(page, id);
          assert(bounced.pull < 0.01 && bounced.endPull < 0.01, `Right rebound settles: ${label}`);

          await page.evaluate(id => {
            const clip = document.querySelector(`[data-roll="${id}"] .film-roll__clip`);
            clip.scrollLeft *= 0.3;
          }, id);
          await page.waitForTimeout(40);
          const closing = await sampleMotion(page, id, reduced, true);
          assert(Math.max(...closing.map(frame => frame.error)) < 1.5, `No jump before retraction: ${label}`);
          assert(Math.max(...closing.map(frame => Math.abs(frame.verticalShift))) < 1, `No vertical jump: ${label}`);
          for (let i = 1; i < closing.length; i++) {
            assert(closing[i].width <= closing[i - 1].width, `Continuous retraction: ${label}`);
          }
          const closed = await state(page, id);
          assert(closed.width === 0 && !closed.open && closed.expanded === 'false' && closed.inert, `Closed state: ${label}`);

          // Verify final state after interruption, not every intermediate frame.
          await button.click();
          await page.waitForTimeout(120);
          await button.click();
          await page.waitForTimeout(80);
          await button.click();
          await page.waitForTimeout(reduced ? 100 : 1050);
          const reopened = await state(page, id);
          assert(Math.abs(reopened.leader - Math.min(reopened.stock, reopened.width)) < 1.5, `Rapid toggle final stop: ${label}`);
          assert(reopened.open && reopened.expanded === 'true' && !reopened.inert, `Rapid toggle final state: ${label}`);
        }
        assert.deepEqual(errors, [], 'Browser JavaScript errors');
        console.log(`PASS viewport=${width}, Gold frames=${count}, reduced-motion=${reduced}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});

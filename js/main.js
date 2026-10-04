/**
 * main.js — 主题切换、语言切换、渲染项目列表
 */

// ============================================
// 数据
// ============================================

const PROJECTS = [
  {
    category: 'personal',
    name: {
      zh: 'LensCue — 专业提词器',
      en: 'LensCue — Professional Teleprompter'
    },
    logo: 'images/lenscue-logo.png',
    logoAlt: {
      zh: 'LensCue 应用图标',
      en: 'LensCue app icon'
    },
    desc: {
      zh: '一款面向演讲、录制、直播与采访的本地优先专业提词器，使用 SwiftUI 与 ArkTS / ArkUI 分别构建 iOS 和 HarmonyOS NEXT 原生版本。支持沉浸式自动滚动、镜像提词、节点跳转、五级重要性标记、文稿导入导出与本地备份，并适配中英文、深色模式、手机和平板；HarmonyOS 版本现已上架 AppGallery。',
      en: 'A local-first professional teleprompter for speeches, recording, livestreaming, and interviews, with native iOS and HarmonyOS NEXT apps built in SwiftUI and ArkTS / ArkUI. It features immersive auto-scrolling, mirror mode, marker navigation, five-level importance labels, document transfer and local backups, plus bilingual, dark-mode, phone, and tablet support. The HarmonyOS version is now available on AppGallery.'
    },
    tags: ['SwiftUI', 'ArkTS', 'ArkUI', 'iOS', 'HarmonyOS NEXT'],
    appGallery: 'https://appgallery.huawei.com/app/detail?id=com.tintinzheng.lenscue&channelId=SHARE&source=appshare',
    source: 'https://github.com/tintin-zheng/LensCue'
  },
  {
    category: 'personal',
    name: {
      zh: 'Lens-Workbench — 团队器材与任务工作台',
      en: 'Lens-Workbench — Team Equipment & Task Workspace'
    },
    logo: 'images/lens-workbench-logo.png',
    logoAlt: {
      zh: 'Lens-Workbench 团队工作台图标',
      en: 'Lens-Workbench team workspace icon'
    },
    desc: {
      zh: '为 ZJE-Lens 摄影团队开发的器材借还与任务协作网站，面向摄影团队、工作室与社团等小型团队。支持器材库存管理、Kit 成套借还、团队任务参与、借还历史查询与 CSV 导出，并通过中文语音或文字生成可编辑的 AI 借用清单。使用 React 与 TypeScript 构建，结合 Azure Functions 和 Azure SQL，以数据库事务保证并发借用时的库存一致性，适配手机与深色模式。',
      en: 'An equipment lending and task coordination website developed for the ZJE-Lens photography team and other small teams, studios, and clubs. It supports inventory management, equipment kits, task participation, lending history, and CSV export, with AI-assisted borrowing lists generated from Chinese voice or text input. Built with React and TypeScript, Azure Functions, and Azure SQL, it uses database transactions to maintain inventory consistency during concurrent borrowing and supports mobile layouts and dark mode.'
    },
    tags: ['React', 'TypeScript', 'Azure Functions', 'Azure SQL', 'Azure AI Speech', 'DeepSeek'],
    demo: 'https://kind-island-032130600.7.azurestaticapps.net/',
    source: 'https://github.com/tintin-zheng/Lens-Workbench'
  },
  {
    category: 'research',
    name: {
      zh: 'TCGA 湿实验验证靶点挖掘管线',
      en: 'TCGA Wet-Lab Validated Target Mining Pipeline'
    },
    desc: {
      zh: '基于大语言模型的自动化文献挖掘管线，系统地从高质量生物医学文献中筛选 33 种 TCGA 癌型中经过湿实验验证的分子靶点。覆盖 ~67,000 篇论文，提取 ~32,000 条靶点-疾病关联。支持多线程并发、断点续跑与 HGNC 基因名标准化。',
      en: 'An LLM-powered automated pipeline that systematically mines wet-lab experimentally validated molecular targets across all 33 TCGA cancer types from high-impact biomedical literature. Screened ~67,000 papers and extracted ~32,000 target-disease associations, with multi-threaded concurrency, checkpoint/resume, and HGNC gene standardization.'
    },
    tags: ['Python', 'LLM', 'PubMed API', 'DeepSeek', 'TCGA', 'DepMap'],
    source: 'https://github.com/tintin-zheng/TCGA_Wet_Lab_Validated_Target_Mining'
  }
];

// 照片墙清单：把网页尺寸的照片放进 images/photos 后，
// 只需在这里添加文件名，螺旋会自动适配照片数量。
const PHOTO_FILES = [
  '冬日的树.jpg',
  '新旧.jpg',
  '樱花.JPG',
  '月全食.jpg',
  '福州的树.JPG',
  '滕王阁.jpg',
  '西禅古寺.JPG',
  '篁岭.JPG',
  '鸟.jpg',
  'zju.jpg',
];

const PHOTOS = PHOTO_FILES.map(filename => ({
  src: `images/photos/${filename}`,
  alt: filename.replace(/\.[^.]+$/, '')
}));

// 在 photos 中添加 { src: 'images/film/photos/文件名.jpg', alt: '说明' }。
// 空数组显示未曝光的胶片帧，已有照片不会被误当作胶片作品。
const FILM_ROLLS = [
  {
    id: '5219', name: { zh: '柯达 5219', en: 'Kodak 5219' },
    stock: '500T · 35mm', sprite: 'images/film/kodak-5219-pixel.png',
    photos: [2, 41, 44, 49, 51, 54, 55, 65, 67].map(number => ({
      src: `images/film/photos/5219/${String(number).padStart(6, '0')}.jpg`,
      alt: `Kodak 5219 · ${String(number).padStart(2, '0')}`,
      frame: number
    }))
  },
  {
    id: 'gold-200', name: { zh: '柯达金 200', en: 'Kodak Gold 200' },
    stock: '200 · 35mm', sprite: 'images/film/kodak-gold-200-pixel.png',
    photos: [3, 4, 11, 13, 17, 19, 22, 25, 27, 33, 35, 36].map(number => ({
      src: `images/film/photos/gold-200/${String(number).padStart(6, '0')}.jpg`,
      alt: `Kodak Gold 200 · ${String(number).padStart(2, '0')}`,
      frame: number
    }))
  }
];

let filmScrollCleanups = [];

function renderFilmRolls() {
  const list = document.getElementById('film-list');
  if (!list) return;
  filmScrollCleanups.forEach(cleanup => cleanup());
  filmScrollCleanups = [];
  const openIds = new Set(Array.from(list.querySelectorAll('.film-roll.is-open'), el => el.dataset.roll));
  list.innerHTML = FILM_ROLLS.map(roll => {
    const open = openIds.has(roll.id);
    const frames = roll.photos.length ? roll.photos : [null, null, null];
    return `
      <article class="film-roll${open ? ' is-open' : ''}" data-roll="${roll.id}">
        <button class="film-roll__canister" type="button" aria-expanded="${open}" aria-controls="film-strip-${roll.id}">
          <img src="${roll.sprite}" alt="${roll.name[getLang()]}" width="1024" height="1536" loading="lazy" decoding="async" draggable="false">
          <span class="film-roll__name">${roll.name[getLang()]}</span>
          <span class="film-roll__stock">${roll.stock}</span>
          <span class="film-roll__action">${t(open ? 'film.close' : 'film.open')}</span>
        </button>
        <div class="film-roll__drawer" id="film-strip-${roll.id}" aria-hidden="${!open}"${open ? '' : ' inert'}>
          <div class="film-roll__clip">
            <div class="film-strip">
              ${frames.map((photo, index) => `
                <figure class="film-strip__frame">
                  <span class="film-strip__number" aria-hidden="true">${String(photo?.frame ?? index + 1).padStart(2, '0')}</span>
                  ${photo ? `<img src="${photo.src}" alt="${photo.alt || ''}" loading="lazy" decoding="async" draggable="false">` : `<div class="film-strip__empty" aria-hidden="true"></div>`}
                </figure>
              `).join('')}
              ${roll.photos.length ? '' : `<p class="film-strip__note">${t('film.empty')}</p>`}
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  list.querySelectorAll('.film-roll').forEach(roll => {
    const clip = roll.querySelector('.film-roll__clip');
    const strip = roll.querySelector('.film-strip');
    const scroll = initFilmScroll(roll, clip, strip);
    filmScrollCleanups.push(scroll.cleanup);
    roll.querySelector('.film-roll__canister').addEventListener('click', () => scroll.reset());
  });

  list.querySelectorAll('.film-roll__canister').forEach(button => {
    button.addEventListener('click', () => {
      const roll = button.closest('.film-roll');
      const open = roll.classList.toggle('is-open');
      const drawer = roll.querySelector('.film-roll__drawer');
      button.setAttribute('aria-expanded', String(open));
      button.querySelector('.film-roll__action').textContent = t(open ? 'film.close' : 'film.open');
      drawer.setAttribute('aria-hidden', String(!open));
      drawer.inert = !open;
    });
  });
}

function initFilmScroll(roll, clip, strip) {
  let position = clip.scrollLeft;
  let pull = 0;
  let endPull = 0;
  let pointer = null;
  let reboundFrame = 0;
  let wheelIdleTimer;
  let wheelEdge = 0;
  let scrollbarIdleTimer;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // One strip owns the stock, photos, leader, and both rows of perforations.
  // Pulling right adds length to its left padding, rather than translating it
  // away from the cartridge or painting a second stock layer underneath.
  const maxScroll = () => Math.max(0, strip.getBoundingClientRect().width - pull - clip.clientWidth);
  function paint() {
    const max = maxScroll();
    const limit = Math.max(36, Math.min(120, clip.clientWidth * 0.25));
    const resistance = distance => limit * (1 - Math.exp(-distance / limit));
    pull = position < 0 ? resistance(-position) : 0;
    endPull = position > max ? resistance(position - max) : 0;
    strip.style.setProperty('--film-pull', `${pull}px`);
    strip.style.setProperty('--film-end-pull', `${endPull}px`);
    // Do not let layout/scroll anchoring change the logical scroll position.
    clip.scrollLeft = Math.max(0, Math.min(max, position));
  }
  function showScrollbar() {
    clip.classList.add('is-scrolling');
    clearTimeout(scrollbarIdleTimer);
    scrollbarIdleTimer = setTimeout(() => clip.classList.remove('is-scrolling'), 900);
  }
  function stopRebound() {
    cancelAnimationFrame(reboundFrame);
    reboundFrame = 0;
  }
  function rebound() {
    stopRebound();
    const from = position;
    const target = Math.max(0, Math.min(maxScroll(), from));
    if (from === target) { paint(); clip.classList.remove('is-elastic'); return; }
    clip.classList.add('is-elastic');
    showScrollbar();
    if (reduceMotion.matches) {
      position = target;
      paint();
      clip.classList.remove('is-elastic');
      return;
    }
    const start = performance.now();
    const visualPull = pull + endPull;
    const limit = Math.max(36, Math.min(120, clip.clientWidth * 0.25));
    const direction = Math.sign(from - target);
    function step(now) {
      const progress = Math.min(1, (now - start) / 200);
      // Ease the visible distance, not the accumulated gesture distance:
      // a strong pull should start returning immediately, not linger at its cap.
      const distance = visualPull * Math.pow(1 - progress, 3);
      position = target + direction * (-limit * Math.log1p(-Math.min(0.999999, distance / limit)));
      paint();
      if (progress < 1) reboundFrame = requestAnimationFrame(step);
      else { reboundFrame = 0; clip.classList.remove('is-elastic'); }
    }
    reboundFrame = requestAnimationFrame(step);
  }
  function move(next) {
    const max = maxScroll();
    clip.classList.add('is-elastic');
    position = Math.max(-800, Math.min(max + 800, next));
    paint();
    showScrollbar();
  }
  function onScroll() {
    // Native scrollbar/keyboard navigation remains available.
    if (!pull && !endPull && !reboundFrame && !pointer?.dragging) position = clip.scrollLeft;
    showScrollbar();
  }
  function onWheel(event) {
    if (!roll.classList.contains('is-open') || event.ctrlKey) return;
    const horizontal = Math.abs(event.deltaX) >= Math.abs(event.deltaY);
    let delta = horizontal ? event.deltaX : event.shiftKey ? event.deltaY : 0;
    if (!delta) return; // Keep ordinary vertical page scrolling.
    if (event.deltaMode === 1) delta *= 16;
    if (event.deltaMode === 2) delta *= clip.clientWidth;
    event.preventDefault();
    const max = maxScroll();
    const next = position + delta;
    const edge = next < 0 ? -1 : next > max ? 1 : 0;
    clearTimeout(wheelIdleTimer);
    wheelIdleTimer = setTimeout(() => { wheelEdge = 0; }, 100);
    // Momentum from one trackpad pull must not postpone or restart its rebound.
    if (edge && wheelEdge === edge) { showScrollbar(); return; }
    wheelEdge = edge;
    stopRebound();
    move(next);
    rebound();
  }
  function onPointerDown(event) {
    if (!roll.classList.contains('is-open') || !event.isPrimary || event.button !== 0) return;
    // Leave the native scrollbar itself draggable.
    if (event.clientY >= clip.getBoundingClientRect().bottom - 8) return;
    stopRebound();
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, start: position, dragging: false };
    clip.setPointerCapture(event.pointerId);
  }
  function onPointerMove(event) {
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.x;
    const dy = event.clientY - pointer.y;
    if (!pointer.dragging) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      if (Math.abs(dy) > Math.abs(dx)) { pointer = null; rebound(); return; }
      pointer.dragging = true;
      clip.classList.add('is-dragging');
    }
    event.preventDefault();
    move(pointer.start - dx);
  }
  function onPointerUp(event) {
    if (!pointer || pointer.id !== event.pointerId) return;
    if (clip.hasPointerCapture(event.pointerId)) clip.releasePointerCapture(event.pointerId);
    pointer = null;
    clip.classList.remove('is-dragging');
    rebound();
  }
  function reset() {
    stopRebound();
    clearTimeout(wheelIdleTimer);
    wheelEdge = 0;
    if (pointer && clip.hasPointerCapture(pointer.id)) clip.releasePointerCapture(pointer.id);
    pointer = null;
    clip.classList.remove('is-dragging', 'is-elastic');
    position = clip.scrollLeft;
    paint();
  }

  clip.addEventListener('scroll', onScroll, { passive: true });
  clip.addEventListener('wheel', onWheel, { passive: false });
  clip.addEventListener('pointerdown', onPointerDown);
  clip.addEventListener('pointermove', onPointerMove);
  clip.addEventListener('pointerup', onPointerUp);
  clip.addEventListener('pointercancel', onPointerUp);
  clip.addEventListener('lostpointercapture', onPointerUp);
  return {
    reset,
    cleanup() {
      reset();
      clearTimeout(scrollbarIdleTimer);
      clip.removeEventListener('scroll', onScroll);
      clip.removeEventListener('wheel', onWheel);
      clip.removeEventListener('pointerdown', onPointerDown);
      clip.removeEventListener('pointermove', onPointerMove);
      clip.removeEventListener('pointerup', onPointerUp);
      clip.removeEventListener('pointercancel', onPointerUp);
      clip.removeEventListener('lostpointercapture', onPointerUp);
    }
  };
}

// ============================================
// 渲染
// ============================================
let photoHelixCleanup = null;

function renderPhotos() {
  const el = document.getElementById('photos-grid');
  if (!el) return;

  if (photoHelixCleanup) photoHelixCleanup();

  const cards = [];

  el.innerHTML = `
    <div class="photo-helix__stage"></div>
  `;

  const stage = el.querySelector('.photo-helix__stage');

  // Claude Science 的结构：图片序列复制为两个循环段，每一个纵向
  // 位置再生成相差 180° 的两张卡片，组成首尾连续的双螺旋。
  const loopCopies = 2;
  const phases = [0, 180];

  for (let copy = 0; copy < loopCopies; copy += 1) {
    PHOTOS.forEach((photo, photoIndex) => {
      const index = copy * PHOTOS.length + photoIndex;

      phases.forEach(phase => {
        const primary = copy === 0 && phase === 0;
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.dataset.index = String(index);
        card.dataset.phase = String(phase);
        card.dataset.primary = String(primary);
        card.setAttribute('aria-hidden', String(!primary));
        card.innerHTML = `<img src="${photo.src}" alt="${primary ? photo.alt : ''}" loading="lazy" draggable="false">`;
        stage.appendChild(card);
        cards.push({ element: card });
      });
    });
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let travel = 0;
  let paused = reduceMotion.matches;
  let dragging = false;
  let pointerStartX = 0;
  let pointerStartY = 0;
  let travelStart = 0;
  let frameId = 0;
  let lastTime = performance.now();
  let inView = true;
  const observer = new IntersectionObserver(entries => {
    inView = entries[0]?.isIntersecting ?? true;
  }, { rootMargin: '100px 0px' });

  observer.observe(el);

  function layout() {
    const width = el.clientWidth;
    const height = el.clientHeight;
    if (!width || !height || !PHOTOS.length) return;

    const cardWidth = Math.min(340, Math.max(180, window.innerWidth * 0.187));
    // 不按容器宽度压缩圆柱。左右边缘自然裁切，才能保持卡片
    // 之间的真实弧长；1.72 比官方约 1.57 的比例多留少量安全间隔。
    const radius = cardWidth * 1.72;
    const naturalGap = cardWidth * 0.34;
    const sparseGap = (height * 1.75) / PHOTOS.length;
    const gap = Math.max(naturalGap, sparseGap);
    const itemCount = PHOTOS.length * loopCopies;
    const loopLength = itemCount * gap;
    const fadeStart = height * 0.82;
    const fadeEnd = height * 0.98;
    const helixEm = cardWidth / 22;

    el.style.setProperty('--photo-card-width', `${cardWidth.toFixed(2)}px`);

    const wrap = value => ((value + loopLength / 2) % loopLength + loopLength) % loopLength - loopLength / 2;

    cards.forEach(({ element }) => {
      const index = Number(element.dataset.index);
      const phase = Number(element.dataset.phase);
      const y = wrap(index * gap + travel);
      const angleDegrees = -(y / gap) * 34 + phase;
      const angle = angleDegrees * (Math.PI / 180);
      const x = radius * Math.sin(angle);
      const z = radius * (Math.cos(angle) - 1);
      const recede = (-z / (radius * 2)) * 0.85;
      const blur = 0.75 * recede * recede * helixEm;
      const absoluteY = Math.abs(y);
      const baseScale = Math.max(0, 1 - absoluteY / (height * 8.4));
      let edgeScale = 1;

      if (absoluteY > fadeStart) {
        const edgeProgress = Math.max(0, Math.min(1, (fadeEnd - absoluteY) / (fadeEnd - fadeStart)));
        edgeScale = edgeProgress * edgeProgress * (3 - 2 * edgeProgress);
      }

      const scale = baseScale * edgeScale;
      const visible = scale > 0.004;

      element.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, ${z.toFixed(2)}px) rotateY(${angleDegrees.toFixed(3)}deg) scale(${scale.toFixed(4)})`;
      element.style.opacity = visible ? '1' : '0';
      element.style.visibility = visible ? 'visible' : 'hidden';
      element.style.filter = blur < 0.02 ? 'none' : `blur(${blur.toFixed(3)}px)`;
      element.style.zIndex = String(Math.max(1, 1000 - Math.round(absoluteY * 0.45)));
      element.style.setProperty('--recede', recede.toFixed(5));
    });
  }

  function animate(now) {
    const delta = Math.min(now - lastTime, 40);
    lastTime = now;
    if (inView && !paused && !dragging) {
      const cardWidth = Math.min(340, Math.max(180, window.innerWidth * 0.187));
      const naturalGap = cardWidth * 0.34;
      const sparseGap = (el.clientHeight * 1.75) / Math.max(PHOTOS.length, 1);
      const gap = Math.max(naturalGap, sparseGap);
      // 约 60 秒完成一整圈，照片数量变化不会改变旋转速度。
      travel += delta * gap * 0.000176;
    }
    if (inView) layout();
    frameId = requestAnimationFrame(animate);
  }

  function onPointerDown(event) {
    if (window.matchMedia('(max-width: 600px)').matches) return;
    dragging = true;
    pointerStartX = event.clientX;
    pointerStartY = event.clientY;
    travelStart = travel;
    el.classList.add('is-dragging');
    el.setPointerCapture(event.pointerId);
  }

  function onPointerMove(event) {
    if (!dragging) return;
    const deltaX = event.clientX - pointerStartX;
    const deltaY = event.clientY - pointerStartY;
    travel = travelStart + deltaY + deltaX * 0.35;
  }

  function onPointerUp(event) {
    if (!dragging) return;
    dragging = false;
    el.classList.remove('is-dragging');
    if (el.hasPointerCapture(event.pointerId)) el.releasePointerCapture(event.pointerId);
  }

  function onKeydown(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      const direction = event.key === 'ArrowLeft' ? -1 : 1;
      travel += direction * Math.max(32, el.clientWidth * 0.04);
    }
  }

  el.addEventListener('pointerdown', onPointerDown);
  el.addEventListener('pointermove', onPointerMove);
  el.addEventListener('pointerup', onPointerUp);
  el.addEventListener('pointercancel', onPointerUp);
  el.addEventListener('keydown', onKeydown);

  layout();
  frameId = requestAnimationFrame(animate);

  photoHelixCleanup = () => {
    cancelAnimationFrame(frameId);
    observer.disconnect();
    el.removeEventListener('pointerdown', onPointerDown);
    el.removeEventListener('pointermove', onPointerMove);
    el.removeEventListener('pointerup', onPointerUp);
    el.removeEventListener('pointercancel', onPointerUp);
    el.removeEventListener('keydown', onKeydown);
  };
}

function renderProjects() {
  const el = document.getElementById('projects-list');
  if (!el) return;
  const lang = getLang();
  // Decorative, hand-drawn SVGs share a stroke style and inherit theme colour.
  const groupIcons = {
    research: `<svg class="project-group__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <path d="M6 4h2v6c0 2-1 4-2 6l-3.2 5.8Q1.7 24 4.2 24h10.6q2.5 0 1.4-2.2L12 14q-1-2-1-4V4h2M5.4 17h8.2M17.5 7H19v14a3 3 0 0 0 6 0V7h1.5M19 12h6"/>
      <g fill="currentColor" stroke="none">
        <circle cx="8" cy="20" r=".7"/><circle cx="11.5" cy="21.5" r=".7"/>
        <circle cx="22.5" cy="16" r=".7"/><circle cx="21.5" cy="19" r=".7"/>
      </g>
    </svg>`,
    personal: `<svg class="project-group__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
      <rect x="3.5" y="5" width="21" height="18" rx="2"/>
      <path d="M3.5 10.5h21M10 14.25l-2.5 2.5 2.5 2.5M18 14.25l2.5 2.5-2.5 2.5M15.2 13.75l-2.4 6"/>
      <circle cx="7" cy="7.8" r=".6" fill="currentColor" stroke="none"/>
      <circle cx="10" cy="7.8" r=".6" fill="currentColor" stroke="none"/>
    </svg>`
  };
  const renderItem = p => `
    <div class="project-item">
      ${p.logo ? `
        <div class="project-item__intro">
          <img
            class="project-item__logo"
            src="${p.logo}"
            alt="${p.logoAlt?.[lang] || ''}"
            width="64"
            height="64"
            loading="lazy"
            decoding="async"
          >
          <div class="project-item__name">${p.name[lang]}</div>
        </div>
      ` : `<div class="project-item__name">${p.name[lang]}</div>`}
      <div class="project-item__desc">${p.desc[lang]}</div>
      <div class="project-item__tags">
        ${p.tags.map(t => `<span class="project-item__tag">${t}</span>`).join('')}
      </div>
      <div class="project-item__links">
        ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">${t('projects.demo')} →</a>` : ''}
        ${p.appGallery ? `<a href="${p.appGallery}" target="_blank" rel="noopener">${t('projects.appgallery')} →</a>` : ''}
        ${p.source ? `<a href="${p.source}" target="_blank" rel="noopener">${t('projects.source')} →</a>` : ''}
      </div>
    </div>
  `;
  // 明确分组顺序；新增项目只需填写 research 或 personal 分类。
  el.innerHTML = ['research', 'personal'].map(category => {
    const projects = PROJECTS.filter(p => p.category === category);
    if (!projects.length) return '';
    return `
      <section class="project-group" aria-labelledby="projects-${category}-title">
        <h3 class="project-group__title" id="projects-${category}-title">${groupIcons[category]}<span>${t(`projects.${category}`)}</span></h3>
        <div class="project-group__list">${projects.map(renderItem).join('')}</div>
      </section>
    `;
  }).join('');
}

// ============================================
// 语言
// ============================================
function getLang() {
  const s = localStorage.getItem('lang');
  if (s === 'zh' || s === 'en') return s;
  return 'en';
}

function t(key) {
  return translations[getLang()]?.[key] || translations.en[key] || key;
}

function setLang(lang) {
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = translations[lang]?.[key];
    if (text !== undefined) el.textContent = text;
  });

  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const key = el.getAttribute('data-i18n-alt');
    const text = translations[lang]?.[key];
    if (text !== undefined) el.setAttribute('alt', text);
  });

  renderProjects();
  renderFilmRolls();
}

function toggleLang() {
  setLang(getLang() === 'zh' ? 'en' : 'zh');
}

// ============================================
// 主题
// ============================================
function getTheme() {
  const s = localStorage.getItem('theme');
  if (s) return s;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  const themeButton = document.getElementById('theme-toggle');
  if (themeButton) {
    themeButton.innerHTML = t === 'dark'
      ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>'
      : '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
  }
}

function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

// ============================================
// 启动
// ============================================
function initNavigationOverflow() {
  const nav = document.querySelector('.nav');
  const links = nav.querySelector('.nav__links');
  const items = Array.from(links.children).filter(item => !item.classList.contains('nav__overflow'));
  const overflow = nav.querySelector('.nav__overflow');
  const button = overflow.querySelector('button');
  const menu = overflow.querySelector('ul');
  const copies = items.map(item => {
    const copy = item.cloneNode(true);
    menu.append(copy);
    return copy;
  });

  function closeMenu() {
    menu.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  }

  function fit() {
    const style = getComputedStyle(nav);
    const sideWidth = Math.max(
      nav.querySelector('.nav__brand').getBoundingClientRect().width,
      nav.querySelector('.nav__right').getBoundingClientRect().width
    );
    const budget = nav.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
      - 2 * sideWidth
      - 2 * parseFloat(style.columnGap);
    items.forEach(item => { item.hidden = false; });
    overflow.hidden = true;
    let count = items.length;
    if (links.getBoundingClientRect().width > budget) {
      overflow.hidden = false;
      while (count > 0 && links.getBoundingClientRect().width > budget) {
        items[--count].hidden = true;
      }
    }
    copies.forEach((copy, index) => { copy.hidden = index < count; });
    if (overflow.hidden) closeMenu();
  }

  button.addEventListener('click', () => {
    menu.hidden = !menu.hidden;
    button.setAttribute('aria-expanded', String(!menu.hidden));
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('click', event => {
    if (!overflow.contains(event.target)) closeMenu();
  });
  nav.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) {
      closeMenu();
      button.focus();
    }
  });
  new ResizeObserver(fit).observe(nav);
  new MutationObserver(fit).observe(links, { childList: true, subtree: true, characterData: true });
  document.fonts.ready.then(fit);
  fit();
}

function initCDPlayer() {
  const player = document.getElementById('cd-player');
  const close = document.getElementById('music-close');
  const toggle = document.getElementById('music-toggle');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const albumArt = document.getElementById('cd-player-art');
  const albums = [
    { src: 'images/music/cd-onetake.svg', cover: 'images/music/album-onetake-pixel.png', name: '林志炫 ONEtake 2.0' },
    { src: 'images/music/cd-i.svg', cover: 'images/music/album-i-pixel.png', name: '莫文蔚 [i]' },
    { src: 'images/music/cd-love-songs.svg', cover: 'images/music/album-love-songs-pixel.png', name: '林志炫 熟情歌' }
  ];
  const discArt = document.getElementById('cd-disc-art');
  const pauseButton = player.querySelector('[data-control="pause"]');
  let index = 0;
  let playing = true;

  function setPlaying(value) {
    playing = value;
    player.classList.toggle('is-playing', playing);
    pauseButton.setAttribute('aria-pressed', String(playing));
    pauseButton.setAttribute('aria-label', playing ? '暂停' : '播放');
    pauseButton.title = playing ? '暂停' : '播放';
    player.querySelectorAll('audio, video').forEach(media => {
      if (playing) media.play().catch(() => setPlaying(false));
      else media.pause();
    });
  }

  function changeTrack(offset) {
    index = (index + offset + albums.length) % albums.length;
    albumArt.src = albums[index].src;
    albumArt.alt = `像素 CD 机，圆盘上是${albums[index].name}专辑封面`;
    discArt.src = albums[index].cover;
  }
  player.querySelector('[data-control="previous"]').addEventListener('click', () => changeTrack(-1));
  player.querySelector('[data-control="next"]').addEventListener('click', () => changeTrack(1));
  pauseButton.addEventListener('click', () => setPlaying(!playing));
  setPlaying(true);
  let busy = false;

  async function setCollapsed(collapsed) {
    if (busy) return;
    busy = true;
    if (collapsed) {
      // Pause the player's audio as soon as it is dismissed.
      setPlaying(false);
    } else {
      player.hidden = false;
      player.inert = false;
      toggle.classList.remove('is-visible');
    }
    const from = player.getBoundingClientRect();
    const to = toggle.getBoundingClientRect();
    const dx = to.x + to.width / 2 - (from.x + from.width / 2);
    const dy = to.y + to.height / 2 - (from.y + from.height / 2);
    const small = { transform: `translate(${dx}px, ${dy}px) scale(0.12)`, opacity: 0 };
    const full = { transform: 'translate(0, 0) scale(1)', opacity: 1 };
    player.inert = true;
    try {
      if (!reducedMotion.matches) {
        await player.animate(collapsed ? [full, small] : [small, full], {
          duration: 460,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).finished;
      }
    } finally {
      player.hidden = collapsed;
      player.inert = collapsed;
      toggle.classList.toggle('is-visible', collapsed);
      toggle.tabIndex = collapsed ? 0 : -1;
      toggle.setAttribute('aria-expanded', String(!collapsed));
      (collapsed ? toggle : close).focus({ preventScroll: true });
      busy = false;
    }
  }

  close.addEventListener('click', () => setCollapsed(true));
  toggle.addEventListener('click', () => setCollapsed(false));
}

document.addEventListener('DOMContentLoaded', () => {
  initCDPlayer();
  setTheme(getTheme());
  setLang(getLang());
  initNavigationOverflow();
  renderPhotos();
  renderProjects();

  document.getElementById('lang-toggle').addEventListener('click', toggleLang);
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
  });
});

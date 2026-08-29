/**
 * main.js — 主题切换、语言切换、渲染项目列表
 */

// ============================================
// 数据
// ============================================

const PROJECTS = [
  {
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
  el.innerHTML = PROJECTS.map(p => `
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
  `).join('');
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
  const icon = document.querySelector('#theme-toggle i');
  if (icon) {
    icon.className = t === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

function toggleTheme() {
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

// ============================================
// 启动
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  setTheme(getTheme());
  setLang(getLang());
  renderPhotos();
  renderProjects();

  document.getElementById('lang-toggle').addEventListener('click', toggleLang);
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
  });
});

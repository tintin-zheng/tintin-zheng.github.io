/**
 * main.js — 主题切换、语言切换、渲染技能 & 项目列表
 */

// ============================================
// 数据
// ============================================

const SKILLS = [
  'Python', 'R', 'Linux / Bash', 'Git',
  'BLAST', 'BioPython', 'SAMtools', 'BWA',
  'Pandas', 'Matplotlib', 'ggplot2', 'Jupyter',
  'Illumina 数据处理', '序列比对', 'SQLite'
];

const PROJECTS = [];

const PHOTOS = [
  { src: 'images/photos/冬日的树.jpg', alt: '冬日的树' },
  { src: 'images/photos/新旧.jpg', alt: '新旧' },
  { src: 'images/photos/樱花.JPG', alt: '樱花' },
  { src: 'images/photos/福州的树.JPG', alt: '福州的树' },
  { src: 'images/photos/西禅古寺.JPG', alt: '西禅古寺' },
  { src: 'images/photos/zju.jpg', alt: 'ZJU' },
];

// ============================================
// 渲染
// ============================================
function renderPhotos() {
  const el = document.getElementById('photos-grid');
  if (!el) return;
  el.innerHTML = PHOTOS.map(p => `
    <div class="photo-card">
      <img src="${p.src}" alt="${p.alt}" loading="lazy">
    </div>
  `).join('');
}

function renderSkills() {
  const el = document.getElementById('skills-grid');
  if (!el) return;
  el.innerHTML = SKILLS.map(s => `<span class="skill-tag">${s}</span>`).join('');
}

function renderProjects() {
  const el = document.getElementById('projects-list');
  if (!el) return;
  const lang = getLang();
  el.innerHTML = PROJECTS.map(p => `
    <div class="project-item">
      <div class="project-item__name">${p.name[lang]}</div>
      <div class="project-item__desc">${p.desc[lang]}</div>
      <div class="project-item__tags">
        ${p.tags.map(t => `<span class="project-item__tag">${t}</span>`).join('')}
      </div>
      <div class="project-item__links">
        <a href="${p.demo}" target="_blank" rel="noopener">${t('projects.demo')} →</a>
        <a href="${p.source}" target="_blank" rel="noopener">${t('projects.source')} →</a>
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
  renderSkills();
  renderProjects();

  document.getElementById('lang-toggle').addEventListener('click', toggleLang);
  document.getElementById('theme-toggle').addEventListener('click', toggleTheme);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
  });
});

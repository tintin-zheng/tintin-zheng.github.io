# 个人主页

静态个人主页，部署在 GitHub Pages。

## 内容

- 简介 · 关于 · 技能 · 项目 · 联系
- 中 / 英文切换
- 深色 / 浅色主题

## 本地预览

```bash
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 部署

推送到 `<username>.github.io` 仓库的 `main` 分支即可。

## 自定义

- `index.html` — 姓名和链接
- `js/i18n.js` — 文本内容（中英文）
- `js/main.js` — 技能标签和项目列表
- `css/style.css` — 配色（修改 `:root` 中的 CSS 变量）

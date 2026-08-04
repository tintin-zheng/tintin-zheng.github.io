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

### 添加摄影作品

1. 把用于网页展示的照片放入 `images/photos/`。建议使用 JPG、宽边不超过 1600px，单张尽量控制在 1MB 内；原始大图可以继续保存在 `images/`。
2. 打开 `js/main.js`，在 `PHOTO_FILES` 数组中加入完整文件名，例如：

```js
const PHOTO_FILES = [
  '已有照片.jpg',
  '新照片.jpg',
];
```

文件名大小写和扩展名必须与实际文件一致。照片数量变化后，双螺旋的间距、循环和移动速度会自动调整，不需要修改 HTML 或 CSS。

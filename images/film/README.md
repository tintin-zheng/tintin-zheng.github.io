# 胶片暗盒素材

使用内置 imagegen，参照用户提供的两张产品照片生成。素材已接入摄影板块下方的“胶片”列表，每卷独占一行，点击暗盒可从侧面向右拉出胶片，再次点击收回。长胶片可横向滚动查看，手机上可以左右滑动。

- `kodak-5219-pixel.png`：参考蓝灰色 / 米白色 CRYSTAL 500T 5219 分装暗盒，并非经典黄色 Kodak VISION3 包装。
- `kodak-gold-200-pixel.png`：参考黄色标签、黑色竖排 Kodak / 200 的 Gold 200 暗盒。紫红色属于纸盒，不属于暗盒，因此未加入。

两张均为 1024 × 1536 RGBA PNG，统一直立近正面视角，透明背景。标签小字在较小显示尺寸下会损失细节；网页建议使用 `image-rendering: pixelated`，避免二次平滑。

暗盒造型以 Gold 200 为统一模板：5219 通过内置 imagegen 编辑 Gold 200 的标签得到，保持相同的筒身比例、卷轴、顶盖、底盖和画布位置。后续新胶卷应沿用此模板，仅替换纸标签，避免单独重新生成轮廓。

本次编辑提示词要点：以 Gold 200 为编辑目标、旧 5219 仅作标签参考；保留 1024 × 1536 画布及暗盒轮廓、大小、位置、黑色塑料部件，唯一变更为蓝灰／米白纸标签，包含“5219”、五条分隔线及“CRYSTAL 500T”；保留透明背景与像素风格。

## 添加胶片照片

将照片放入 `images/film/photos/`（自行创建目录），在 `js/main.js` 中对应胶卷的 `FILM_ROLLS` → `photos` 数组里添加：

```js
photos: [
  { src: 'images/film/photos/5219-01.jpg', alt: '照片描述' },
  { src: 'images/film/photos/5219-02.jpg', alt: '照片描述' }
]
```

空数组显示三张空胶片帧及待入册提示。加入照片后自动替换为空间顺序一致的作品帧。中英文切换会保留胶卷的展开状态；减少动态效果模式直接展开。

5219 当前收录原始编号 2、41、44、49、51、54、55、65、67，网页副本位于 `images/film/photos/5219/`，最长边为 1600 像素。原图不作修改。增加这一卷的照片时，将副本保存为六位编号文件名（例如 `000068.jpg`），再在 `js/main.js` 中 5219 的编号数组里加入 `68` 即可。胶片帧会显示原始编号。

## 生成提示词规格

共同提示词：Create ONE production-ready pixel-art sprite on a genuinely transparent background for a personal photography website. Reference photographs are identity references only; reproduce the cylindrical film cartridge, not the packaging box or phone UI. Upright near-front view, subtly visible elliptical black top rim, hollow protruding spindle and black bottom rim. Approximately 96×144 logical pixel grid enlarged with nearest-neighbor square blocks, crisp stepped silhouette, limited palette. Full object centered with transparent margins. No film tongue yet, ground, shadow, background, watermark or decoration. Match scale, orientation and pixel density between the two cartridges.

5219 提示词：Preserve muted dusty teal / slate blue upper label, large ivory horizontal “5219”, warm ivory lower label, five fine blue-gray / ivory horizontal separator stripes and restrained ochre “CRYSTAL 500T”. Faithfully match the reference cartridge on the right of the first photograph.

Gold 200 提示词：Preserve golden yellow cylindrical label, bold vertical black “Kodak” on the right and large rotated “200” in the middle, small “35mm color print film” and “36 exp”. No magenta on the cartridge. Faithfully match the upright cartridge at bottom right of the second photograph.

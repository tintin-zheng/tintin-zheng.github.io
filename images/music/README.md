# Pixel album CD labels

Created with the built-in imagegen tool from the three user-supplied cover images.

Shared prompt: faithful square pixel-art style transfer, full bleed without screenshot margins or rounded corners; preserve person, pose, palette, composition and original album typography. Use deliberate small square pixels, a restrained palette and crisp nearest-neighbor edges; avoid blur, photographic areas, mockups and added elements. Intended as the label of a small circular CD in the website player.

Album-specific prompts:

- `album-onetake-pixel.png`: male singer in sunglasses against black, purple patterned outfit, rainbow ribbon across the center; ONEtake2.0 and 林志炫 typography.
- `album-i-pixel.png`: woman with long black hair and black outfit at the right; yellow flowers, rustic green fence, warm cream sky and central [i] title. Corrected with the built-in imagegen tool: replace only the artist signature below [i] with the exact Chinese name `莫文蔚`, a thin horizontal rule, and lowercase italic `karen mok`, using the user's close-up typography reference. Preserve the remaining composition and pixel style.
- `album-love-songs-pixel.png`: man with glasses and black jacket sitting at the right against a weathered gray-green wall; vertical white 林志炫 熟情歌 typography.

The corresponding `cd-*.svg` files embed their PNG artwork, clipped to the original pixel disc outline with the spindle and window highlights retained. They are self-contained for use as HTML image sources. The three physical keys on the player are previous, play/pause and next. Previous/next cycle through the album list; play/pause runs or freezes the album-label rotation. The spindle stays stationary. Closing the player pauses the rotation. The pixel LCD shows `01 ONE`, `02 [I]`, or `03 LOVE` to identify the selected album; no music files have been added.

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, '..', 'public', 'libro.png');
const output = path.join(__dirname, '..', 'public', 'libro-nobg.png');

const THRESHOLD_HI = 235;   // pure white zone → fully transparent
const THRESHOLD_LO = 200;   // transition zone → partial transparency

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pixels = Buffer.from(data);

for (let i = 0; i < width * height; i++) {
  const off = i * channels;
  const r = pixels[off];
  const g = pixels[off + 1];
  const b = pixels[off + 2];

  // Lightness: how close to white
  const lightness = Math.min(r, g, b);
  // Saturation: if it has colour, keep it
  const saturation = Math.max(r, g, b) - Math.min(r, g, b);

  if (saturation < 30 && lightness >= THRESHOLD_HI) {
    // Pure white / near-white → fully transparent
    pixels[off + 3] = 0;
  } else if (saturation < 30 && lightness >= THRESHOLD_LO) {
    // Transition zone → fade out gradually
    const t = (lightness - THRESHOLD_LO) / (THRESHOLD_HI - THRESHOLD_LO);
    pixels[off + 3] = Math.round(255 * (1 - t));
  }
  // Everything else: keep original alpha (255)
}

await sharp(pixels, { raw: { width, height, channels } })
  .png()
  .toFile(output);

console.log(`✅ Saved: ${output} (${width}x${height})`);

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(__dirname, '..', 'public', 'libro.png');
const output = path.join(__dirname, '..', 'public', 'libro-nobg.png');

// ── Thresholds ──
// A pixel is considered "white-ish background" if lightness >= LO and saturation < SAT_MAX
const LIGHT_LO = 210;
const LIGHT_HI = 235;
const SAT_MAX = 35;

const { data, info } = await sharp(input)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const pixels = Buffer.from(data);

// ── Helpers ──
const idx = (x, y) => (y * width + x) * channels;

function isWhitish(x, y) {
  const off = idx(x, y);
  const r = pixels[off], g = pixels[off + 1], b = pixels[off + 2];
  const lightness = Math.min(r, g, b);
  const saturation = Math.max(r, g, b) - Math.min(r, g, b);
  return saturation < SAT_MAX && lightness >= LIGHT_LO;
}

// ── Flood-fill from edges ──
// Only pixels that are white-ish AND connected to the image border are background.
// Interior whites (book cover) stay untouched.
const visited = new Uint8Array(width * height);  // 0 = unvisited, 1 = visited bg
const queue = [];

// Seed edges
for (let x = 0; x < width; x++) {
  if (isWhitish(x, 0))          queue.push([x, 0]);
  if (isWhitish(x, height - 1)) queue.push([x, height - 1]);
}
for (let y = 1; y < height - 1; y++) {
  if (isWhitish(0, y))          queue.push([0, y]);
  if (isWhitish(width - 1, y))  queue.push([width - 1, y]);
}

// BFS
while (queue.length > 0) {
  const [cx, cy] = queue.shift();
  const pi = cy * width + cx;
  if (visited[pi]) continue;
  if (!isWhitish(cx, cy)) continue;
  visited[pi] = 1;

  // 4-neighbours
  if (cx > 0)          queue.push([cx - 1, cy]);
  if (cx < width - 1)  queue.push([cx + 1, cy]);
  if (cy > 0)          queue.push([cx, cy - 1]);
  if (cy < height - 1) queue.push([cx, cy + 1]);
}

console.log(`Flood-fill tagged ${visited.reduce((s, v) => s + v, 0)} background pixels`);

// ── Apply transparency only to flood-filled background pixels ──
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const pi = y * width + x;
    if (!visited[pi]) continue; // not background → keep original

    const off = pi * channels;
    const r = pixels[off], g = pixels[off + 1], b = pixels[off + 2];
    const lightness = Math.min(r, g, b);

    if (lightness >= LIGHT_HI) {
      pixels[off + 3] = 0; // fully transparent
    } else {
      // Transition zone: soft edge between bg and book
      const t = (lightness - LIGHT_LO) / (LIGHT_HI - LIGHT_LO);
      pixels[off + 3] = Math.round(255 * (1 - t));
    }
  }
}

await sharp(pixels, { raw: { width, height, channels } })
  .png()
  .toFile(output);

console.log(`✅ Saved: ${output} (${width}x${height})`);

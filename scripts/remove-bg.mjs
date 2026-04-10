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

if (channels !== 4) {
  throw new Error(`Expected RGBA image, got ${channels} channels.`);
}

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
const total = width * height;
const visited = new Uint8Array(total); // 0 = unvisited, 1 = visited bg
const qx = new Int32Array(total);
const qy = new Int32Array(total);
let qHead = 0;
let qTail = 0;

function enqueue(x, y) {
  const pi = y * width + x;
  if (visited[pi]) return;
  visited[pi] = 1; // mark on enqueue to avoid duplicates
  qx[qTail] = x;
  qy[qTail] = y;
  qTail += 1;
}

// Seed edges
for (let x = 0; x < width; x++) {
  if (isWhitish(x, 0)) enqueue(x, 0);
  if (isWhitish(x, height - 1)) enqueue(x, height - 1);
}
for (let y = 1; y < height - 1; y++) {
  if (isWhitish(0, y)) enqueue(0, y);
  if (isWhitish(width - 1, y)) enqueue(width - 1, y);
}

// BFS
while (qHead < qTail) {
  const cx = qx[qHead];
  const cy = qy[qHead];
  qHead += 1;

  const pi = cy * width + cx;
  if (!isWhitish(cx, cy)) continue;

  // 8-neighbour fill catches diagonal bg seams without touching isolated interior whites.
  for (let ny = cy - 1; ny <= cy + 1; ny++) {
    for (let nx = cx - 1; nx <= cx + 1; nx++) {
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
      if (nx === cx && ny === cy) continue;
      if (!isWhitish(nx, ny)) continue;
      enqueue(nx, ny);
    }
  }
}

let bgCount = 0;
for (let i = 0; i < visited.length; i++) {
  bgCount += visited[i];
}
console.log(`Flood-fill tagged ${bgCount} background pixels`);

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

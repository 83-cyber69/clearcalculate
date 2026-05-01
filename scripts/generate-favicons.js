const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const publicDir = path.join(__dirname, "..", "public");

function crc32(buffer) {
  let crc = ~0;
  for (let i = 0; i < buffer.length; i += 1) {
    crc ^= buffer[i];
    for (let j = 0; j < 8; j += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (~crc) >>> 0;
}

function pngChunk(type, data) {
  const typeBuffer = Buffer.from(type, "ascii");
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])), 0);
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function makePng(size) {
  const pixels = Buffer.alloc((size * 4 + 1) * size);
  const orange = [249, 115, 22, 255];
  const scale = size / 512;
  const cx = size / 2;
  const cy = size / 2;
  const outer = 205 * scale;
  const inner = 112 * scale;
  const gapHalfAngle = 0.62;

  for (let y = 0; y < size; y += 1) {
    const row = y * (size * 4 + 1);
    pixels[row] = 0;
    for (let x = 0; x < size; x += 1) {
      const dx = x + 0.5 - cx;
      const dy = y + 0.5 - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const inRing = dist >= inner && dist <= outer;
      const inOpening = Math.abs(angle) < gapHalfAngle && dx > 0;
      const capTop = Math.abs(angle + gapHalfAngle) < 0.14 && dx > 0 && dist >= inner * 0.92 && dist <= outer * 1.02;
      const capBottom = Math.abs(angle - gapHalfAngle) < 0.14 && dx > 0 && dist >= inner * 0.92 && dist <= outer * 1.02;
      const draw = inRing && (!inOpening || capTop || capBottom);
      const offset = row + 1 + x * 4;
      if (draw) {
        pixels[offset] = orange[0];
        pixels[offset + 1] = orange[1];
        pixels[offset + 2] = orange[2];
        pixels[offset + 3] = orange[3];
      }
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;
  const idat = zlib.deflateSync(pixels, { level: 9 });
  return Buffer.concat([
    signature,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", idat),
    pngChunk("IEND", Buffer.alloc(0))
  ]);
}

function makeIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(entries.length, 4);

  let offset = 6 + entries.length * 16;
  const directory = [];
  const images = [];

  for (const entry of entries) {
    const dir = Buffer.alloc(16);
    dir[0] = entry.size === 256 ? 0 : entry.size;
    dir[1] = entry.size === 256 ? 0 : entry.size;
    dir[2] = 0;
    dir[3] = 0;
    dir.writeUInt16LE(1, 4);
    dir.writeUInt16LE(32, 6);
    dir.writeUInt32LE(entry.data.length, 8);
    dir.writeUInt32LE(offset, 12);
    directory.push(dir);
    images.push(entry.data);
    offset += entry.data.length;
  }

  return Buffer.concat([header, ...directory, ...images]);
}

const png16 = makePng(16);
const png32 = makePng(32);
const png180 = makePng(180);
const png192 = makePng(192);
const png512 = makePng(512);

fs.writeFileSync(path.join(publicDir, "favicon-16x16.png"), png16);
fs.writeFileSync(path.join(publicDir, "favicon-32x32.png"), png32);
fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), png180);
fs.writeFileSync(path.join(publicDir, "android-chrome-192x192.png"), png192);
fs.writeFileSync(path.join(publicDir, "android-chrome-512x512.png"), png512);
fs.writeFileSync(path.join(publicDir, "favicon.ico"), makeIco([
  { size: 16, data: png16 },
  { size: 32, data: png32 }
]));

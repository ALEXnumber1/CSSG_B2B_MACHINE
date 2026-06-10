import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, 'public');

// Images to skip (logos, certificates that need high quality, PDFs)
const SKIP = new Set([
  'logo.png',
  'logo_full.png',
  'favicon.png',
  'Portafolio_Servicios_CSSG.pdf',
]);

const KB = 1024;
const SIZE_THRESHOLD = 300 * KB; // only compress files > 300KB

async function getSize(filePath) {
  return fs.statSync(filePath).size;
}

async function compressImage(filePath) {
  const filename = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const originalSize = await getSize(filePath);

  if (originalSize < SIZE_THRESHOLD) return;

  const originalKB = Math.round(originalSize / KB);
  const tmpPath = filePath + '.tmp';

  try {
    let pipeline = sharp(filePath);

    if (ext === '.jpg' || ext === '.jpeg') {
      // Compress JPEG
      await pipeline
        .jpeg({ quality: 82, progressive: true, mozjpeg: true })
        .toFile(tmpPath);
    } else if (ext === '.png') {
      // Convert heavy PNGs to JPEG if they're photos (not logos/icons)
      // For photos: convert to WebP for maximum savings
      const webpPath = filePath.replace(/\.png$/i, '.webp');
      await pipeline
        .webp({ quality: 82, effort: 4 })
        .toFile(webpPath);

      // Also compress PNG in place for fallback
      await sharp(filePath)
        .png({ compressionLevel: 9, quality: 85 })
        .toFile(tmpPath);
    } else {
      return;
    }

    // Only replace if we actually saved space (> 10%)
    const newSize = await getSize(tmpPath);
    if (newSize < originalSize * 0.9) {
      fs.renameSync(tmpPath, filePath);
      const savedKB = Math.round((originalSize - newSize) / KB);
      const savedPct = Math.round((1 - newSize / originalSize) * 100);
      console.log(`✓ ${filename}: ${originalKB} KB → ${Math.round(newSize / KB)} KB (−${savedKB} KB, ${savedPct}%)`);
    } else {
      fs.unlinkSync(tmpPath);
      console.log(`  ${filename}: already optimized, skipped`);
    }
  } catch (err) {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    console.error(`✗ ${filename}: ${err.message}`);
  }
}

async function run() {
  const files = fs.readdirSync(publicDir)
    .filter(f => /\.(png|jpg|jpeg)$/i.test(f) && !SKIP.has(f))
    .map(f => path.join(publicDir, f));

  // Sort by size descending
  files.sort((a, b) => fs.statSync(b).size - fs.statSync(a).size);

  const totalBefore = files.reduce((acc, f) => acc + fs.statSync(f).size, 0);
  console.log(`\n🖼  Optimizando ${files.length} imágenes en public/\n`);

  for (const file of files) {
    await compressImage(file);
  }

  const totalAfter = files.reduce((acc, f) => acc + fs.statSync(f).size, 0);
  const totalSaved = Math.round((totalBefore - totalAfter) / KB);
  console.log(`\n✅ Total ahorrado: ${totalSaved} KB (${Math.round(totalSaved/1024)} MB)`);
}

run().catch(console.error);

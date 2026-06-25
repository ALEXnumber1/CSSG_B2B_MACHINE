import fs from 'fs';
import path from 'path';
import React from 'react';
import { Font, renderToFile } from '@react-pdf/renderer';

const pubDir = path.join(process.cwd(), 'public');
const b64 = (p: string) => fs.readFileSync(p).toString('base64');

// ① Logo PNG como data URI — se inyecta antes de importar el componente
(globalThis as { __PDF_LOGO?: string }).__PDF_LOGO =
  `data:image/png;base64,${b64(path.join(pubDir, 'logo_full.png'))}`;

// ② Fuentes Inter woff1 (fontkit no soporta woff2)
Font.register({
  family: 'Inter',
  fonts: [
    { src: `data:font/woff;base64,${b64(path.join(pubDir, 'fonts/Inter-Regular.woff'))}`, fontWeight: 400 },
    { src: `data:font/woff;base64,${b64(path.join(pubDir, 'fonts/Inter-Regular.woff'))}`, fontWeight: 400, fontStyle: 'italic' },
    { src: `data:font/woff;base64,${b64(path.join(pubDir, 'fonts/Inter-Bold.woff'))}`,    fontWeight: 700 },
    { src: `data:font/woff;base64,${b64(path.join(pubDir, 'fonts/Inter-Bold.woff'))}`,    fontWeight: 700, fontStyle: 'italic' },
    { src: `data:font/woff;base64,${b64(path.join(pubDir, 'fonts/Inter-Black.woff'))}`,   fontWeight: 900 },
  ],
});
Font.registerHyphenationCallback((word: string) => [word]);

// ③ Import dinámico: el componente lee g.__PDF_LOGO ya inicializado
const { WhitePaperDueDiligence, WP_FILENAME_DD } =
  await import('../src/lib/pdf/documents/WhitePaperDueDiligence.js');

const output = path.join(process.cwd(), WP_FILENAME_DD);
console.log('Generando PDF...');
await renderToFile(
  React.createElement(WhitePaperDueDiligence as React.ComponentType),
  output,
);
console.log(`✓ PDF generado: ${output}`);

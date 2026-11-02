const { execSync } = require('child_process');
const fs = require('fs');

execSync('"C:\\Program Files\\Git\\ucrt64\\bin\\pdftotext.exe" apunte_2_ejercicios.pdf pdf_text.txt');
const txt = fs.readFileSync('pdf_text.txt', 'utf8');

console.log('PDF text length:', txt.length);
let missing = 0;
for (let i = 1; i <= 61; i++) {
  // En el HTML pusimos: <span class="ex-num">#${globalIndex++}</span>
  // o en el índice: #${globalIndex++}
  const hasNum = txt.includes('#' + i + ' ') || txt.includes('#' + i + '\n');
  if (!hasNum) {
    console.log('MISSING in PDF text: #' + i);
    missing++;
  }
}
console.log('Total missing numbers:', missing);

// Contar páginas
const pages = (txt.match(/\x0c/g) || []).length;
console.log('Total pages:', pages);

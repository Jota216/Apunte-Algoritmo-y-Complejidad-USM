const { execSync } = require('child_process');
const txt = execSync('"C:\\Program Files\\Git\\ucrt64\\bin\\pdftotext.exe" apunte_4_greedy_dp.pdf -').toString();
const pages = txt.split('\x0c');
console.log('Total pages:', pages.length - 1);
pages.forEach((p, idx) => {
    if (idx < pages.length - 1) {
        console.log(`PAGE ${idx + 1} (length: ${p.length}): ${p.trim().substring(0, 90).replace(/\n/g, ' ')}`);
    }
});

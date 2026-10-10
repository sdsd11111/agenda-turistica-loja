const fs = require('fs');
const content = fs.readFileSync('lib/data/guias.ts', 'utf8');

const regex = /{\s*slug:\s*"([^"]+)",\s*titulo:\s*"([^"]+)"[\s\S]*?imagen:\s*"([^"]+)"/g;

let m;
console.log('--- GUIAS Y SUS IMÁGENES ---');
while ((m = regex.exec(content)) !== null) {
  console.log(`${m[1]} (${m[2]}) --> ${m[3]}`);
}

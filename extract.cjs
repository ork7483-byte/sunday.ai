const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const babelStart = '<script type="text/babel" data-type="module">';
const babelIdx = html.indexOf(babelStart);
if (babelIdx === -1) {
  console.log('not found');
  process.exit(1);
}

const remainder = html.slice(babelIdx + babelStart.length);
const babelEndIdx = remainder.indexOf('</script>');
const tsx = remainder.slice(0, babelEndIdx).trim();

fs.writeFileSync('index.tsx', tsx);

let newHtml = html
  .replace(/<!-- Import Map -->[\s\S]*?<\/script>/, '')
  .replace(/<!-- Babel -->[\s\S]*?<\/script>/, '')
  .replace(/<script type="text\/babel" data-type="module">[\s\S]*?<\/script>/, '');

fs.writeFileSync('index.html', newHtml);
console.log('done');

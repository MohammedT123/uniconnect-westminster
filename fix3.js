const fs = require('fs');
const html = fs.readFileSync('views/jobs.html', 'utf8');
console.log(html.includes('adzuna') ? 'HAS ADZUNA' : 'NO ADZUNA - needs update');
console.log('File size:', html.length, 'chars');

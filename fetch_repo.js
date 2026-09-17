const https = require('https');
const fs = require('fs');
const path = require('path');

const files = [
  'ai.css', 'ai.html', 'ai.js',
  'dashboard.css', 'dashboard.js',
  'farmers.css', 'farmers.html', 'farmers.js',
  'index.html',
  'logistics.css', 'logistics.html', 'logistics.js',
  'marketplace.css', 'marketplace.html', 'marketplace.js',
  'orders.css', 'orders.html', 'orders.js',
  'script.js', 'style.css'
];

const baseUrl = 'https://raw.githubusercontent.com/syntax-code-master/Smart-India-Hackathon-2026/main/farmer-marketplace/';

async function downloadAll() {
  const targetDir = path.join(__dirname, 'farmer-marketplace');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  for (const f of files) {
    const url = baseUrl + f;
    const dest = path.join(targetDir, f);
    await new Promise((resolve, reject) => {
      https.get(url, (res) => {
        if (res.statusCode !== 200) {
          console.error('Failed to fetch ' + f + ': status ' + res.statusCode);
          return resolve();
        }
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log('Downloaded ' + f);
          resolve();
        });
      }).on('error', (err) => {
        console.error('Error fetching ' + f, err);
        resolve();
      });
    });
  }
}

downloadAll();

const http = require('http');

const urls = [
    'http://localhost:3000/index.html',
    'http://localhost:3000/marketplace.html',
    'http://localhost:3000/farmers.html',
    'http://localhost:3000/orders.html',
    'http://localhost:3000/ai.html',
    'http://localhost:3000/logistics.html',
    'http://localhost:3000/common.css',
    'http://localhost:3000/common.js',
    'http://localhost:3000/dashboard.css',
    'http://localhost:3000/dashboard.js',
    'http://localhost:3000/marketplace.css',
    'http://localhost:3000/marketplace.js',
    'http://localhost:3000/farmers.css',
    'http://localhost:3000/farmers.js',
    'http://localhost:3000/ai.css',
    'http://localhost:3000/ai.js',
    'http://localhost:3000/logistics.css',
    'http://localhost:3000/logistics.js',
    'http://localhost:3000/orders.css',
    'http://localhost:3000/orders.js'
];

async function checkAll() {
    let failed = 0;
    for (const u of urls) {
        await new Promise((resolve) => {
            http.get(u, (res) => {
                if (res.statusCode === 200) {
                    console.log('✓ OK (200): ' + u.replace('http://localhost:3000/', ''));
                } else {
                    console.error('✗ FAIL (' + res.statusCode + '): ' + u);
                    failed++;
                }
                resolve();
            }).on('error', (err) => {
                console.error('✗ ERROR: ' + u, err.message);
                failed++;
                resolve();
            });
        });
    }
    console.log('\nResult: ' + (failed === 0 ? 'ALL 20 ENDPOINTS & ASSETS RETURNED 200 OK!' : failed + ' FAILED'));
}

checkAll();

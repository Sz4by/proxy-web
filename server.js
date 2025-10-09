const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// --- ITT CSERÉLD KI A CÍMET! ---
// Ide írd be annak a nem biztonságos (http://) weboldalnak a címét,
// amit meg szeretnél jeleníteni.
const TARGET_URL = 'http://valami-nem-biztonsagos-oldal.com';
// ---------------------------------

console.log(`Proxying to -> ${TARGET_URL}`);

// Hozd létre a proxy-t a beállított céloldallal
const apiProxy = createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true, // Ez fontos, hogy a céloldal helyesen kezelje a kérést
    logLevel: 'debug',  // Ez segít a hibakeresésben, kiírja a konzolra a forgalmat
});

// Minden bejövő kérést irányíts át a céloldalra a proxy segítségével
app.use('/', apiProxy);

// A Render.com által megadott porton indítsd el a szervert, vagy alapból a 3000-es porton
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});

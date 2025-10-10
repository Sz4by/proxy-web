const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// --- ITT CSERÉLD KI A CÍMET! ---
const TARGET_URL = 'http://37.157.242.101:23203';
// ---------------------------------

console.log(`Proxying to -> ${TARGET_URL}`);

// Hozd létre a proxy-t a beállított céloldallal
const apiProxy = createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
    logLevel: 'debug',

    // --- EZ AZ ÚJ, FONTOS RÉSZ ---
    // Útvonal átírási szabályok
    pathRewrite: (path, req) => {
        // Ha az elérési út pontosan '/live/', akkor cseréljük le '/live'-ra
        if (path === '/live/') {
            return '/live';
        }
        // Minden más esetben hagyjuk az útvonalat változatlanul
        return path;
    }
});

// Minden bejövő kérést irányíts át a céloldalra a proxy segítségével
// Maradjunk az általánosabb verziónál, hogy minden működjön.
app.use('/', apiProxy);

// A Render.com által megadott porton indítsd el a szervert, vagy alapból a 3000-es porton
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});

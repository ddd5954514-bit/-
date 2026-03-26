const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// הגדרת ה-Proxy
app.use('/', createProxyMiddleware({ 
    target: 'https://nachos-tv.co', // אתר היעד
    changeOrigin: true,
    secure: true,
    // הוספת כותרות כדי "לשכנע" את אתר היעד שהבקשה לגיטימית
    onProxyReq: (proxyReq) => {
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

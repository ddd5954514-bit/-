const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// הגדרת ה-Proxy עם הכתובת החדשה
app.use('/', createProxyMiddleware({ 
    target: 'https://www.netflix.com/ro-en/', // הכתובת החדשה שביקשת
    changeOrigin: true,
    secure: true,
    // כותרות כדי שהאתר יחשוב שהבקשה מגיעה מדפדפן רגיל
    onProxyReq: (proxyReq) => {
        proxyReq.setHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    },
    // טיפול בשגיאות למקרה שהאתר חוסם את החיבור
    onError: (err, req, res) => {
        res.status(500).send('שגיאה בהתחברות לאתר היעד. ייתכן והוא חוסם בקשות Proxy.');
    }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});

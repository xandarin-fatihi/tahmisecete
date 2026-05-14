const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// index.html ve diğer dosyaları sunmak için
app.use(express.static(path.join(__dirname, '/')));

// Şifre Kontrol Endpoint'i
app.post('/api/verify-password', (req, res) => {
    const { password } = req.body;
    // Render panelinde belirleyeceğin şifre ile karşılaştırır
    const actualPassword = process.env.ADMIN_PASSWORD;

    if (password === actualPassword) {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: 'Hatalı şifre!' });
    }
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});
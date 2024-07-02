const jwt = require('jsonwebtoken'); // Импорт библиотеки jwt

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401); // Неавторизованный доступ

    jwt.verify(token, 'your_secret_key', (err, user) => { // Замените 'your_secret_key' на ваш секретный ключ!
        if (err) return res.sendStatus(403); // Недействительный токен
        req.user = user; // Сохранить данные пользователя в req
        next(); 
    });
}

module.exports = authenticateToken;
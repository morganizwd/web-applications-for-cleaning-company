// routes/serviceRoutes.js

const express = require('express');
const ServiceController = require('../controllers/ServiceController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Публичные маршруты (доступны только аутентифицированным пользователям)

// Получение всех услуг
router.get('/', authenticateToken, ServiceController.findAll);

// Получение услуги по ID
router.get('/:id', authenticateToken, ServiceController.findOne);

// Маршруты, требующие роли 'admin'

// Создание новой услуги (доступно только администраторам)
router.post('/', authenticateToken, (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Нет прав для создания услуг' });
    }
    next();
}, ServiceController.create);

// Обновление услуги (доступно только администраторам)
router.put('/:id', authenticateToken, (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Нет прав для обновления услуг' });
    }
    next();
}, ServiceController.update);

// Удаление услуги (доступно только администраторам)
router.delete('/:id', authenticateToken, (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Нет прав для удаления услуг' });
    }
    next();
}, ServiceController.delete);

module.exports = router;
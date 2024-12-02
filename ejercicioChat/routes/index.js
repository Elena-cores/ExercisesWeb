const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const items = ['Item 1', 'Item 2', 'Item 3']; // ej de lista de elementos
    res.render('index', { title: 'Página Principal', items });
});

module.exports = router;

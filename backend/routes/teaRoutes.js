const express = require('express');
const router = express.Router();
const { createTea, getTeas } = require('../controllers/teaController');

router.post('/', createTea); // 對應 POST /api/teas
router.get('/', getTeas);    // 對應 GET /api/teas

module.exports = router;
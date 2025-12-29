const express = require('express');
const router = express.Router();
const { createTea, getTeas, updateTea, deleteTea } = require('../controllers/teaController');

router.post('/', createTea);
router.get('/', getTeas);
router.put('/:id', updateTea);    // 新增這一行處理 PUT
router.delete('/:id', deleteTea); // 新增這一行處理 DELETE

module.exports = router;
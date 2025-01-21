const express = require('express');
const { getAllItems, getItemById, addItem, updateItem, deleteItem } = require('../controllers/inventory.controller');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllItems);
router.get('/:id', getItemById);
router.post('/', authenticateUser, addItem);
router.put('/:id', authenticateUser, updateItem);
router.delete('/:id', authenticateUser, deleteItem);

module.exports = router;

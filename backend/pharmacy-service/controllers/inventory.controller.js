const InventoryService = require('../services/inventory.service');

const getAllItems = async (req, res) => {
    try {
        const items = await InventoryService.getAllItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getItemById = async (req, res) => {
    try {
        const item = await InventoryService.getItemById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addItem = async (req, res) => {
    try {
        const { name, quantity, price } = req.body;
        const newItem = await InventoryService.addItem(name, quantity, price);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateItem = async (req, res) => {
    try {
        const updatedItem = await InventoryService.updateItem(req.params.id, req.body);
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteItem = async (req, res) => {
    try {
        const deletedItem = await InventoryService.deleteItem(req.params.id);
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllItems, getItemById, addItem, updateItem, deleteItem };

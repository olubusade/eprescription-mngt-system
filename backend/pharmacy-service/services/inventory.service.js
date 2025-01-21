const Inventory = require('../models/inventory.model');
const redisClient = require('../config/redisClient');

class InventoryService {
    async getAllItems() {
        const cacheKey = 'pharmacy:inventory';
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const items = await Inventory.find();
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(items)); // Cache for 1 hour
        return items;
    }

    async getItemById(id) {
        const cacheKey = `pharmacy:inventory:${id}`;
        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            return JSON.parse(cachedData);
        }

        const item = await Inventory.findById(id);
        if (item) {
            await redisClient.setEx(cacheKey, 3600, JSON.stringify(item)); // Cache for 1 hour
        }
        return item;
    }

    async addItem(name, quantity, price) {
        const newItem = new Inventory({ name, quantity, price });
        await newItem.save();
        await redisClient.del('pharmacy:inventory'); // Invalidate cache
        return newItem;
    }

    async updateItem(id, data) {
        const updatedItem = await Inventory.findByIdAndUpdate(id, data, { new: true });
        if (updatedItem) {
            await redisClient.setEx(`pharmacy:inventory:${id}`, 3600, JSON.stringify(updatedItem));
            await redisClient.del('pharmacy:inventory'); // Invalidate cache
        }
        return updatedItem;
    }

    async deleteItem(id) {
        const deletedItem = await Inventory.findByIdAndDelete(id);
        if (deletedItem) {
            await redisClient.del(`pharmacy:inventory:${id}`);
            await redisClient.del('pharmacy:inventory'); // Invalidate cache
        }
        return deletedItem;
    }
}

module.exports = new InventoryService();

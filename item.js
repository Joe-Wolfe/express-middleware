const items = require('./fakeDB.js');

class Item {
    constructor(name, price) {
        this.name = name;
        this.price = price;
        items.push(this);
    }

    static findAll() {
        return items;
    }

    static update(name, item) {
        let foundItem = Item.find(name);
        if (foundItem === undefined) {
            throw { message: "Item not Found", status: 404 };
        }
        foundItem.name = item.name;
        foundItem.price = item.price;
        return foundItem;
    }

    static find(name) {
        const foundItem = items.find(item => item.name === name);
        if (foundItem === undefined) {
            throw { message: "Item not Found", status: 404 };
        }
        return items.find(item => item.name === name);
    }

    static delete(name) {
        let foundIndex = items.findIndex(item => item.name === name);
        if (foundIndex === -1) {
            throw { message: "Item not Found", status: 404 };
        }
        items.splice(foundIndex, 1);
    }
}

module.exports = Item;
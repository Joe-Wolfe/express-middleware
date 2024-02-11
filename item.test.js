process.env.NODE_ENV = 'test';

const request = require('supertest');

const app = require('./app');
const items = require('./fakeDB');


const Item = require('./item');


describe('Item class', () => {
    beforeEach(() => {
        new Item('test', 1.99);
    });

    afterEach(() => {
        items.length = 0;
    });

    test('findAll returns all items', () => {
        const items = Item.findAll();
        expect(items).toHaveLength(1);
        expect(items[0]).toEqual({ name: 'test', price: 1.99 });
    });

    test('find returns an item by name', () => {
        const item = Item.find('test');
        expect(item).toEqual({ name: 'test', price: 1.99 });
    });

    test('find throws an error for a missing item', () => {
        expect(() => Item.find('nonexistent')).toThrow({ message: "Item not Found", status: 404 });
    });

    test('update modifies an item', () => {
        const updatedItem = Item.update('test', { name: 'new', price: 2.99 });
        expect(updatedItem).toEqual({ name: 'new', price: 2.99 });
        expect(Item.find('new')).toEqual({ name: 'new', price: 2.99 });
    });

    test('update throws an error for a missing item', () => {
        expect(() => Item.update('nonexistent', { name: 'new', price: 2.99 })).toThrow({ message: "Item not Found", status: 404 });
    });

    test('delete removes an item', () => {
        Item.delete('test');
        expect(items).toHaveLength(0);
    });

    test('delete throws an error for a missing item', () => {
        expect(() => Item.delete('nonexistent')).toThrow({ message: "Item not Found", status: 404 });
    });
});
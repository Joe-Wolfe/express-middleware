const Item = require('./item');
const express = require('express');

const router = new express.Router();

//render list of all items
router.get('', function (req, res, next) {
    try {
        return res.json({ items: Item.findAll() });
    }
    catch (err) {
        return next(err);
    }
});

//add a new item to the list
router.post('', function (req, res, next) {
    try {
        let newItem = new Item(req.body.name, req.body.price);
        return res.status(201).json({ item: newItem });
    }
    catch (err) {
        return next(err);
    }
});


//get a single item from the list
router.get('/:name', function (req, res, next) {
    try {
        return res.json({ item: Item.find(req.params.name) });
    }
    catch (err) {
        return next(err);
    }
});

//update a single item from the list
router.patch('/:name', function (req, res, next) {
    try {
        return res.json({ item: Item.update(req.params.name, req.body) });
    }
    catch (err) {
        return next(err);
    }
});

//delete a single item from the list
router.delete('/:name', function (req, res, next) {
    try {
        Item.delete(req.params.name);
        return res.json({ message: "Deleted" });
    }
    catch (err) {
        return next(err);
    }
});

module.exports = router;
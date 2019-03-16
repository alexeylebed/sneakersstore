const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    date: {type: Date, default: Date.now},
    cart: {type: Array, required: true},
    subtotal: {type: Number, required: true},
    tax: {type: Number, required: true},
    total: {type: Number, required: true}
})

const Order = mongoose.model("Order", itemSchema)

module.exports = Order;
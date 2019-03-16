const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    id: {type: Number, required: true},
    category: {type: String, required: true},
    brand: {type: String, required: true},
    reviews: {type: Number, required: true},
    rating: {type: Number, required: true},
    title:  {type: String, required: true},
    details:  {type: String, required: true},
    productFeatures: {type: Array, required: true},
    price:  {type: Number, required: true},
    sizes: {type: Array, required: true},
    imgId: {type: String, required: true}
})

const Item = mongoose.model("Item", itemSchema)

module.exports = Item;
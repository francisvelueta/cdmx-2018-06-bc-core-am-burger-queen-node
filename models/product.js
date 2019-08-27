const { Schema, model } = require('mongoose')

const productSchema = new Schema({
  name: String,
  price: Number,
  category: String
})

const Product = model('product', productSchema)

module.exports = { Product }

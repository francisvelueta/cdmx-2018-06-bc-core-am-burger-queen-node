const { Product } = require('./../models/product')
const { createPrivatePropsFilter, buildLinkHeader } = require('../lib/util')

const omitPrivateProps = createPrivatePropsFilter(['password'])

module.exports = {
  index: async (req, res, next) => {
    const products = await Product.find({})
    if (!products)
      return res.status(404).send({ message: 'Products not found' })

    res.status(200).send(products)
  },
  newProduct: async (req, res, next) => {
    const newProduct = new Product(req.body)
    const product = await newProduct.save()
    if (!product)
      return res
        .status(405)
        .send({ message: 'Product not created, something went wrong' })
    res.status(200).send(omitPrivateProps(product))
  },
  getProduct: async (req, res, next) => {
    const { productId } = req.params
    const product = await Product.findById(productId)
    if (!product) return res.status(406).send({ message: 'Product not found' })
    res.status(200).send(omitPrivateProps(product))
  },
  updateProduct: async (req, res, next) => {
    const { productId } = req.params
    const newProduct = req.body
    const product = await Product.findByIdAndUpdate(productId, newProduct)
    if (!product)
      return res
        .status(407)
        .send({ message: 'Product not updated, something went wrong' })
    res.status(200).send(omitPrivateProps(product))
  },

  deleteProduct: async (req, res, next) => {
    const { productId } = req.params
    const product = await Product.findByIdAndDelete(productId)
    if (!product)
      return res
        .status(408)
        .send({ message: 'Product not deleted, something went wrong' })
    res.status(200).send({ sucess: true, message: 'Product deleted' })
  }
}

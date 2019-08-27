const {
  index,
  newProduct,
  getProduct,
  updateProduct,
  deleteProduct
} = require('./../controllers/products')
const { requireAuth } = require('./../middleware/auth')

module.exports = (app, next) => {
  app.get('/products', requireAuth, index)
  app.post('/products', requireAuth, newProduct)
  app.get('/products/:productId', requireAuth, getProduct)
  app.put('/products/:productId', requireAuth, updateProduct)
  app.delete('/products/:productId', requireAuth, deleteProduct)
  return next()
}

const express = require('express')
const mongoose = require('mongoose')
const config = require('./config')
const authMiddleware = require('./middleware/auth')
const errorHandler = require('./middleware/error')
const routes = require('./routes')
const pkg = require('./package.json')
const cors = require('cors')
const helmet = require('helmet')

const { port, mongoUrl, secret } = config
const app = express()

// Conectar aplicación a MongoDB
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useNewUrlParser', true)
mongoose.connect(mongoUrl, { useNewUrlParser: true })

app.set('config', config)
app.set('pkg', pkg)

// utilizar middlewares
app.use(express.json())
app.use(authMiddleware(secret))
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())
if (app.get('env') === 'development') {
  app.use(require('morgan')('dev'))
}
// Registrar rutas
routes(app, err => {
  if (err) {
    throw err
  }

  // Registro de "middleware" que maneja posibles errores
  app.use(errorHandler)

  app.listen(port, () => console.log(`App listening on port ${port}`))
})

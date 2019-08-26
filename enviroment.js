module.exports = env => {
  const path = env === 'production' ? '.env.prod' : '.env.dev'
  const config = require('dotenv').config({ path })
  if (config.error) throw new Error('Env variables not found')
}

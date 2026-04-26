import express from 'express'
import cors from 'cors'
import productRoutes from './routes/product.routes.js'
import { corsOptions } from './config/cors.js'

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (_req, res) => {
  res.json({
    service: 'doc-api',
    status: 'ok'
  })
})

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.use('/api/products', productRoutes)

app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found'
  })
})

app.use((err, _req, res, _next) => {
  console.error(err)

  res.status(500).json({
    message: 'Internal server error'
  })
})

export default app
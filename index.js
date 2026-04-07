import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://sosukii.github.io'
  ]
}))
app.use(express.json())

await mongoose.connect(process.env.MONGODB_URI)

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    images: { type: [String], default: [] },
    category: { type: String, default: '' },
    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

app.get('/api/products', async (_req, res) => {
  const products = await Product.find({ isPublished: true }).sort({ createdAt: -1 })
  res.json(products)
})

app.get('/api/products/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isPublished: true })
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json(product)
})

app.post('/api/products', async (req, res) => {
  const product = await Product.create(req.body)
  res.status(201).json(product)
})

app.patch('/api/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json(product)
})

app.delete('/api/products/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})
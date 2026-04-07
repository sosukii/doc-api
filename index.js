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

app.get('/', (_req, res) => {
  res.send('doc-api is live')
})

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

await mongoose.connect(process.env.MONGODB_URI)

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, default: '', trim: true },
    price: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },

    brand: { type: String, default: '', trim: true, lowercase: true },
    category: { type: String, default: '', trim: true, lowercase: true },
    subcategory: { type: String, default: '', trim: true, lowercase: true },
    productType: { type: String, default: '', trim: true, lowercase: true },

    article: { type: String, default: '', trim: true },

    availabilityStatus: { type: String, default: 'Под заказ', trim: true },
    warrantyInformation: { type: String, default: 'По запросу', trim: true },
    shippingInformation: { type: String, default: 'Уточняется', trim: true },

    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
)

productSchema.index({ brand: 1, category: 1, subcategory: 1, productType: 1 })

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
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
productSchema.index({ createdAt: -1 })

const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

app.get('/api/products', async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1)
    const limit = Math.max(1, Math.min(100, Number(req.query.limit) || 12))
    const skip = (page - 1) * limit

    const search = String(req.query.search || '').trim()
    const category = String(req.query.category || '').trim().toLowerCase()

    const filter = { isPublished: true }

    if (category) {
      filter.category = category
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { article: { $regex: search, $options: 'i' } },
        { slug: { $regex: search, $options: 'i' } }
      ]
    }

    const [items, total] = await Promise.all([
      Product.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter)
    ])

    res.json({
      items,
      total,
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit))
    })
  } catch (error) {
    console.error('GET /api/products failed:', error)
    res.status(500).json({
      message: 'Failed to load products'
    })
  }
})

app.get('/api/products/categories', async (_req, res) => {
  try {
    const categories = await Product.distinct('category', { isPublished: true })
    res.json(
      categories
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
    )
  } catch (error) {
    console.error('GET /api/products/categories failed:', error)
    res.status(500).json({
      message: 'Failed to load categories'
    })
  }
})

app.get('/api/products/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      isPublished: true
    }).lean()

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    console.error(`GET /api/products/${req.params.slug} failed:`, error)
    res.status(500).json({
      message: 'Failed to load product'
    })
  }
})

app.post('/api/products', async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    console.error('POST /api/products failed:', error)
    res.status(500).json({
      message: 'Failed to create product'
    })
  }
})

app.patch('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json(product)
  } catch (error) {
    console.error(`PATCH /api/products/${req.params.id} failed:`, error)
    res.status(500).json({
      message: 'Failed to update product'
    })
  }
})

app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }

    res.json({ ok: true })
  } catch (error) {
    console.error(`DELETE /api/products/${req.params.id} failed:`, error)
    res.status(500).json({
      message: 'Failed to delete product'
    })
  }
})

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})
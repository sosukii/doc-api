import Product from '../models/Product.js'
import { parseQueryList, parsePaginationQuery } from '../utils/query.js'

const parsePrice = (value) => {
  if (value === undefined || value === null || value === '') {
    return null
  }

  const price = Number(value)

  return Number.isFinite(price) ? price : null
}

const buildProductFilter = (query) => {
  const search = String(query.search || '').trim()
  const brands = parseQueryList(query.brand)
  const categories = parseQueryList(query.category)

  const priceFrom = parsePrice(query.priceFrom)
  const priceTo = parsePrice(query.priceTo)

  const filter = { isPublished: true }

  if (brands.length === 1) {
    filter.brand = brands[0]
  }

  if (brands.length > 1) {
    filter.brand = { $in: brands }
  }

  if (categories.length === 1) {
    filter.category = categories[0]
  }

  if (categories.length > 1) {
    filter.category = { $in: categories }
  }

  if (priceFrom !== null || priceTo !== null) {
    filter.price = {}

    if (priceFrom !== null) {
      filter.price.$gte = priceFrom
    }

    if (priceTo !== null) {
      filter.price.$lte = priceTo
    }
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

  return filter
}

export const getProducts = async (query) => {
  const { page, limit, skip } = parsePaginationQuery(query)
  const filter = buildProductFilter(query)

  const [items, total] = await Promise.all([
    Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Product.countDocuments(filter)
  ])

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit))
  }
}

export const getProductCategories = async () => {
  const categories = await Product.distinct('category', { isPublished: true })

  return categories
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b))
}

export const getProductBySlug = async (slug) => {
  return Product.findOne({
    slug,
    isPublished: true
  }).lean()
}

export const createProduct = async (payload) => {
  return Product.create(payload)
}

export const updateProductById = async (id, payload) => {
  return Product.findByIdAndUpdate(id, payload, { new: true })
}

export const deleteProductById = async (id) => {
  return Product.findByIdAndDelete(id)
}
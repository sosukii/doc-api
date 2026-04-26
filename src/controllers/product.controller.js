import {
  getProducts,
  getProductCategories,
  getProductBySlug,
  createProduct,
  updateProductById,
  deleteProductById
} from '../services/product.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const listProducts = asyncHandler(async (req, res) => {
  const result = await getProducts(req.query)
  res.json(result)
})

export const listProductCategories = asyncHandler(async (_req, res) => {
  const categories = await getProductCategories()
  res.json(categories)
})

export const getProductDetails = asyncHandler(async (req, res) => {
  const product = await getProductBySlug(req.params.slug)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  res.json(product)
})

export const createProductItem = asyncHandler(async (req, res) => {
  const product = await createProduct(req.body)
  res.status(201).json(product)
})

export const updateProductItem = asyncHandler(async (req, res) => {
  const product = await updateProductById(req.params.id, req.body)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  res.json(product)
})

export const deleteProductItem = asyncHandler(async (req, res) => {
  const product = await deleteProductById(req.params.id)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  res.json({ ok: true })
})
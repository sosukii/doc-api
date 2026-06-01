import { getAllProductsForAdmin, updateProductVisibility } from '../services/admin.products.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const listProductsForAdmin = asyncHandler(async (_req, res) => {
  const products = await getAllProductsForAdmin()
  res.json(products)
})

export const patchProductVisibility = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { visible } = req.body

  if (typeof visible !== 'boolean') {
    return res.status(400).json({ message: 'visible must be boolean' })
  }

  const product = await updateProductVisibility(id, visible)

  if (!product) {
    return res.status(404).json({ message: 'Product not found' })
  }

  res.json(product)
})

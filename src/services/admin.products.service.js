import Product from '../models/Product.js'

export const getAllProductsForAdmin = () =>
  Product.find().select('_id title isPublished').sort({ createdAt: -1 }).lean()

export const updateProductVisibility = (id, visible) =>
  Product.findByIdAndUpdate(id, { isPublished: visible }, { new: true })

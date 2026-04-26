import { Router } from 'express'
import {
  listProducts,
  listProductCategories,
  getProductDetails,
  createProductItem,
  updateProductItem,
  deleteProductItem
} from '../controllers/product.controller.js'

const router = Router()

router.get('/', listProducts)
router.get('/categories', listProductCategories)
router.get('/:slug', getProductDetails)
router.post('/', createProductItem)
router.patch('/:id', updateProductItem)
router.delete('/:id', deleteProductItem)

export default router
import { Router } from 'express'
import { requireAuth } from '../middleware/auth.js'
import { login } from '../controllers/admin.auth.controller.js'
import { listSettings, patchSetting } from '../controllers/admin.settings.controller.js'
import { listPages, patchPageVisibility } from '../controllers/admin.pages.controller.js'
import { listProductsForAdmin, patchProductVisibility } from '../controllers/admin.products.controller.js'
import { listBanners, patchBannerVisibility } from '../controllers/admin.banners.controller.js'

const router = Router()

// ── Public endpoints ───────────────────────────────────────────────────────
router.post('/login', login)

// Public banners read (used by the main site)
router.get('/banners/public', listBanners)

// ── Protected endpoints ────────────────────────────────────────────────────
router.use(requireAuth)

router.get('/settings', listSettings)
router.patch('/settings/:key', patchSetting)

router.get('/pages', listPages)
router.patch('/pages/:key', patchPageVisibility)

router.get('/products', listProductsForAdmin)
router.patch('/products/:id', patchProductVisibility)

router.get('/banners', listBanners)
router.patch('/banners/:id', patchBannerVisibility)

router.get('/system/status', (_req, res) => {
  res.json({
    status: 'ok',
    version: process.env.npm_package_version || '1.0.0',
    uptime: process.uptime(),
    startedAt: new Date(Date.now() - process.uptime() * 1000).toISOString(),
  })
})

export default router

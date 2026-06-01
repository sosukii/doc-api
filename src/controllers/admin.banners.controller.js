import { getAllBanners, updateBannerVisibility } from '../services/admin.banners.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const listBanners = asyncHandler(async (_req, res) => {
  const banners = await getAllBanners()
  res.json(banners)
})

export const patchBannerVisibility = asyncHandler(async (req, res) => {
  const { id } = req.params
  const { visible } = req.body

  if (typeof visible !== 'boolean') {
    return res.status(400).json({ message: 'visible must be boolean' })
  }

  const banner = await updateBannerVisibility(id, visible)

  if (!banner) {
    return res.status(404).json({ message: 'Banner not found' })
  }

  res.json(banner)
})

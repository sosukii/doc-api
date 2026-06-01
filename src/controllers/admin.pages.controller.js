import { getAllPages, updatePageVisibility } from '../services/admin.pages.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const listPages = asyncHandler(async (_req, res) => {
  const pages = await getAllPages()
  res.json(pages)
})

export const patchPageVisibility = asyncHandler(async (req, res) => {
  const { key } = req.params
  const { visible } = req.body

  if (typeof visible !== 'boolean') {
    return res.status(400).json({ message: 'visible must be boolean' })
  }

  const page = await updatePageVisibility(key, visible)

  if (!page) {
    return res.status(404).json({ message: 'Page not found' })
  }

  res.json(page)
})

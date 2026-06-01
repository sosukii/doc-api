import { getAllSettings, updateSetting } from '../services/admin.settings.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const listSettings = asyncHandler(async (_req, res) => {
  const settings = await getAllSettings()
  res.json(settings)
})

export const patchSetting = asyncHandler(async (req, res) => {
  const { key } = req.params
  const { value } = req.body

  if (value === undefined) {
    return res.status(400).json({ message: 'Value is required' })
  }

  const setting = await updateSetting(key, value)
  res.json(setting)
})

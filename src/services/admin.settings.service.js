import Setting from '../models/Setting.js'

export const getAllSettings = () => Setting.find().lean()

export const updateSetting = (key, value) =>
  Setting.findOneAndUpdate({ key }, { value }, { new: true, upsert: true })

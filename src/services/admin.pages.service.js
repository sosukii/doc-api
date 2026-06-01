import Page from '../models/Page.js'

export const getAllPages = () => Page.find().sort({ key: 1 }).lean()

export const updatePageVisibility = (key, visible) =>
  Page.findOneAndUpdate({ key }, { visible }, { new: true })

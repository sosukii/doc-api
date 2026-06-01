import Banner from '../models/Banner.js'

export const getAllBanners = () => Banner.find().sort({ order: 1 }).lean()

export const updateBannerVisibility = (id, visible) =>
  Banner.findByIdAndUpdate(id, { visible }, { new: true })

import mongoose from 'mongoose'

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, default: '', trim: true },
    image: {
      mobile: { type: String, default: '' },
      tablet: { type: String, default: '' },
      desktop: { type: String, default: '' },
    },
    link: { type: String, default: '' },
    visible: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

bannerSchema.index({ order: 1 })

export default mongoose.models.Banner || mongoose.model('Banner', bannerSchema)

import mongoose from 'mongoose'

const pageSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, trim: true },
    label: { type: String, required: true, trim: true },
    visible: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.Page || mongoose.model('Page', pageSchema)

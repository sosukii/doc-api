import mongoose from 'mongoose'

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    description: { type: String, default: '', trim: true },
    price: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },

    tags: { type: [String], default: [] },
    customOptions: { type: [mongoose.Schema.Types.Mixed], default: [] },
    properties: { type: [mongoose.Schema.Types.Mixed], default: [] },

    brand: { type: String, default: '', trim: true, lowercase: true },
    category: { type: String, default: '', trim: true, lowercase: true },
    subcategory: { type: String, default: '', trim: true, lowercase: true },
    productType: { type: String, default: '', trim: true, lowercase: true },

    article: { type: String, default: '', trim: true },

    availabilityStatus: { type: String, default: 'Под заказ', trim: true },
    warrantyInformation: { type: String, default: 'По запросу', trim: true },
    shippingInformation: { type: String, default: 'Уточняется', trim: true },

    isPublished: { type: Boolean, default: true }
  },
  { timestamps: true }
)

productSchema.index({ brand: 1, category: 1, subcategory: 1, productType: 1 })
productSchema.index({ createdAt: -1 })

export default mongoose.models.Product || mongoose.model('Product', productSchema)
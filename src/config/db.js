import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const connectDb = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env')
    }

    await mongoose.connect(process.env.MONGODB_URI)

    console.log('Mongo connected')
  } catch (error) {
    console.error('Mongo connection error:', error)
    process.exit(1)
  }
}
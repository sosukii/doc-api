import app from './app.js'
import { connectDb } from './config/db.js'

const PORT = process.env.PORT || 3001

await connectDb()

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`)
})
import { loginAdmin } from '../services/admin.auth.service.js'
import { asyncHandler } from '../utils/asyncHandler.js'

export const login = asyncHandler(async (req, res) => {
  const { login, password } = req.body

  if (!login || !password) {
    return res.status(400).json({ message: 'Login and password are required' })
  }

  const token = loginAdmin(login, password)

  if (!token) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  res.json({ token })
})

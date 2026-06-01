import jwt from 'jsonwebtoken'

export const loginAdmin = (login, password) => {
  if (
    login !== process.env.ADMIN_LOGIN ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return null
  }

  return jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' })
}

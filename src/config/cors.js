const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://aventcompany.shop',
  'https://www.aventcompany.shop',
]

if (process.env.ADMIN_ORIGIN) {
  allowedOrigins.push(process.env.ADMIN_ORIGIN)
}

export const corsOptions = {
  origin: allowedOrigins,
}

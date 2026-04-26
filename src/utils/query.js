export const parseQueryList = (value) => {
  if (!value) return []

  const rawValues = Array.isArray(value)
    ? value
    : String(value).split(',')

  return [...new Set(
    rawValues
      .map((item) => String(item).trim().toLowerCase())
      .filter(Boolean)
  )]
}

export const parsePaginationQuery = (query) => {
  const page = Math.max(1, Number(query.page) || 1)
  const limit = Math.max(1, Math.min(100, Number(query.limit) || 12))
  const skip = (page - 1) * limit

  return { page, limit, skip }
}
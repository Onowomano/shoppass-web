/**
 * Sorts products so unique items (by productID) are shown across the carousel
 * before variants repeat. IDs follow the format "productID-variantID"
 * e.g. 0001-01, 0002-01, 0003-01, 0001-02, 0002-02 ...
 *
 * Primary sort key: variantID (ascending)
 * Secondary sort key: productID (ascending)
 *
 * @param {Array<{ id: string }>} products
 * @returns {Array}
 */
export function sortProductsUniqueFirst(products) {
  return [...products].sort((a, b) => {
    const [aProduct, aVariant = ''] = a.id.split('-')
    const [bProduct, bVariant = ''] = b.id.split('-')
    if (aVariant !== bVariant) return aVariant.localeCompare(bVariant)
    return aProduct.localeCompare(bProduct)
  })
}

/**
 * Formats a numeric price value with the ₦ sign and comma separators.
 * Handles raw numbers (10000), pre-formatted strings ("10,000"), or
 * strings that already include the sign ("₦10,000").
 *
 * @param {string|number} value
 * @returns {string} e.g. "₦10,000"
 */
export function formatPrice(value) {
  const num = parseFloat(String(value).replace(/[^0-9.]/g, ''))
  if (isNaN(num)) return String(value)
  return `₦${num.toLocaleString('en-NG')}`
}

/**
 * Converts a date string from Google Sheets into a human-readable
 * relative label.
 *
 * @param {string} dateStr
 * @returns {string} e.g. "today" | "yesterday" | "3 days ago" | "1 week ago" | ...
 */
export function formatRelativeDate(dateStr) {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr

  const now = new Date()
  const diffMs = now.setHours(0, 0, 0, 0) - date.setHours(0, 0, 0, 0)
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays <= 0) return 'today'
  if (diffDays === 1) return 'yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 14) return '1 week ago'
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  if (diffDays < 60) return '1 month ago'
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`
  if (diffDays < 730) return '1 year ago'
  return `${Math.floor(diffDays / 365)} years ago`
}

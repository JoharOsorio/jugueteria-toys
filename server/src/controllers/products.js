import { readJSON } from '../utils.js'

let products = []

try {
  const data = readJSON('./services/products.json')
  if (data) {
    products = data
  }
} catch (error) {
  console.error('Error reading products JSON file:', error)
}

export const getProducts = (req, res) => {
  return res.json(products)
}

export const createProduct = (req, res) => {
  const newProduct = req.body

  // Modificar los productos con el nuevo producto
  products.push(newProduct)

  res.json(newProduct)
}

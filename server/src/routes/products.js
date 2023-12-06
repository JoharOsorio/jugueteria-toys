import { Router } from 'express'
import { createProduct, getProducts } from '../controllers/products.js'
const productsRouter = Router()

productsRouter.get('/', (req, res) => {
  res.json(getProducts(req, res))
  res.status(200)
})

productsRouter.post('/', (req, res) => {
  const newProduct = req.body
  res.json(createProduct(newProduct))
  res.status(201)
})

export default productsRouter

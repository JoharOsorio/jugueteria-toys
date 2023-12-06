import express from 'express'
import cors from 'cors'
import productsRouter from './routes/products.js'

const app = express()
const port = process.env.PORT ?? 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ type: '*/*' }))
app.use(cors())
app.disable('x-powered-by')

app.use('/products', productsRouter)

app.listen(port, () => {
  console.log(`Server running on url  http://localhost:${port}`)
})

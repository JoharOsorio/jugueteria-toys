import express from 'express'
import cors from 'cors'
import productsRouter from './routes/products.js'
import { MercadoPagoConfig, Preference } from 'mercadopago'

const app = express()
const port = process.env.PORT ?? 3001
const client = new MercadoPagoConfig({
  accessToken: 'TEST-2357113490393760-122321-93679f8e8124464b43f70f1ef32240b1-1218458983'
})

// app.use(express.urlencoded({ extended: true }))
app.use(express.json({ type: '*/*' }))
app.use(cors())
app.disable('x-powered-by')

app.use('/products', productsRouter)

app.post('/create_preference', async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: 'CLP'
        }
      ],
      back_urls: {
        success: 'http://127.0.0.1:5500/client/Index.html',
        failure: 'http://127.0.0.1:5500/client/Index.html',
        pending: 'http://127.0.0.1:5500/client/Index.html'
      },
      auto_return: 'approved'
    }

    const preference = new Preference(client)
    const result = await preference.create({ body })
    res.json({
      id: result.id
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      error: 'Error al crear la preferencia :('
    })
  }
})

app.listen(port, () => {
  console.log(`Server running on url  http://localhost:${port}`)
})

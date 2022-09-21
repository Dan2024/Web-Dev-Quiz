import express from 'express'
import cors from 'cors'

const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/login', (_, res) => {
  res.json({ msg: 'Hello' })
})

app.get('*', (_, res) => {
  res.status(404).json({
    status: 'fail',
    data: {
      resource: 'Not found',
    },
  })
})

export default app

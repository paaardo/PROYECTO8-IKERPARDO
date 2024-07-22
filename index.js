require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const puerto = 3000

app.use(express.json())

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.log(err))

app.use('/api/usuarios', require('./routes/users'))
app.use('/api/fotos', require('./routes/photos'))

app.listen(puerto, () => {
  console.log(`Servidor en el puerto ${puerto}`)
})

require('dotenv').config()
const mongoose = require('mongoose')
const Usuario = require('./models/user')

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log('Conectado a MongoDB')

    await Usuario.deleteMany({})
    console.log('Usuarios eliminados')

    const usuarios = [
      {
        nombre: 'Iker Pardo',
        email: 'iker@pardo.com',
        password: '123456'
      }
    ]

    await Usuario.insertMany(usuarios)
    console.log('Usuario creado')

    mongoose.connection.close()
  })
  .catch((err) => console.log(err))

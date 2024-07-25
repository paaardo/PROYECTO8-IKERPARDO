require('dotenv').config()
const mongoose = require('mongoose')
const Usuario = require('./models/user')
const Foto = require('./models/photo')
const seedData = require('./seedData.json')

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async () => {
    console.log('Conectado a MongoDB')

    await Usuario.deleteMany({})
    await Foto.deleteMany({})
    console.log('Usuarios y fotos eliminados')

    const usuariosCreados = await Usuario.insertMany(seedData.usuarios)
    console.log('Usuarios creados')

    for (const usuario of usuariosCreados) {
      const fotos = seedData.imagenesReales.map((url, index) => ({
        url: url,
        usuario: usuario._id,
        public_id: `fotos_feed/sample${index + 1}_${usuario._id}`
      }))

      const fotosCreadas = await Foto.insertMany(fotos)
      usuario.fotos = fotosCreadas.map((foto) => foto._id)
      await usuario.save()
    }

    console.log('Semilla generada rey')

    mongoose.connection.close()
  })
  .catch((err) => console.log(err))

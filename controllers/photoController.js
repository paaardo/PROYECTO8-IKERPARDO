const Foto = require('../models/photo')
const cloudinary = require('../middleware/cloudinary')
const fs = require('fs')

exports.subirFoto = async (req, res) => {
  try {
    const { usuario } = req.body
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'fotos_feed'
    })

    const nuevaFoto = new Foto({
      url: result.secure_url,
      usuario: usuario,
      public_id: result.public_id
    })

    await nuevaFoto.save()

    fs.unlinkSync(req.file.path)

    res.status(201).send(nuevaFoto)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.obtenerFotos = async (req, res) => {
  try {
    const fotos = await Foto.find().populate('usuario')
    res.send(fotos)
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.obtenerFotoPorId = async (req, res) => {
  try {
    const foto = await Foto.findById(req.params.id).populate('usuario')
    if (!foto) {
      return res.status(404).send({ mensaje: 'Foto no encontrada' })
    }
    res.send(foto)
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.actualizarFoto = async (req, res) => {
  try {
    const foto = await Foto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!foto) {
      return res.status(404).send({ mensaje: 'Foto no encontrada' })
    }
    res.send(foto)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.eliminarFoto = async (req, res) => {
  try {
    const foto = await Foto.findByIdAndDelete(req.params.id)
    if (!foto) {
      return res.status(404).send({ mensaje: 'Foto no encontrada' })
    }

    await cloudinary.uploader.destroy(foto.public_id)

    res.send({ mensaje: 'Foto eliminada' })
  } catch (error) {
    res.status(500).send(error)
  }
}

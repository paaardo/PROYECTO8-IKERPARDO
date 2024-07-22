const Usuario = require('../models/user')

exports.crearUsuario = async (req, res) => {
  try {
    const usuario = new Usuario(req.body)
    await usuario.save()
    res.status(201).send(usuario)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().populate('fotos')
    res.send(usuarios)
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).populate('fotos')
    if (!usuario) {
      return res.status(404).send({ mensaje: 'Usuario no encontrado' })
    }
    res.send(usuario)
  } catch (error) {
    res.status(500).send(error)
  }
}

exports.actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!usuario) {
      return res.status(404).send({ mensaje: 'Usuario no encontrado' })
    }
    res.send(usuario)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id)
    if (!usuario) {
      return res.status(404).send({ mensaje: 'Usuario no encontrado' })
    }
    res.send({ mensaje: 'Usuario eliminado' })
  } catch (error) {
    res.status(500).send(error)
  }
}

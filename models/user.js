const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fotos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Foto' }]
})

module.exports = mongoose.model('Usuario', UserSchema)

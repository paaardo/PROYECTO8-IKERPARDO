const mongoose = require('mongoose')

const PotoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  public_id: { type: String, required: true }
})

module.exports = mongoose.model('Foto', PotoSchema)

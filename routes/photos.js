const express = require('express')
const router = express.Router()
const photoController = require('../controllers/photoController')
const upload = require('../middleware/multer')

router.post('/', upload.single('foto'), photoController.subirFoto)
router.get('/', photoController.obtenerFotos)
router.get('/:id', photoController.obtenerFotoPorId)
router.put('/:id', photoController.actualizarFoto)
router.delete('/:id', photoController.eliminarFoto)

module.exports = router

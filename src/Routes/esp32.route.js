const {Router} = require('express')
const medidorCtrl = require('../Controllers/medidor.controller')
const sinricCtrl = require('../Controllers/sinric.controller')

const router = Router()
// NDA
router.post('/create',medidorCtrl.create)
router.get('/getAll',medidorCtrl.getAll)
router.put('/update/:id',medidorCtrl.update)
// Bomba
router.get('/bomba/on',sinricCtrl.bombaOn)

module.exports = router
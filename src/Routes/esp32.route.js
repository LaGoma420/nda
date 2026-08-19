const {Router} = require('express')
const medidorCtrl = require('../Controllers/medidor.controller')

const router = Router()

router.post('/create',medidorCtrl.create)
router.get('/getAll',medidorCtrl.getAll)
router.put('/update/:id',medidorCtrl.update)

module.exports = router
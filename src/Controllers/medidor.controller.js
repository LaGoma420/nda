const medidorCtrl = {}
const medidorSchema = require('../Models/Medidor')

const sanitizar = (dato) => {

    // Dato && Name
    if (!dato || typeof dato.name !== 'string' || dato.name.trim() === '') {
        return false;
    }
    // IP
    if (typeof dato.ip !== 'string' || dato.ip.trim() === '') {
        return false;
    }

    return true;
}

medidorCtrl.create = async (req, res) => {
    try {
        if (sanitizar(req.body)) {
            const newMedidor = await new medidorSchema({
                name: req.body.name,
                ip: req.body.ip
            })
            await newMedidor.save()
            // console.log(newMedidor)
            res.json(newMedidor)
        } else {
            // console.log("Faltan datos")
            res.send("Faltan datos")
        }
    } catch (err) { console.error(err) }
}
medidorCtrl.read = async (req, res) => {
    try {
        res.json(req.body)
    } catch (err) { console.error(err) }
}
medidorCtrl.getAll = async (req, res) => {
    try {
        const todos = await medidorSchema.find()
        res.json(todos)
    } catch (err) { console.error(err) }
}
medidorCtrl.update = async (req, res) => {
    try {
        const { id } = req.params;
        const datosNuevos = req.body;
        const actualizar = await medidorSchema.findByIdAndUpdate(id, datosNuevos, { returnDocument: 'after', runValidators: true })
        res.json(actualizar)
    } catch (err) { console.error(err) }
}
medidorCtrl.delete = async (req, res) => {
    try {
        res.json(req.body)
    } catch (err) { console.error(err) }
}

module.exports = medidorCtrl
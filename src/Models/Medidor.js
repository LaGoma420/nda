const { model, Schema } = require('mongoose')

const medidorSchema = new Schema({

    name: {type: String, required: true},
    ip: {type: String, required: true},
    bomba: {
        auto:  {type: Boolean},
        status: {type: Boolean},
        name: {type: String},
        ip: {type: String},
        // time:{
        //   status: false
        // }
    },
    level: [
        {type: Boolean}
    ],
    up:  {type: Boolean}
},{
    timestamps:true,
    versionKey: false
})

module.exports = model('Medidor',medidorSchema)
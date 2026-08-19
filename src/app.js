const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.set('PORT', process.env.PORT)

app.listen(app.get('PORT'), () => {
    console.log("Server on Port: " + app.get('PORT'))
})

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/medidor', require('./Routes/esp32.route'))

module.exports = app
const express = require('express')

const app = express()

app.set('PORT',420)

app.listen(app.get('PORT'),()=>{
    console.log('server on Port: '+app.get('PORT'))
})
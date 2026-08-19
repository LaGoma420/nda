const mongoose = require('mongoose')

mongoose.connect(process.env.URI)
.then(()=>{
    console.log("DB [ OK ]")
})
.catch((err)=>{
    console.log(err)
})

module.exports = mongoose
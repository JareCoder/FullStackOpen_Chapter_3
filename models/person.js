const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }
  
  const password = process.argv[2]

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(url).then(result => {
    console.log('Connected to MongoDB')
}).catch((e) => {
    console.log('Error connecting to MongoDB:', e.message)
})

const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
  })

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject._id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
  })
  
module.exports = mongoose.model('Person', personSchema)
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
mongoose.connect(url).then(result => {
    console.log('Connected to MongoDB')
}).catch((e) => {
    console.log('Error connecting to MongoDB:', e.message)
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
    },
    number: {
        type: String,
        validate:{
            validator: function(v){
                return /^\d{2,3}-\d{5,}$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        minlength: 8,
        required: true,
    },
    id: String,
  })

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
  })
  
module.exports = mongoose.model('Person', personSchema)
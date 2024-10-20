const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://jessemlappalainen:${password}@fullstackopencluster.kp0jx.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length === 3){
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
}else if(process.argv.length === 5){
  const person = new Person({
    id: Math.floor(Math.random() * 1000),
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(result => {
    console.log('Person saved! Info:', result)
    mongoose.connection.close()
  })
}else{
  console.log('Invalid arguments')
  mongoose.connection.close()
}
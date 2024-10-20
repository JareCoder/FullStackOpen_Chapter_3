require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :body'))


app.get('/', (req, res) => {
    res.send('<h1>I am not broken :)</h1>')
})

app.get('/api/persons', (req, res, next) => {
    Person.find({}).then(result => {
        res.json(result)
    }).catch(e => next(e))
})

app.get('/info', (req, res, next) => {
    const date = new Date()
    Person.countDocuments({}).then(count => {
    res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${date}</p>
    `)}).catch(e => next(e))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id).then(person => {
        if(person){
            res.json(person)
        }else{
            res.status(404).end()
        }
    }).catch(e => next(e))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndDelete(req.params.id).then(result => {
        res.status(204).end()
    }).catch(e => next(e))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body

    if(!body.name){
        return res.status(400).json({
            error: 'Name missing'
        })
    }else if(!body.number){
        return res.status(400).json({
            error: 'Number missing'
        })
    }

    /*const existingPerson = await Person.findOne({name: body.name})

    if(existingPerson){
        return res.status(400).json({
            error: 'Name must be unique'
        })
    }*/

    const person = new Person({
        id: Math.floor(Math.random() * 1000),
        name: body.name,
        number: body.number
    })
    
    person.save().then(savedPerson => {
        res.json(savedPerson)
    }).catch(e => next(e))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number,
        id: body.id,
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true}).then(updatedPerson => {
        res.json(updatedPerson)
    }).catch(e => next(e))
})


const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if(error.name === 'CastError'){
        return res.status(400).send({error: 'malformatted id'})
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
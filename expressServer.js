const express = require('express');
const fs = require('fs')
const app = express();
app.use(express.json());


//reading all pets 
app.get('/pets', (req, res) => {
    fs.readFile("pets.json", 'utf-8', function readPets(error, data) {
        let pets = JSON.parse(data)
        res.send(pets)
    })
})

//reading a specific index of the pets.json
app.get('/pets/:id', (req, res) => {
    fs.readFile("pets.json", 'utf-8', function readPets(error, data) {
        let pets = JSON.parse(data)
        res.send(pets[req.params.id])
    })
})

//adding a new pet 
app.post('/pets', (req, res) => {
    let newPet = {
        age: req.body.age,
        kind: req.body.kind,
        name: req.body.name
    }
    fs.readFile("pets.json", 'utf-8', function readPets(error, data) {
        let pets = JSON.parse(data)
        pets.push(newPet)
        let jsonAddedPets = JSON.stringify(pets)
        fs.writeFileSync('pets.json', jsonAddedPets, 'utf-8')
        res.send(newPet)
    })
})

//updating a pet 
app.patch('/pets/:id', (req, res) => {
    let petAge = Number(req.body.age)
    let petKind = req.body.kind
    let petName = req.body.name
    if (petAge && petKind && petName) {
        fs.readFile("pets.json", 'utf-8', function readPets(error, data) {
            let pets = JSON.parse(data)
            let updatedPet = pets[req.params.id];
            updatedPet.age = petAge
            updatedPet.kind = petKind
            updatedPet.name = petName
            let jsonAddedPets = JSON.stringify(pets)
            fs.writeFileSync('pets.json', jsonAddedPets, 'utf-8')
            res.send(updatedPet)
        })
    } else {
        res.statusCode = 400
        res.setHeader('Content-Type', 'application/json')
        res.send(`Bad Request`)
    }
})


//deleting a pet
app.delete('/pets/:id' , (req,res) => {
    fs.readFile("pets.json", 'utf-8', function readPets(error, data) {
        let pets = JSON.parse(data)
        let destroyedPets = pets.splice(req.params.id, 1)
        let jsonDestroyedPets = JSON.stringify(pets)
        fs.writeFileSync('pets.json', jsonDestroyedPets, 'utf-8')
        res.send(jsonDestroyedPets)
    })
})


app.listen(3000, function () {
    console.log(`server is running`)
})
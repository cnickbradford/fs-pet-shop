
let fs = require('fs');

let option = process.argv[2];
let petIndex = process.argv[3]

switch (option) {
    case 'read':
        fs.readFile("pets.json", 'utf-8', function readPets(error, data) {
            let pets = JSON.parse(data)
            if (petIndex && pets[petIndex]) {
                console.log(pets[petIndex])
            } else if (petIndex) {
                console.error(`Pet index out of range`)
            } else {
                console.log(pets)
            }
        })
        break;


    case 'create':
        if (process.argv[5]) {
            let petAge = parseInt(petIndex)
            let petKind = process.argv[4]
            let petName = process.argv[5]
            let newPet = {
                age: petAge,
                kind: `${petKind}`,
                name: `${petName}`
            }
            fs.readFile("pets.json", 'utf-8', function readPets(error, data) {
                let pets = JSON.parse(data)
                pets.push(newPet)
                let jsonAddedPets = JSON.stringify(pets)
                fs.writeFileSync('pets.json', jsonAddedPets, 'utf-8')
            })
        } else {
            console.error(`Usage: node pets.js create AGE KIND NAME`)
        }

        break;



    case 'update':
        if (process.argv[6]) {
            let petAge = parseInt(process.argv[4])
            let petKind = process.argv[5]
            let petName = process.argv[6]
            fs.readFile("pets.json", 'utf-8', function readPets(error, data) {
                let pets = JSON.parse(data)
                let updatedPet = pets[petIndex];
                updatedPet.age = petAge
                updatedPet.kind= petKind
                updatedPet.name= petName
                console.log(updtedPet)
                let jsonAddedPets = JSON.stringify(pets)
                fs.writeFileSync('pets.json', jsonAddedPets, 'utf-8')
            })
        } else {
            console.error(`Usage: node pets.js update INDEX AGE KIND NAME`)
        }
        break;



    case 'destroy':
        if (petIndex) {
            fs.readFile("pets.json", 'utf-8', function readPets(error, data) {
                let pets = JSON.parse(data)
                let destroyedPets = pets.splice(petIndex, 1)
                let jsonDestroyedPets = JSON.stringify(pets)
                fs.writeFileSync('pets.json', jsonDestroyedPets, 'utf-8')
                console.log(destroyedPets)

            })
        } else {
            console.error(`Usage: node pets.js destroy INDEX`)
        }

        break;
    default:
        console.error(`Usage: node pets.js [read | create | update | destroy]`)
}


const fs = require('fs')

var http = require('http')
var port = process.env.port || 5000;


let server = http.createServer((req, res) => {
    fs.readFile("pets.json", 'utf-8', (error, data) => {
        let pets = JSON.parse(data)
        let lastURL = (req.url.split('/').pop())
        if (req.method) {
            console.error(error)
        }
        if (/^\d+$/.test(lastURL) && pets[lastURL]) {
            console.log(pets[lastURL])
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');

        } else if (/^\d+$/.test(lastURL)) {
            console.error(`Pet index out of range`)
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/plain');

        } else if (lastURL === 'pets') {
            console.log(pets)
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json');
        } else {
            res.statusCode = 404
            res.setHeader('Content-Type', 'text/plain');
            console.error(`Not Found`)
        }
    }
    )
})


server.listen(port, (error) => {
    if (error) {
        console.error(error)
    } else {
        console.log(`server running on ${port}`)
    }
})
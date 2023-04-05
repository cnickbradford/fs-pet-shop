//dependecies 
const dotenv = require('dotenv');
const express = require('express');
const app = express();
dotenv.config();
app.use(express.json());

const PORT = process.env.PORT || 5000

//setting up and connecting pool
const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.CONNECTION_URL })

pool.connect();

//routes to handle request
app.get("/", (req, res) => {
    res.send("Hello World")
})

//request to handle reading all of the pets 
app.get("/pets", (req, res) => {
    pool.query("SELECT * FROM pet").then((result) => {
        console.log(result.rows)
        res.send(result.rows)
    })
})

//request to handle reading of singular pet
app.get("/pets/:id", (req, res) => {
    pool.query(`SELECT * FROM pet WHERE id = ${req.params.id}`).then((result) => {
        console.log(result.rows)
        res.send(result.rows)
    })
})

//request to handle creating a pet 
app.post("/pets", (req, res) => {
    let petAge = req.body.age
    let petKind = req.body.kind
    let petName = req.body.name
    pool.query(`INSERT INTO pet (age, kind, name) VALUES (${petAge}, '${petKind}', '${petName}');`).then((result) =>
        res.send(result.rows))
})

//reques to handle updating a pets information
app.patch('/pets/:id', (req, res) => {
    let key = Object.keys(req.body)[0]
    let value = Object.values(req.body)[0]
    pool.query(`UPDATE pet SET ${key} = $1 WHERE id = $2 RETURNING *`, [value, req.params.id]).then((result) => {
        if (result.rows.length == 0) {
            res.status(400).send('pet id not found')
        } else {
            res.send(result.rows);
        }
    })
})


//setting server to listen to port
app.listen(PORT, (error) => {
    if (error) {
        console.error('error')
    } else {
        console.log(`server running at ${PORT}`)
    }
})
'use strict' // sirve para usar nuevos tipos de variables como const

const express = require ('express');
const bodyParser= require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const api=require('./routes')

// app.get('/hola/:name', (req, res) => {
// 	res.send({message: `Hola amigos ${req.params.name}!`})
// });

app.use('/api', api )
module.exports=app
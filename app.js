'use strict' // sirve para usar nuevos tipos de variables como const

const express = require ('express');
const bodyParser= require('body-parser')
const app = express()
const hbs= require('express-handlebars')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
const api=require('./routes')

// app.get('/hola/:name', (req, res) => {
// 	res.send({message: `Hola amigos ${req.params.name}!`})
// });
//Handlerbars
app.engine('.hbs', hbs({
	defaultLayout: 'default',
	extname: '.hbs'
}))

app.set('view engine', '.hbs')
//
app.use('/api', api )
app.get('/login', (req, res)=>{
	res.render('login')
})
app.get('/', (req, res) => {
  res.render('product')
})
module.exports=app
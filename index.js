'use strict' // sirve para usar nuevos tipos de variables como const



const mongoose= require('mongoose')
const app = require('./app')

const config =require('./config')
mongoose.connect(config.db, (err, res)=>{
	if(err){
		return console.log(`Conecta la base de datos ${err}`)
	}

	console.log('Conexión a Mongodb establecida.')
	// function() es igual a () =>
	app. listen(config.port, () => {
		console.log(`Api Rest corriendo en el puerto ${config.port}`)
	});
})

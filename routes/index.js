'use strict'
const express = require ('express');
const api= express.Router()
const productControllers = require('../controllers/productControllers')
const auth = require('../middlewares/auth')
const userControllers= require('../controllers/user')

api.get('/product', productControllers.getProducts)

api.get('/product/:productID', productControllers.getProduct)

api.post('/product', productControllers.postProduct)

api.put('/product/:productID', productControllers.updateProduct)

api.delete('/product/:productID', productControllers.deleteProduct)

api.post('/signup', userControllers.signUp)
api.post('/signin', userControllers.signIn)
api.get('/private', auth, (req, res)=>{
	res.status(200).send({message: 'Tienes acceso'})
})

module.exports=api
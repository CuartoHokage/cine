'use strict'
const Product= require('../modelos/product')


function getProduct(req, res){
	let productID =req.params.productID
	Product.findById(productID, (err, product) =>{
		if(err) return res.status(500).send({message:`Error al realizar la peticion ${err}` })
		if(!product) return res.status(404).send({message: 'Producto no existe'})
		return res.status(200).send({product})
	})
}

function getProducts(req, res){
	Product.find({}, (err, products)=>{
		if(err) return res.status(500).send({message:`Error al realizar la peticion ${err}` })
		if(!products) return res.status(404).send({message: 'Producto no existe'})
		res.status(200).send({products})
	})
}
function updateProduct(req, res){
	let productID= req.params.productID
	let update= new Product(req.body)
	console.log(update)
	update._id = productID 

	Product.findByIdAndUpdate(productID, update, {new: true}, (err, productUpdated) =>{
		if(err) return res.status(500).send({message: `Error al actualizar producto ${err}`})
		if(!productUpdated) return res.status(500).send({message:'No retorno producto actual'})
		return res.status(200).send({productUpdated })
	})
} 
function deleteProduct(req, res){
	let productID =req.params.productID
	Product.findById(productID, (err, product) => {
		if(err) return res.status(500).send({message: `Error al eliminar datos ${err}`})
		if(!product) return res.status(404).send({message: 'Producto que quiere eliminar no existe'})	
		product.remove(err =>{
			if(err) res.status(500).send({message: `Error al eliminar datos ${err}`})
			res.status(200).send({message: 'El producto a sido eliminado'})
		})

	})
}

function postProduct(req, res){
	console.log('Post /api/product')
	//console.log(res.body)

	let product = new Product()
	product.name= req.body.name
	product.picture= req.body.picture
	product.category= req.body.category
	product.price= req.body.price
	product.description= req.body.description

	product.save((err, productStored)=>{
		if (err) res.status(500).send({message: 'Error al enviar los datos'})
		res.status(200).send({product: productStored})
	})
}

module.exports= {
	getProduct,
	getProducts,
	updateProduct,
	deleteProduct,
	postProduct
}
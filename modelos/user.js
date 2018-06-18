'use strict'

const moongoose = require('mongoose');
const Schema = moongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const cryto = require('crypto')

const UserSchema= new Schema({
	email: {type: String, unique: true, lowercase:true}, //unique es para que no haya dos email repetidos 
	//lowercase guarda email mayusculas o minusculas
	displayName: String,
	avatar: String,
	password: {type:String, select:false},
	signupDate: {type: Date, default: Date.now},
	lastLogin: Date
})

UserSchema.pre('save', function(next) {
	let user= this
	if(!user.isModified('password')) return next()
	bcrypt.genSalt(10, (err, salt)=>{
		if(err) return next(err)

		bcrypt.hash(user.password, salt, null, (err, hash)=>{
			if(err) return next(err)

			user.password=hash
			next()
		})
	})
})

//devolver gravatar de email
UserSchema.methods.gravatar= function(){
	if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`
	const md5 = cryto.createHash('md5').update(this.email).digest('hex')
	return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}
module.exports= moongoose.model('User', UserSchema)
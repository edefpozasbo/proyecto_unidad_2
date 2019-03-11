var mongoose=require("mongoose");

module.exports=new mongoose.Schema({
	no_control:{
		type:String,
		required:true
	},
	nombre_completo:{
		type:String,
		required:true
	},
	carrera:{
		type:String,
		required:true
	},
	semestre:{
		type:Number,
		required:true
	},
	email:{
		type:String,
		required:true,
		match:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
	},
	sendmail:{
		type:Boolean,
		default:false
	}
});
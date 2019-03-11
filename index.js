const path_csv="./csv/alumnos.csv";
const path_template="./template/template.html";

const ops_csv=require("./import");

const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/alumnos",{useNewUrlParser:true});
const schema=require("./schema");
const Alumno=mongoose.model("Alumno",schema,"alumno");

const send_mail=require("./sendmail");

ops_csv.read_from_csv(path_csv).then(json_alumnos=>{
	return ops_csv.write_in_mongo(json_alumnos,Alumno);
}).then(array_alumnos=>{
	return send_mail.load_template(path_template);
}).then(template=>{
	return send_mail.get_users_available(Alumno,3).then(users_available=>{
		return send_mail.send(users_available,template,Alumno);
	});
}).then(data=>{
	console.log("enviados correctamente");
}).catch(err=>{
	console.log(err)
})



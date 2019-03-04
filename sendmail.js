const fs =require("fs");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey("INGRESA API KEY");

module.exports.load_template=function(path){
	return new Promise((resolve,reject)=>{
		fs.readFile(path,function(err,data){
			if(err){
				reject(err);
			}
			resolve(data);
		});
	});
}

module.exports.get_users_available=function(Alumno,limit){
	return Alumno.find({sendmail:false}).limit(limit);
}

module.exports.send=function(users_availables,template,Alumno){
	let promises=[];

	for (var i = 0; i < users_availables.length; i++) {
		let item=users_availables[i];
		let email=item.email;
		let id=item._id;
		let actualizado=Alumno.updateOne({_id:id},{$set:{sendmail:true}});
		let msg_text=template.toString()
					.replace(/{{id}}/g,id)
					.replace(/{{nombre}}/g,item.nombre_completo)
					.replace(/{{no_control}}/g,item.no_control)
					.replace(/{{carrera}}/g,item.carrera)
					.replace(/{{semestre}}/g,item.semestre)
					.replace(/{{email}}/g,item.email);
		let msg = {
			to: email,
			from: 'edefpozasbo@ittepic.edu.mx',
			subject: 'Correo de invitación a conferencia',
			html:msg_text
		};
		promises.push(sgMail.send(msg));
		promises.push(actualizado);
	}
	return Promise.all(promises);
}	
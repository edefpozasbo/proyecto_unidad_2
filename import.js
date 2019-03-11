const csv=require('csvtojson');
module.exports.read_from_csv=function(path){
	return csv().fromFile(path);
}

module.exports.write_in_mongo=function(json_alumnos,Alumno){
	
	var promises_alumnos=[];

	for (var i = 0; i < json_alumnos.length; i++) {
		let item=json_alumnos[i];
		let semestre=parseInt(item.semestre);
		if(semestre<3)
			continue;
		let alumno=new Alumno({
			no_control:item.no_control,
			nombre_completo:item.nombre_completo,
			carrera:item.carrera,
			semestre:semestre,
			email:item.email
		});
		promises_alumnos.push(alumno.save());
	}

	return Promise.all(promises_alumnos);
}
var users = {
		admin: {id:1, username:"admin", Password:"1234"},
		pepe: {id:2, username:"pepe", Password:"5678"}
		};
		
// comprueba si el usuario esta registrado en users
// Si autentificación falla o hay errores se ejecuta callback(error)

exports.autenticar = function(login, Password, callback){
		if(users[login]){
			if (Password === users[login].Password){
					callback(null, users[login]);
				}
			else { callback(new Error('Password erróneo.'));}
		} else{ callback(new Error('No existe el usuario.'));}
};					
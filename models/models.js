var path = require('path');

// Cargar Modelo ORM

var Sequelize = require('sequelize');

// Usar BBDD SQLite

var sequelize = new Sequelize(null, null, null,
								{dialect: "sqlite", storage: "quiz.sqlite"}
								);

//Importar la deficion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz;  //exporta la definicion de la tabla quiz

// secuelize.sync() crea e inicializa tabla de preguntas en DB

sequelize.sync().success(function(){
	// success(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success(function(count){
			Quiz.create({pregunta: 'Capital de Italia',
									respuesta: 'Roma'
									})
					.success(function(){console.log('Base de datos inicializada')});
		});
	});

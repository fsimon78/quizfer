var models = require('../models/models.js')



exports.index = function(req, res){
		models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', {quizes: quizes});
	})
};


// GET /quizes/question



exports.show = function(req, res){
		models.Quiz.findAll(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: quiz});
	})
};
	
// GET /quizes/answer	

exports.answer = function(req, res){
	models.Quiz.findAll(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta) {
			res.render('quizes/question', 
								{quiz: quiz, respuesta: 'Correcta'});
	}else{
			res.render('quizes/question', 
								{quiz: quiz, respuesta: 'Incorrecto'});
		}
	})
};	





	
exports.author = function(req, res){
		res.render('author', {autor: 'Fernando Simon'});
	};


		
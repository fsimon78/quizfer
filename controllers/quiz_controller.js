var models = require('../models/models.js')

// GET /quizes/question

exports.show = function(req, res){
		models.Quiz.findById(req.params.quizId).then(function(quiz){
		res.render('quizes/show', {quiz: quiz});
	})
};
	
// GET /quizes/answer	

exports.answer = function(req, res){
	models.Quiz.findById(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta) {
			res.render('quizes/answer', 
								{quiz: quiz, respuesta: 'Correcta'});
	}else{
			res.render('quizes/answer', 
								{quiz: quiz, respuesta: 'Incorrecto'});
		}
	})
};	
	
exports.author = function(req, res){
		res.render('author', {autor: 'Fernando Simon'});
	};

		
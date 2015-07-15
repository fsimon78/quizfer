var models = require('../models/models.js');

//Autoload :id

exports.load = function (req, res, next, quizId){
	models.Quiz.find({
				where:{ id: Number(quizId) },
				include: [{ model: models.Comment }]
			}).then (function (quiz) {
		if (quiz){
			req.quiz = quiz;
			next();
		} else { next(new Error('No existe quizId=' + quizId))}
	}
	).catch(function(error){next(error);});
};



// GET /quizes
exports.index = function(req,res){
	 
	var filtro = req.query.search;
	var condicion = ('%' + filtro + '%').replace(/ /g,'%');
		if (req.query.search) {
		  models.Quiz.findAll({
			where: ["pregunta like ?", condicion],
			order: [['pregunta', 'ASC']]}
			).then(function(quizes) {	
			res.render('quizes/index', {quizes: quizes, errors: []});
		}).catch(function(error) {next(error);});
		  }else{
			models.Quiz.findAll().then(function(quizes) {
				res.render('quizes/index', {quizes: quizes, errors: []});
			}).catch(function(error) {next(error);});
		  }
};



exports.show = function (req, res){
		res.render('quizes/show', { quiz: req.quiz, errors: []});
};

exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	 if(req.query.respuesta === req.quiz.respuesta){
		resultado = 'Correcto';
	}
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado,
			errors:[]
			}
			);
};	


exports.new = function(req, res){
	var quiz = models.Quiz.build (   //crea un objeto quiz
	{pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tema"}
	);
	
	res.render('quizes/new', { quiz: quiz, errors: []});
};

// POST /quizes/create

exports.create = function(req, res){
	var quiz = models.Quiz.build( req.body.quiz );

 quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
        quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta", "tema"]})
        .then( function(){ res.redirect('/quizes')}) 
      }      // res.redirect: Redirección HTTP a lista de preguntas
    }
  );
};

// GET /quizes/:id/edit


exports.edit = function (req, res) {
	var quiz = req.quiz;
	res.render('quizes/edit', {quiz: quiz, errors: [] });
};

// PUT /quizes/:id

exports.update = function(req,res){
		req.quiz.pregunta = req.body.quiz.pregunta;
		req.quiz.respuesta = req.body.quiz.respuesta;	
		req.quiz.tema = req.body.quiz.tema;
		
	req.quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/edit', {quiz: req.quiz, errors: err.errors});
      } else {
        req.quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta"]})
        .then( function(){ res.redirect('/quizes');}); 
      }      // res.redirect: Redirección HTTP a lista de preguntas
    }
  );
};
	


exports.destroy = function(req, res){
	req.quiz.destroy().then( function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};
	
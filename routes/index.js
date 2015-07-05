var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'quiz' });
});

router.get('/quizes', quizController.index);
router.get('/quizes/:QuizId(\\d+)', quizController.show);
router.get('/quizes/:QuizId(\\d+)/answer', quizController.answer);

router.get('/author', quizController.author);

//router.get('/quizes/question', quizController.question);
//router.get('/quizes/answer', quizController.answer);
//router.get('/author', quizController.author);

module.exports = router;

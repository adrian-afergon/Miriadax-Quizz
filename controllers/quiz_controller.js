var models = require('../models/models.js');

exports.load = function(req, res, next, quizId){
	models.Quiz.find(quizId).then(function(quiz){
		if(quiz){
			req.quiz = quiz;
			next();
		} else {
			next(new Error('No existe quizId=' +quizId));
		}
	}).catch(function(error){
		next(error);
	});
}


exports.index = function(req, res){
	models.Quiz.findAll().then(function(quizzes){
		res.render('quizzes/index.ejs',{quizzes : quizzes});
	})
}
/*
exports.show = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		res.render('quizzes/show',{pregunta:'quiz[0].pregunta'});
	});	
};


exports.answer = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		if(req.query.respuesta === quiz[0].respuesta){
			res.render('quizzes/answer',{title:'Quiz',respuesta:'Correcto'});
		} else{
			res.render('quizzes/answer',{title:'Quiz',respuesta:'Incorrecto'});
		}
	});
};
*/
exports.show = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		console.log('Esto es lo que vale quiz:'+quiz);
		res.render('quizzes/show',{quiz:req.quiz});
	});	
};

exports.answer = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		var resultado = 'Incorrecto';
		if(req.query.respuesta === req.quiz.respuesta){
			resultado = 'Correcto';
		} 
		res.render('quizzes/answer',{title:'Quiz',quiz:req.quiz,respuesta:resultado});
	});
};
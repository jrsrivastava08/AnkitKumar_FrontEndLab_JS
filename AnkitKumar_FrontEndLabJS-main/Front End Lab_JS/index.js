function Quiz(questions) {
	this.score = 0;
	this.questions = questions;
	this.questionIndex = 0;
}

Quiz.prototype.getQuestionByIndex = function() {
	return this.questions[this.questionIndex];
};

Quiz.prototype.checkOptionWithAnswer = function(answer) {
	if(this.getQuestionByIndex().isCorrectAnswer(answer)) {
		this.score++;
	}
	this.questionIndex++;
};

Quiz.prototype.isFinished = function() {
	return this.questionIndex === this.questions.length;
};

function Question(text, choices, answer) {
	this.text = text;
	this.choices = choices;
	this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
	return this.answer === choice;
};

function showScores() {
	var quizElement = document.getElementById("quiz");
	var resPercentage = (quiz.score / questions.length) * 100;
	quizElement.innerHTML = `<h1> Result </h1> <h2 id='score'> Your Scores: ${quiz.score} and mark percentage is ${resPercentage}% </h2>`;
}

function loadQuestions() {
	if(quiz.isFinished()) {
		showScores();
	} else {
		var questionElement = document.getElementById("question");
		var questionLoaded = quiz.getQuestionByIndex();
		questionElement.innerHTML = questionLoaded.text;

		var choices = questionLoaded.choices;
		for(let idx = 0; idx < choices.length; idx++) {
			var choiceElement = document.getElementById("choice" + idx);
			choiceElement.innerHTML = choices[idx];

			var btnElement = document.getElementById("btn" + idx);
			btnElement.onclick = () => {
				quiz.checkOptionWithAnswer(choices[idx]);
				loadQuestions();
			};
		}
		showProgress();
	}
}

function showProgress() {
	var currQuesIndex = quiz.questionIndex + 1;
	var progressElement = document.getElementById("progress");
	progressElement.innerHTML = `Question ${currQuesIndex} of ${quiz.questions.length}`;
}

var questions = [
	new Question("JavaScript supports", ["Functions", "XHTML","CSS", "HTML"], "Functions"), 
	new Question("Inside which HTML element do we put the JavaScript?", ["js", "javaScripting", "script", "scripting"] , "script"), 
	new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"), 
	new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language"), 
	new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"), 
	new Question("What does JSON stand for ?", ["Java Simple Object Notation", "JavaScript Object Notation", "Java Semi Object Notation", "None of the above"], "JavaScript Object Notation")
];

var quiz = new Quiz(questions);
loadQuestions();
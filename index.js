const quizData = [
  {
    question: 'What does HTML stands for?',
    options: ['Hyperlinks and Text Markup Language', 'Hyper Text and Text Markup Language', 'Home Tool and  Markup Language', 'Hyper Text Markup Language'],
    answer: 'Hyper Text Markup Language',
  },
  {
    question: 'What is correct HTML element for the largest heading?',
    options: ['<h6>', '<h1>', '<heading>', '<head>'],
    answer: '<h1>',
  },
  {
    question: 'How many standard color names does HTML support?',
    options: ['120', '130', '140', '90'],
    answer: '140',
  },
  {
    question: 'How do you merge two or more coloumns in a table cell?',
    options: ['merge', 'rowspan', 'colspan', 'span'],
    answer: 'colspan',
  },
  {
    question: 'Which attribute is used in input tag to restrict a numeric field between a minimum and maximum value?',
    options: [
      'range',
      'validate',
      'min and max',
      'limit',
    ],
    answer: 'min and max',
  },
  {
    question: 'Which of the following tags is used to make a portion of text italic in HTML?',
    options: ['<i>', '<italic>', '<style="italic">', '<k>'],
    answer: '<i>',
  },
  {
    question: 'Which keyword is used to declare a variable that cannot be reassigned?',
    options: [
      'var',
      'let',
      'const',
      'static',
    ],
    answer: 'const',
  },
  {
    question: 'Is a variable named "apple" same as "Apple"in js?',
    options: ['yes', 'no', 'only when we use strict', 'none of the above'],
    answer: 'no',
  },
  {
    question: 'Which element is used to represent the transparency of an element in CSS?',
    options: [
      'hover',
      'opacity',
      'transparent',
      'overlay',
    ],
    answer: 'opacity',
  },
  {
    question: 'What is the type of network 198.78.41.0?',
    options: ['class A network', 'class B network', 'class C network ', 'class D network'],
    answer: 'class C network',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();

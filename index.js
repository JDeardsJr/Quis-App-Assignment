'use strict';

const STORE = {
    questions: [//1
    {
        question: "The first fully integrated musical, using every song and dance to develop the characters of the plot, was:",
        options: [
            "'Pirates of Penzance'",
            "'Hamilton'",
            "'Oklahoma!'",
            "'Wicked'"
            
        ],
        answer: "'Oklahoma!'"
    },
    //2
    {
        question: "The person in charge of creating, and teaching, the dance movement is called:",
        options: [
            "The choreographer",
            "The dance captain",
            "The movement instructor",
            "The general of jive"
            
        ],
        answer: "The choreographer"
    },
    //3
    {
        question: "Which of these musicals was not written by Stephen Sondheim:",
        options: [
            "'Into the Woods'",
            "'Oliver!'",
            "'Sunday in the Park with George'",
            "'Assassins'"            
        ],
        answer: "'Oliver!'"
    },
    //4
    {
        question: "Which of these songs is featured in the stage musical, 'Mary Poppins':", 
        options: [
            "'Feed the Birds'",
            "'Defying Gravity'",
            "'Memory'",
            "None of the above"
        ],
        answer: "'Feed the Birds'"
    },
    //5
    {
        question: "Finish this sentence: '____________________ is a musical that tells the story of a young soprano who becomes the obsession of a disfigured, and murderous, musical genius.'",
        options: [
            "'An American in Paris'",
            "'Carnival'",
            "'The Light in the Piazza'",
            "'The Phantom of the Opera'"            
        ],
        answer: "'The Phantom of the Opera'"
    }
    ],
    questionNumber: 0,
    score: 0,
    step: "start"
};

// this function is responsible for rendering the start screen html
function generateStartScreenHtml() {
    const startScreenHtml = $(`
    <section id="start-screen" class="js-quizBox quizBox">
        <h2>Are you a Musical Theatre wiz???</h2>
        <img class="picture" src="QuizAppImages/wizard.jpg" alt="The Wizard in 'Wicked'">
        <p>Let's find out!</p>
        <button type="button" class="js-startButton button">Start Quiz</button>
    </section>`);
    return startScreenHtml;
}

// this function is responsible for creating the current question and score section html
function generateQuestionAndScoreHtml() {
    const questionAndScore = $(`
        <ul>
            <li class="quizSize">Question: <span class="question">${STORE.questionNumber + 1}</span>/5</li>
            <li class="quizSize">Score: <span class="score">${STORE.score}</span>/5</li>
        </ul>`)
    return questionAndScore;
}

// this function updates STORE.questionNumber and question display
function questionUpdate() {
    STORE.questionNumber++;
    $('.question').text(STORE.questionNumber + 1); 
}

// this function updates STORE.score and score display
function scoreUpdate() {
    STORE.score++;
    $('.score').text(STORE.score);
}

// this function resets STORE.questionNumber and STORE.score values 
// re-displays the question and score count.
function resetQuestionAndScore() {
    STORE.questionNumber = 0;
    STORE.score = 0;
    $('.question').text(STORE.questionNumber + 1);
    $('.score').text(STORE.score);
    $('.js-question-and-score').show();
}

// this function is responsible for generating the question string html
function generateQuestionHtml() {
    let currentQuestion = STORE.questions[STORE.questionNumber];
    const questionString = $(`
        <section id="question-template" class="quizBox js-quizBox">
            <form name="quizForm" class="js-questionForm">
                <div>
                    <legend class="questionText">${currentQuestion.question}</legend>
                </div>
                <div class="js-options options"></div>
                <div>
                    <button type="submit" class="js-submitButton button">Submit</button >
                </div>
            </form>
        </section>`);
    return questionString;
}

// updates/adds answer options html in the question string html
function updateOptionsHtml() {
    let currentQuestion = STORE.questions[STORE.questionNumber];
    currentQuestion.options.forEach(function (optionValue, optionIndex) {
        $('.js-options').append(
            `<label class="labelSize" for="${optionIndex}">
                <input class="radio" type="radio" id="${optionIndex}" value="${optionValue}" name="option" required>
                <span>${optionValue}</span>
            </label><br/>
          `);
    });
}

// this function is responsible for rendering "right answer" html
function rightAnswerHtml() {
    const rightAnswerString = $(`
        <section id="right-answer" class="quizBox js-quizBox">
            <h2>Correct!</h2>
            <img class="picture" src="QuizAppImages/Quixote.jpg" alt="Brian Stokes Mitchell as Don Quixote">
            <p>Someone's been rehearsing...</p>
            <button class="js-nextButton button">Next</button>
        </section>`);
    return rightAnswerString;
}

 // this function is responsible for rendering "wrong answer" html.
function wrongAnswerHtml() {
    const wrongAnswerString = $(`
        <section id="wrong-answer" class="quizBox js-quizBox">
            <h2>Sorry, wrong answer!</h2>
            <img class="picture" src="QuizAppImages/ursula.jpg" alt="Ursula from 'The Little Mermaid'">
            <p>The correct answer was:</p>
            <h2>${STORE.questions[STORE.questionNumber].answer}</h2>
            <button class="js-nextButton button">Next</button>
        </section>`);
    return wrongAnswerString;
}

 // this function is responsible for rendering the final results box html.
function finalScoreHtml() {
    const finalScoreString = $(`
        <section id="final-page" class="quizBox js-quizBox">
            <h2>All finished!</h2>
            <img class="picture" src="QuizAppImages/matilda.jpg" alt="Scene from the musical, 'Matilda'">
            <h2>Final Score: ${STORE.score} out of 5</h2>
            <button class="js-restartButton button">Try Again?</button>
        </section>`);
    return finalScoreString;
}

// this function renders start-up <main> html and subsequent <main> html based on user actions.
function render() {
    if (STORE.step === "start") {
        $('main').html(generateStartScreenHtml());
    } else if (STORE.step === "firstQuestion") {
        $('.js-question-and-score').html(generateQuestionAndScoreHtml());
        $('main').html(generateQuestionHtml());
    } else if(STORE.step === "right") {
        $('main').html(rightAnswerHtml());
    } else if(STORE.step === "wrong") {
        $('main').html(wrongAnswerHtml());
    } else if(STORE.step === "nextQuestion") {
        $('main').html(generateQuestionHtml());
    } else {
        $('main').html(finalScoreHtml());
    } 
    console.log('`render` ran')
}

// this function is responsible for rendering 1st question of quiz.
function handleStartQuiz() {
    $('main').on('click', '.js-startButton', function(event) {
        STORE.step = 'firstQuestion';
        render();
        updateOptionsHtml();
    });
    console.log('`handleStartQuiz` ran');
}
  
// this function determins whether user answer is right or wrong 
// renders applicable screen
function handleAnswerSubmit() {
    $('main').on('submit', '.js-questionForm', function(event) {
        event.preventDefault();
        let userAnswer = $("input[name=option]:checked").val();
        let questionAnswer = STORE.questions[STORE.questionNumber].answer;
        if (userAnswer === questionAnswer) {
            STORE.step = 'right';
            render();
            scoreUpdate();
        } else {
            STORE.step = 'wrong';
            render();
        }
    });
    console.log('`handleAnswerSubmit` ran');
}  

    // this function increases the questionNumber variable by one and updates question display.
    // responsible for rendering the next question 
function handleNextQuestion() {
    $('main').on('click', '.js-nextButton', function(event) {
        questionUpdate();
        if (STORE.questionNumber === STORE.questions.length) {
            STORE.step = 'final';
            render();
            $('.js-question-and-score').hide();
        } else {
            STORE.step = 'nextQuestion';
            render();
            updateOptionsHtml();
        }
    });
    console.log('`handleNextQuestion` ran');
}

function handleRestartQuiz() {
    // this function will be responsible for restarting the quiz.
    $('main').on('click', '.js-restartButton', function(event) {
        STORE.step = 'nextQuestion';
        resetQuestionAndScore();
        render();
        updateOptionsHtml();
    });
    console.log('`handleRestartQuiz` ran')
}
  
  // this function will be our callback when the page loads. it's responsible for
  // initially rendering the quiz app, and activating our individual functions
  // that handle new item submission and user clicks on the "start", "submit", "next", and "re-try" buttons
  // for individual questions.
function handleQuizApp() {
    render();
    handleStartQuiz();
    handleAnswerSubmit();
    handleNextQuestion();
    handleRestartQuiz();
}

$(handleQuizApp);

// Define the decision tree structure
const decisionTree = {
    question: "So, my love, let's decide what to do today! Do you feel active? <3 ",
    answers: [
        {
            text: "Yes, I'm ready for an adventure!",
            nextQuestion: {
                question: "How is the weather outside?",
                answers: [
                    {
                        text: "Sunny and warm",
                        nextQuestion: {
                            question: "How much energy do you have?",
                            answers: [
                                {
                                    text: "I'm super energized!",
                                    outcome: "Let's go cycling outside :)"
                                },
                                {
                                    text: "So so la la",
                                    outcome: "Let's go for a nice hike."
                                }, 
                                {
                                    text: "A bit tired, but I'd still like to go outside",
                                    outcome: "Let's buy some berries and go for a picknick at the lake."
                                }
                            ]
                        }
                    },
                    {
                        text: "Sunny and cold",
                        nextQuestion: {
                            question: "Is there any snow?",
                            answers: [
                                {
                                    text: "Yes",
                                    outcome: "Let's go sledding or skiing."
                                },
                                {
                                    text: "no",
                                    outcome: "Let's go ice-skating."
                                },
                            ]
                        }
                    },
                    {
                        text: "The weather sucks...",
                        nextQuestion: {
                            question: "Do you feel like doing a sport?",
                            answers: [
                                {
                                    text: "Yes!",
                                    outcome: "Let's go swimming or to Alpamare."
                                },
                                {
                                    text: "No",
                                    outcome: "Let's go shopping in the city (and maybe go to a cafe and read once we get tired :D)."
                                }
                            ]
                        }
                    }
                ]
            }
        },
        {
            text: "Nah, I feel like relaxing",
            nextQuestion: {
                question: "Are you hungry?",
                answers: [
                    {
                        text: "Yes, I am hungry (or Vaat is hungry and endangered of becoming hangry)",
                        nextQuestion: {
                            question: "Okay, answer quickly: sweet or salty?",
                            answers: [
                                {
                                    text: "Sweet.",
                                    outcome: "Let's bake something together :)."
                                },
                                {
                                    text: "Salty.",
                                    outcome: "Let's cook something nice (and Vaat will chop them veggies for ya)."
                                }
                            ]
                        }
                    },
                    {
                        text: "Nope, we both feel full.",
                        nextQuestion: {
                            question: "Is Vaat sleepy?",
                            answers: [
                                {
                                    text: "Yes, she is basically asleep.",
                                    outcome: "Denn lönds Sie mich sleepe wuah!"
                                },
                                {
                                    text: "Yes, but if I play it right, I think I can wake her up!",
                                    outcome: "Challenge her to Mario Kart, It Takes Two or some League."
                                },
                                {
                                    text: "Nope, she wide awake and zoomin'.",
                                    nextQuestion: {
                                        question: "Do you feel creative?",
                                        answers: [
                                            {
                                                text: "Yes, I'm ready to create!",
                                                outcome: "Paint something together!"
                                            },
                                            {
                                                text: "Nah.",
                                                outcome: "Let's watch a movie or TV show together."
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
};

// Elements from the HTML
const titlePage = document.getElementById('title-page');
const startQuizButton = document.getElementById('start-quiz-button');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const resultPage = document.getElementById('result-page');
const resultText = document.getElementById('result');
const restartButton = document.getElementById('restart-button');

// Variables to track current state
let currentNode = decisionTree;

// Start the quiz
function startQuiz() {
    console.log("Starting quiz..."); // Debug message
    titlePage.style.display = 'none';
    resultPage.style.display = 'none';
    questionContainer.style.display = 'block';
    showQuestion(currentNode);
}

// Show the current question and answers
function showQuestion(node) {
    console.log("Showing question:", node.question); // Debug message
    resetState();
    questionElement.innerText = node.question;

    node.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

// Clear previous answers
function resetState() {
    answerButtons.innerHTML = '';
}

// Handle answer selection
function selectAnswer(answer) {
    console.log("Answer selected:", answer.text); // Debug message
    if (answer.outcome) {
        showOutcome(answer.outcome);
    } else if (answer.nextQuestion) {
        currentNode = answer.nextQuestion;
        showQuestion(currentNode);
    }
}

// Display the outcome
function showOutcome(outcome) {
    console.log("Showing outcome:", outcome); // Debug message
    questionContainer.style.display = 'none';
    resultPage.style.display = 'block';
    resultText.innerText = outcome;
}

// Restart the quiz
restartButton.addEventListener('click', () => {
    console.log("Restarting quiz..."); // Debug message
    currentNode = decisionTree;
    startQuiz();
});

// Start the quiz from the title page
startQuizButton.addEventListener('click', startQuiz);

// Initialize with title page
titlePage.style.display = 'block';
resultPage.style.display = 'none';
questionContainer.style.display = 'none';

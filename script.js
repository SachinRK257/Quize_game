const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: 1
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: ["William Wordsworth", "William Shakespeare", "John Keats", "Charles Dickens"],
        correct: 1
    },
    {
        question: "What is the boiling point of water at sea level in Celsius?",
        options: ["90°C", "100°C", "80°C", "120°C"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const nextBtn = document.getElementById('next-btn');

function startTimer() {
    timeLeft = 10;
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleNext();
        }
    }, 1000);
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(index));
        optionsContainer.appendChild(button);
    });

    nextBtn.style.display = 'none';
    startTimer();
}

function checkAnswer(selectedIndex) {
    clearInterval(timer);
    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option-btn');

    options.forEach(option => option.disabled = true);

    if (selectedIndex === question.correct) {
        score += 10;
        scoreElement.textContent = score;
        options[selectedIndex].classList.add('correct');
    } else {
        options[selectedIndex].classList.add('incorrect');
        options[question.correct].classList.add('correct');
    }

    nextBtn.style.display = 'block';
}

function handleNext() {
    clearInterval(timer);
    currentQuestionIndex++;
    nextBtn.style.display = 'none';

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        questionElement.textContent = "🎉 Quiz Completed! Final Score: " + score;
        optionsContainer.innerHTML = '';
        nextBtn.style.display = 'none';
    }
}

// Initialize quiz
showQuestion();

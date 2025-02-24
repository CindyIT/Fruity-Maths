let score = 0;
let correctAnswer;
let level = 1; // Default level
let voice = new SpeechSynthesisUtterance();
let babyVoice = null; // Placeholder for baby voice

// Set up baby voice (if available)
function setBabyVoice() {
    const voices = window.speechSynthesis.getVoices();
    babyVoice = voices.find(voice => voice.name.toLowerCase().includes("child") || voice.name.toLowerCase().includes("baby"));

    if (!babyVoice) {
        // Fallback voice if no baby voice is available
        babyVoice = voices[0];
    }
    voice.voice = babyVoice;
}

// Get random number for generating questions
function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1; // Random number between 1 and max
}

function generateQuestion() {
    const mathType = document.getElementById('math-type').value;
    let num1 = getRandomNumber(level * 10); // Increase range as level increases
    let num2 = getRandomNumber(level * 10);
    let questionText = '';
    
    switch (mathType) {
        case 'addition':
            correctAnswer = num1 + num2;
            questionText = `How many fruits are there if you have ${num1} apples 🍎 and ${num2} oranges 🍊?`;
            break;
        case 'subtraction':
            if (num1 < num2) {
                [num1, num2] = [num2, num1]; // Ensure num1 is greater than num2
            }
            correctAnswer = num1 - num2;
            questionText = `You have ${num1} bananas 🍌. If you eat ${num2} bananas 🍌, how many do you have left?`;
            break;
        case 'multiplication':
            correctAnswer = num1 * num2;
            questionText = `You have ${num1} grapes 🍇, and you pick ${num2} bunches. How many grapes did you pick in total?`;
            break;
        case 'division':
            // Ensure num1 is divisible by num2 for a clean division
            num2 = getRandomNumber(level * 10);
            correctAnswer = num1 * num2; // Set correct answer to be num1 * num2 to ensure clean division
            questionText = `You have ${correctAnswer} watermelons 🍉, and you divide them equally between ${num2} people. How many watermelons does each person get?`;
            break;
        default:
            correctAnswer = 0;
            questionText = 'Select a math type!';
    }
    
    const questionElement = document.getElementById('question');
    questionElement.textContent = questionText;
}

// Function to speak the text with the baby voice
function speak(text) {
    voice.text = text;
    window.speechSynthesis.speak(voice);
}

document.getElementById('start-button').addEventListener('click', function() {
    // Set the baby voice when the game starts
    setBabyVoice();

    // Get the level from input
    level = parseInt(document.getElementById('level-input').value);
    // Ensure level is between 1 and 5
    level = Math.max(1, Math.min(level, 5));

    // Hide the selection area and show the question area
    document.getElementById('selection-area').style.display = 'none';
    document.getElementById('question-area').style.display = 'block';

    // Set the level in the UI
    document.getElementById('level').textContent = `Level: ${level}`;
    document.getElementById('score').textContent = `Score: ${score}`;

    // Generate the first question after the user selects an operation
    generateQuestion();

    // Show the Go Back button now that we're in the question area
    document.getElementById('go-back-button').style.display = 'inline-block';
});

document.getElementById('submit').addEventListener('click', function() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const feedbackElement = document.getElementById('feedback');
    const ratingElement = document.getElementById('rating');
    const showCorrectionButton = document.getElementById('show-correction');

    if (userAnswer === correctAnswer) {
        feedbackElement.textContent = "Correct! 🎉";
        feedbackElement.style.color = "green";
        score++;

        // Speak congratulatory message
        speak("Yay! Correct answer! Good job!");

        // Level up after 5 correct answers
        if (score % 5 === 0 && level < 5) { 
            level++;
            document.getElementById('level').textContent = `Level: ${level}`;
        }

        // Provide feedback based on score
        if (score <= 5) {
            ratingElement.textContent = "Great start! Keep going! 🚀";
        } else if (score <= 10) {
            ratingElement.textContent = "You're doing awesome! 👍";
        } else if (score <= 15) {
            ratingElement.textContent = "Fantastic! You’re a math superstar! 🌟";
        } else {
            ratingElement.textContent = "Congratulations, you're a math genius! 🎉🎉";
        }

        showCorrectionButton.style.display = "none"; // Hide correction button if the answer is right
    } else {
        feedbackElement.textContent = "Oops! Try again! 😅";
        feedbackElement.style.color = "red";
        ratingElement.textContent = "";

        // Speak "Oops, wrong answer"
        speak("Oops, wrong answer! Try again, okay?");

        showCorrectionButton.style.display = "inline-block"; // Show the correction button
    }

    // Update score
    document.getElementById('score').textContent = `Score: ${score}`;
    
    // Generate a new question
    generateQuestion();
    document.getElementById('answer').value = ''; // Clear the input field
});

// Show correct answer when "Show Correction" is clicked
document.getElementById('show-correction').addEventListener('click', function() {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.textContent = `The correct answer was: ${correctAnswer} ✔️`;
    feedbackElement.style.color = "blue";

    // Speak the correct answer with the baby voice
    speak(`The correct answer was: ${correctAnswer}!`);
});

// When the user clicks "Go Back", hide the question area and show the operation selection again
document.getElementById('go-back-button').addEventListener('click', function() {
    // Hide the question area and show the selection area
    document.getElementById('selection-area').style.display = 'block';
    document.getElementById('question-area').style.display = 'none';

    // Reset score and level
    score = 0;
    level = 1;
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('level').textContent = `Level: ${level}`;
    document.getElementById('rating').textContent = "";
    document.getElementById('feedback').textContent = "";
    document.getElementById('answer').value = ''; // Clear input field

    // Hide the Go Back button
    document.getElementById('go-back-button').style.display = 'none';
});



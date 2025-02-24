// Function to speak text
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US"; // Set the language of speech
    speech.volume = 1; // Maximum volume
    speech.rate = 1; // Normal speed
    speech.pitch = 1; // Normal pitch
    window.speechSynthesis.speak(speech);
}

// Function to congratulate user and take them to the next level
function nextLevel() {
    const message = "Congratulations! Welcome to the next level! 🍇🍊 Let's go!";
    speak(message); // Speaking out the congratulations message

    // Ensure there's a delay before generating the next question
    setTimeout(function() {
        // Proceed to the next level (e.g., generate a new question)
        generateQuestion(); 
    }, 5000); // Wait 5 seconds to ensure speech finishes before proceeding
}

// Handle the submit button click
document.getElementById('submit').addEventListener('click', function() {
    const userAnswer = parseInt(document.getElementById('answer').value);
    const feedbackElement = document.getElementById('feedback');
    const ratingElement = document.getElementById('rating');
    const showCorrectionButton = document.getElementById('show-correction');

    if (userAnswer === correctAnswer) {
        feedbackElement.textContent = "Correct! 🎉";
        feedbackElement.style.color = "green";
        score++;

        // Add voice feedback based on the score
        if (score % 5 === 0) { // Every 5 questions, level up with voice
            speak("Yummy, you love fruits! 🍎 Now, let's take it to the next level!");
            setTimeout(nextLevel, 5000); // Delay to allow speech to finish before proceeding
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

        // Disable the submit button after the correct answer
        document.getElementById('submit').disabled = true;

        // Show the "Show Correction" button
        showCorrectionButton.style.display = 'inline-block';

        // Allow the user to proceed after showing the correction
    } else {
        feedbackElement.textContent = "Oops! Try again! 😅";
        feedbackElement.style.color = "red";
        ratingElement.textContent = "";
    }

    // Update the score
    document.getElementById('score').textContent = `Score: ${score}`;
});

// Proceed to next question when "Next Question" button is clicked
document.getElementById('next-question').addEventListener('click', function() {
    // Reset the submit button and answer input for the next question
    document.getElementById('submit').disabled = false;
    document.getElementById('answer').value = ''; // Clear the input field
    document.getElementById('feedback').textContent = ''; // Clear feedback
    document.getElementById('rating').textContent = ''; // Clear rating

    // Generate a new question
    generateQuestion();

    // Hide the "Next Question" button again
    document.getElementById('next-question').style.display = 'none';
    document.getElementById('show-correction').style.display = 'inline-block'; // Show correction button again
});

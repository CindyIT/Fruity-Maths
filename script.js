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

    } else {
        feedbackElement.textContent = "Oops! Try again! 😅";
        feedbackElement.style.color = "red";
        ratingElement.textContent = "";

        // Speak "Oops, wrong answer"
        speak("Oops, wrong answer! Try again, okay?");
    }

    // Update score
    document.getElementById('score').textContent = `Score: ${score}`;
    
    // Generate a new question
    generateQuestion();
    document.getElementById('answer').value = ''; // Clear the input field

    // Ensure the correction button is always visible
    showCorrectionButton.style.display = "inline-block"; // Always show the correction button
});



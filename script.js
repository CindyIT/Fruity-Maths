let score = 0;
let correctAnswer;
let level = 1; 
let voice = new SpeechSynthesisUtterance();
let babyVoice = null; 

function setBabyVoice() {
    const voices = window.speechSynthesis.getVoices();
    babyVoice = voices.find(voice => voice.name.toLowerCase().includes("child") || voice.name.toLowerCase().includes("baby"));

    if (!babyVoice) {
       
        babyVoice = voices[0];
    }
    voice.voice = babyVoice;
}


function getRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1; 
}

function generateQuestion() {
    const mathType = document.getElementById('math-type').value;
    let num1 = getRandomNumber(level * 10); 
    let num2 = getRandomNumber(level * 10);
    let questionText = '';
	 switch (mathType) {
        case 'addition':
            correctAnswer = num1 + num2;
            questionText = `How many fruits are there if you have ${num1} apples 🍎 and ${num2} oranges 🍊?`;
            break;
        case 'subtraction':
            if (num1 < num2) {
                [num1, num2] = [num2, num1]; 
            }
            correctAnswer = num1 - num2;
            questionText = `You have ${num1} bananas 🍌. If you eat ${num2} bananas 🍌, how many do you have left?`;
            break;
        case 'multiplication':
            correctAnswer = num1 * num2;
            questionText = `You have ${num1} grapes 🍇, and you pick ${num2} bunches. How many grapes did you pick in total?`;
            break;
        case 'division':
          
            num2 = getRandomNumber(level * 10);
            correctAnswer = num1 * num2;
            questionText = `You have ${correctAnswer} watermelons 🍉, and you divide them equally between ${num2} people. How many watermelons does each person get?`;
            break;
        default:
            correctAnswer = 0;
            questionText = 'Select a math type!';
    }
    
    const questionElement = document.getElementById('question');
    questionElement.textContent = questionText;
}


function speak(text) {
    voice.text = text;
    window.speechSynthesis.speak(voice);
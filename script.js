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
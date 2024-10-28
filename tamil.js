const tamilToEnglish = {
    'அ': 'a',
    'ஆ': 'aa',
    'இ': 'i',
    'ஈ': 'ii',
    'உ': 'u',
    'ஊ': 'uu',
    'எ': 'e',
    'ஏ': 'ee',
    'ஐ': 'ai',
    'ஒ': 'o',
    'ஓ': 'oo',
    'ஔ': 'au',
    'க': 'ka',
    'ங': 'nga',
    'ச': 'cha',
    'ஞ': 'nya',
    'ட': 'ta',
    'ண': 'na',
    'த': 'tha',
    'ந': 'na',
    'ப': 'pa',
    'ம': 'ma',
    'ய': 'ya',
    'ர': 'ra',
    'ல': 'la',
    'வ': 'va',
    'ழ': 'zha',
    'ள': 'la',
    'ற': 'rra',
    'ன': 'na',
    'ஷ': 'sha',
    'ஸ': 'sa',
    'ஹ': 'ha',
    'க்ஷ': 'ksha',
    'ஜ': 'ja',
    // Add more mappings if needed
};

const tamilLetters = Object.keys(tamilToEnglish);
let incorrectGuesses = [];
let questionCounter = 0;

function getRandomLetter() {
    if (questionCounter % 3 === 0 && incorrectGuesses.length > 0) {
        return incorrectGuesses[Math.floor(Math.random() * incorrectGuesses.length)];
    }
    
    const randomIndex = Math.floor(Math.random() * tamilLetters.length);
    return tamilLetters[randomIndex];
}

function getChoices(correctAnswer) {
    const choices = [correctAnswer];
    while (choices.length < 4) {
        const randomChoice = tamilToEnglish[getRandomLetter()];
        if (!choices.includes(randomChoice)) {
            choices.push(randomChoice);
        }
    }
    return choices.sort(() => Math.random() - 0.5);
}

function displayQuestion() {
    questionCounter++;
    const questionElement = document.getElementById('question');
    const choicesElement = document.getElementById('choices');
    const nextButton = document.getElementById('next');

    const tamilLetter = getRandomLetter();
    const correctAnswer = tamilToEnglish[tamilLetter];
    const choices = getChoices(correctAnswer);

    questionElement.textContent = tamilLetter;
    choicesElement.innerHTML = '';

    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.onclick = () => {
            if (choice === correctAnswer) {
                button.style.backgroundColor = '#4caf50';
                button.style.color = 'white';
                nextButton.style.display = 'block';
                incorrectGuesses = incorrectGuesses.filter(letter => letter !== tamilLetter);
            } else {
                button.style.backgroundColor = '#f44336';
                button.style.color = 'white';
                if (!incorrectGuesses.includes(tamilLetter)) {
                    incorrectGuesses.push(tamilLetter);
                }
            }
            button.blur();
            
            choicesElement.querySelectorAll('button').forEach(btn => {
                btn.disabled = true;
            });
        };
        choicesElement.appendChild(button);
    });

    nextButton.onclick = () => {
        nextButton.style.display = 'none';
        displayQuestion();
    };
}

document.addEventListener('DOMContentLoaded', displayQuestion);

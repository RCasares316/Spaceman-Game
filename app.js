const keyboard = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".worddisplay");
const guessesText = document.querySelector(".guessestext");
const gameModal = document.querySelector(".gamemodal");
const maxGuesses = 6;
const playAgainButton = document.querySelector(".playagain");
let currentWord;
let wrongGuessCount = 0;
let correctLetters = [];

const wordList = [
  { word: "planets", hint: "Objects that orbit a star" },
  { word: "rockets", hint: "Vehicles used to travel into space" },
  { word: "nebulas", hint: "Clouds of gas and dust in space" },
  { word: "meteors", hint: "Space rocks that burn in an atmosphere" },
  { word: "commets", hint: "Icy space objects with glowing tails" },
  { word: "cosmics", hint: "Related to outer space" },
  { word: "stellar", hint: "Relating to stars" },
  { word: "gravity", hint: "Force that pulls objects together" },
  { word: "orbit", hint: "The path an object takes around another" },
  { word: "moon", hint: "A natural satellite that orbits a planet" },
  { word: "star", hint: "A giant glowing ball of gas in space" },
  { word: "comet", hint: "An icy object with a glowing tail" },
  { word: "alien", hint: "A being from another planet" },
  { word: "void", hint: "Empty space" },
  { word: "ring", hint: "Circles around some planets" },
];
const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
  currentWord = word;
  console.log(word);
  document.querySelector(".hinttext b").innerText = hint;
  wordDisplay.innerHTML = word
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    gameModal.classList.add("show");
  }, 300);
};

const initGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        correctLetters.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    wrongGuessCount++;
  }
  button.disabled = true;
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  if (wrongGuessCount === maxGuesses) return gameOver(false);
  if (correctLetters.length === currentWord.length) return gameOver(true);
};

for (let i = 97; i <= 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  keyboard.appendChild(button);
  button.addEventListener("click", (e) =>
    initGame(e.target, String.fromCharCode(i))
  );
}
getRandomWord();
playAgainButton.addEventListener("click", getRandomWord);

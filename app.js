const keyboard = document.querySelector(".keyboard");
const wordDisplay = document.querySelector(".worddisplay");
const guessesText = document.querySelector(".guessestext");
const gameModal = document.querySelector(".gamemodal");
const playAgainButton = document.querySelector(".playagain");
const canvas = document.querySelector("#spaceman");
const ctx = canvas.getContext("2d");
const maxGuesses = 6;
const winGifSrc =
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWg4cGFmdG0xMXk5NTA1aGJhM2o4cnk5a21uamlobjg3cHpvOHIybyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EzGQJwS4x8cHxjJhEH/giphy.gif";
const loseGifSrc =
  "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExamM5OXF0a2pwdm92bXFuM2JwM2ZkYjBpMnNqYmxoaWtpbTR2enQ2YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0DRUriUecweUs5QFQF/giphy.gif";
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
  { word: "apple", hint: "a common fruit" },
  { word: "bridge", hint: "a structure that crosses water or roads" },
  { word: "python", hint: "a popular programming language or snake" },
  { word: "castle", hint: "a large stone fortress" },
  { word: "oceans", hint: "large bodies of saltwater" },
  { word: "rocket", hint: "used to travel into space" },
  { word: "forest", hint: "a large area filled with trees" },
  { word: "desert", hint: "a dry place with little rain" },
  { word: "island", hint: "land surrounded by water" },
  { word: "music", hint: "sounds arranged in harmony" },
  { word: "laptop", hint: "a portable computer" },
  { word: "candle", hint: "provides light when burned" },
  { word: "bottle", hint: "holds liquids" },
  { word: "window", hint: "you look through it" },
  { word: "keyboard", hint: "used to type" },
  { word: "mountain", hint: "a very tall landform" },
  { word: "river", hint: "flowing water" },
  { word: "clouds", hint: "found in the sky" },
  { word: "thunder", hint: "loud sound during a storm" },
  { word: "camera", hint: "takes pictures" },
  { word: "jacket", hint: "worn to stay warm" },
  { word: "puzzle", hint: "a problem to solve" },
  { word: "garden", hint: "where plants grow" },
  { word: "button", hint: "you press it" },
  { word: "tunnel", hint: "a passage underground" },
  { word: "mirror", hint: "shows your reflection" },
  { word: "animal", hint: "a living creature" },
  { word: "flower", hint: "a colorful plant part" },
  { word: "shadow", hint: "a dark shape made by light" },
  { word: "balloon", hint: "floats in the air" },
  { word: "market", hint: "a place to buy goods" },
  { word: "school", hint: "a place to learn" },
  { word: "treasure", hint: "valuable hidden items" },
  { word: "bicycle", hint: "a two-wheeled vehicle" },
  { word: "volcano", hint: "a mountain that erupts" },
  { word: "notebook", hint: "used to write notes" },
  { word: "pirate", hint: "a sea robber" },
  { word: "clock", hint: "tells time" },
  { word: "lantern", hint: "a portable light" },
  { word: "spider", hint: "an eight-legged creature" },
  { word: "dragon", hint: "a mythical creature" },
  { word: "farmer", hint: "someone who grows food" },
  { word: "whisper", hint: "speak very quietly" },
  { word: "village", hint: "a small town" },
  { word: "airplane", hint: "flies in the sky" },
  { word: "compass", hint: "shows direction" },
  { word: "painting", hint: "a piece of art" },
  { word: "campfire", hint: "a fire outdoors" },
  { word: "sunset", hint: "when the sun goes down" },
];

// Order you want parts to appear:
const parts = [
  drawLeftArm,
  drawRightArm,
  drawTorso,
  drawLeftLeg,
  drawRightLeg,
  drawHead,
];

function renderSpaceman() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Optional: draw a "ground" line so it feels anchored
  drawGround();

  // Draw the parts revealed so far
  for (let i = 0; i < wrongGuessCount; i++) {
    parts[i]();
  }
}

const getRandomWord = () => {
  gameModal.classList.remove("show");
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
  if (isVictory) {
    gameModal.querySelector("img").src = winGifSrc;
    gameModal.querySelector("b").textContent = currentWord;
  } else {
    gameModal.querySelector("img").src = loseGifSrc;
    gameModal.querySelector("b").textContent = currentWord;
  }

  gameModal.classList.add("show");
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
    renderSpaceman();
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

playAgainButton.addEventListener("click", () => {
  // Reset game settings
  wrongGuessCount = 0;
  correctLetters = [];
  guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

  for (let child of keyboard.children) {
    child.disabled = false;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear spaceman from canvas

  getRandomWord();
});

/* =========================================================
   Drawing Helpers + Body Parts
   ========================================================= */

function drawGround() {
  ctx.beginPath();
  ctx.moveTo(40, 360);
  ctx.lineTo(260, 360);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#111";
  ctx.stroke();
}

// Common style: astronaut outline
function setOutline() {
  ctx.lineWidth = 3;
  ctx.strokeStyle = "#111";
}

// Common fill for suit
function setSuitFill() {
  ctx.fillStyle = "#e8e8e8";
}

// Common accent color
function setAccentFill() {
  ctx.fillStyle = "#3bd16f"; // green-ish accent
}

// --------------------------------
// HEAD
// --------------------------------
function drawHead() {
  setOutline();
  setSuitFill();

  // Helmet outer
  ctx.beginPath();
  ctx.arc(150, 90, 55, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Visor
  ctx.beginPath();
  ctx.ellipse(150, 95, 35, 25, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#111";
  ctx.fill();

  // Tiny highlight on visor
  ctx.beginPath();
  ctx.ellipse(138, 85, 10, 6, -0.4, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.fill();

  // Neck ring
  setOutline();
  ctx.beginPath();
  ctx.rect(120, 135, 60, 18);
  ctx.fillStyle = "#d8d8d8";
  ctx.fill();
  ctx.stroke();
}

// --------------------------------
// TORSO
// --------------------------------
function drawTorso() {
  setOutline();
  setSuitFill();

  // Body
  ctx.beginPath();
  ctx.roundRect(110, 155, 80, 110, 18);
  ctx.fill();
  ctx.stroke();

  // Chest panel
  ctx.beginPath();
  ctx.roundRect(130, 185, 40, 35, 8);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.stroke();

  // Buttons on panel
  ctx.fillStyle = "#ff4d4d";
  ctx.fillRect(136, 193, 8, 8);

  ctx.fillStyle = "#4da6ff";
  ctx.fillRect(148, 193, 8, 8);

  ctx.fillStyle = "#ffd24d";
  ctx.fillRect(160, 193, 8, 8);

  // Accent belt
  setAccentFill();
  ctx.beginPath();
  ctx.roundRect(110, 250, 80, 18, 8);
  ctx.fill();

  setOutline();
  ctx.stroke();
}

// --------------------------------
// LEFT ARM
// --------------------------------
function drawLeftArm() {
  setOutline();
  setSuitFill();

  // Upper arm
  ctx.beginPath();
  ctx.roundRect(75, 170, 35, 65, 18);
  ctx.fill();
  ctx.stroke();

  // Forearm (slightly angled feel by offset)
  ctx.beginPath();
  ctx.roundRect(65, 225, 40, 65, 18);
  ctx.fill();
  ctx.stroke();

  // Glove
  ctx.beginPath();
  ctx.roundRect(62, 282, 45, 28, 12);
  ctx.fillStyle = "#d0d0d0";
  ctx.fill();
  ctx.stroke();

  // Accent ring
  setAccentFill();
  ctx.beginPath();
  ctx.roundRect(78, 210, 25, 10, 5);
  ctx.fill();
}

// --------------------------------
// RIGHT ARM
// --------------------------------
function drawRightArm() {
  setOutline();
  setSuitFill();

  // Upper arm
  ctx.beginPath();
  ctx.roundRect(190, 170, 35, 65, 18);
  ctx.fill();
  ctx.stroke();

  // Forearm
  ctx.beginPath();
  ctx.roundRect(195, 225, 40, 65, 18);
  ctx.fill();
  ctx.stroke();

  // Glove
  ctx.beginPath();
  ctx.roundRect(195, 282, 45, 28, 12);
  ctx.fillStyle = "#d0d0d0";
  ctx.fill();
  ctx.stroke();

  // Accent ring
  setAccentFill();
  ctx.beginPath();
  ctx.roundRect(198, 210, 25, 10, 5);
  ctx.fill();
}

// --------------------------------
// LEFT LEG
// --------------------------------
function drawLeftLeg() {
  setOutline();
  setSuitFill();

  // Thigh
  ctx.beginPath();
  ctx.roundRect(120, 265, 30, 65, 16);
  ctx.fill();
  ctx.stroke();

  // Shin
  ctx.beginPath();
  ctx.roundRect(115, 325, 35, 55, 16);
  ctx.fill();
  ctx.stroke();

  // Boot
  ctx.beginPath();
  ctx.roundRect(105, 370, 55, 22, 12);
  ctx.fillStyle = "#d0d0d0";
  ctx.fill();
  ctx.stroke();

  // Knee pad accent
  setAccentFill();
  ctx.beginPath();
  ctx.roundRect(122, 295, 26, 12, 6);
  ctx.fill();
}

// --------------------------------
// RIGHT LEG
// --------------------------------
function drawRightLeg() {
  setOutline();
  setSuitFill();

  // Thigh
  ctx.beginPath();
  ctx.roundRect(150, 265, 30, 65, 16);
  ctx.fill();
  ctx.stroke();

  // Shin
  ctx.beginPath();
  ctx.roundRect(150, 325, 35, 55, 16);
  ctx.fill();
  ctx.stroke();

  // Boot
  ctx.beginPath();
  ctx.roundRect(145, 370, 55, 22, 12);
  ctx.fillStyle = "#d0d0d0";
  ctx.fill();
  ctx.stroke();

  // Knee pad accent
  setAccentFill();
  ctx.beginPath();
  ctx.roundRect(152, 295, 26, 12, 6);
  ctx.fill();
}

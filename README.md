# SPACEMAN GAME

For this project, I built a browser-based word guessing game inspired by Hangman. The player guesses letters using an on-screen keyboard while a spaceman is progressively drawn on a canvas for each incorrect guess. The game ends when the word is fully revealed or the maximum number of incorrect guesses is reached.

Play Now: [SpaceMan](https://rcasares316.github.io/Spaceman-Game/)

# How to Play

### Basic Rules

A random word is selected at the start of each game

A hint is displayed to help the player guess the word

The player clicks letters on the on-screen keyboard to make guesses

Correct guesses reveal letters in the word

Incorrect guesses draw a new part of the spaceman

The player has 6 incorrect guesses before losing

### Winning

The player wins by correctly guessing all letters in the word before reaching the maximum number of incorrect guesses

### Losing

The player loses after 6 incorrect guesses

When the game ends, a modal appears displaying the correct word and a win or loss animation

# Technologies Used

HTML – Game structure and layout

CSS – Styling, layout, animations, and responsive design

JavaScript – Game logic, DOM manipulation, and event handling

Canvas API – Drawing the spaceman character dynamically

# Project Structure

- Spaceman
  - index.html
  - style.css
  - app.js

# File Overview

### index.html

Defines the game layout and UI structure

Includes:

Game title

Spaceman canvas layered over a spaceship image

Word display and hint text

Guess counter

On-screen keyboard container

End-game modal with replay button

### style.css

Uses Flexbox to center and align game elements

Styles the keyboard, modal overlay, and game container

Layers the canvas above the spaceship using position and z-index

Includes media queries for mobile responsiveness

### app.js

Handles all game logic, rendering, and interactivity.

Core Responsibilities

Random word selection from a predefined word list

Dynamic keyboard generation (A–Z)

Tracking correct and incorrect guesses

Updating the word display

Managing win/loss conditions

Resetting the game state

Drawing the spaceman using the Canvas API

### Canvas Drawing System

#### Drawing Logic

The spaceman is drawn incrementally based on incorrect guesses

Each body part is drawn by a separate function

Parts are drawn in a predefined order:

const parts = [
drawLeftArm,
drawRightArm,
drawTorso,
drawLeftLeg,
drawRightLeg,
drawHead,
];

#### Visual Design

Rounded shapes and outlines for a clean cartoon look

Consistent styling using helper functions:

setOutline()

setSuitFill()

setAccentFill()

Helmet visor, chest panel, belt, and accent colors add detail

### Key Design Decisions

Canvas-Based Rendering
Using the Canvas API allows precise control over drawing order and visual style for the spaceman.

Dynamic Keyboard Generation
Keyboard buttons are created programmatically, making input handling consistent and scalable.

Modal-Based End Screen
A modal overlay cleanly separates gameplay from end-game feedback.

State Tracking via Arrays and Counters
Game state is managed using:

currentWord

wrongGuessCount

correctLetters

# Future Improvements

Difficulty levels (fewer or more allowed guesses)

Sound effects for correct and incorrect guesses

Score tracking across multiple rounds

Timer-based challenge mode

Mobile touch optimizations

Animated spaceman drawing transitions

# Author

Richard Casares

[GitHub](https://github.com/RCasares316?tab=repositories)

# Reflections

This project helped reinforce DOM manipulation, event-driven programming, and canvas drawing techniques. The most challenging part was coordinating game state with canvas rendering, but breaking the drawing into modular functions made the logic easier to manage and extend.

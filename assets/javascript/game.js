
var words = [
        'Plumbus',
        'Squanchy',
        'Birdperson',
        'Scary Terry',
        'Tammy',
        'Snuffles',
        'Mr Poopybutthole',
        'Pickle Rick',
        'Tiny Rick',
        'Mr Meeseeks',
        'The Vindicators',
        'Ball Fondlers',
        'Prince Nebulon',
        'King Jelly Bean',
        'Water T',
        'Krombopulos Michael',
        'Sleepy Gary',
        'Gazorpazorpfield',
        'Pencilvester',
        'The Cromulons',
      ];

var letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]

// Declare html IDs
var htmlWordID = document.getElementById('htmlWordID');
var userGuessesID = document.getElementById('userGuessesID');
var lettersChosenID = document.getElementById('lettersChosenID');
var intro = document.getElementById('Intro');
var winsID = document.getElementById('winsID');

var game = {
  wins: 0,
  userGuesses: 15,
  htmlWord: '',
  currentWord: words[Math.floor(Math.random() * words.length)],
  lettersChosen: [],
  roundOver: false,

  reduceScore: function() {
    if (this.userGuesses > 0) {
      this.userGuesses = this.userGuesses - 1;
      userGuessesID.innerHTML = this.userGuesses;
    };
  },

  checkScore: function() {
    if (this.userGuesses <= 0) {
      this.lettersChosen = 'Game Over';
      this.roundOver = true;
    };
  },

  hideWord: function () {
    // Loop through the currentWord and hide letters with dashes
    for (var i = 0; i < this.currentWord.length; i++) {
      if (this.currentWord[i] === " ") {
        this.htmlWord += "  ";
      } else {
        this.htmlWord += "-";
      }
    }
    // Write to the htmlWord element
    htmlWordID.innerHTML = this.htmlWord
  },

  updateHiddenWord: function () {
    // Loop through the currentWord and hide letters with dashes
    for (var i = 0; i < this.currentWord.length; i++) {
      if (this.currentWord[i] === " ") {
        this.htmlWord += "  ";
      } else if (this.lettersChosen.indexOf(this.currentWord[i].toUpperCase()) > -1) {
        this.htmlWord += this.currentWord[i];
      } else {
        this.htmlWord += "-";
      };
    }
    // Write to the htmlWord element
    htmlWordID.innerHTML = this.htmlWord
  },

  isWordComplete: function() {
    if (this.htmlWord.indexOf('-') > -1) {
      this.reduceScore();
      this.checkScore();
    } else {
      this.lettersChosen = 'You win!';
      this.roundOver = true;
      this.wins = this.wins + 1;
      winsID.innerHTML = this.wins;
    };
    
  },
};


// Loop through the currentWord and hide letters with dashes
game.hideWord();

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {

  // If game is over and spacebar is pressed, reset game properties
  if (game.roundOver === true && event.keyCode === 32) {
    game.userGuesses = 15;
    game.currentWord = words[Math.floor(Math.random() * words.length)];
    game.lettersChosen = [];
    game.htmlWord = '';
    game.hideWord();
    userGuessesID.innerHTML = game.userGuesses;
    lettersChosenID.innerHTML = game.lettersChosen.join('  ');
    intro.innerHTML = 'Choose a letter to play!';
    game.roundOver = false;
    htmlWordID.style.color = 'inherit';
    return;
  } else if (game.lettersChosen === 'Game Over') {
    return;
  };

  // Determines which key was pressed.
  var userInput = event.key;

  // Loop through letters array
  for (var i = 0; i < letters.length; i++) {

    if (userInput.toLowerCase() === letters[i]) {

      // If upper case userInput is not in lettersChosen array
      if (game.lettersChosen.indexOf(userInput.toUpperCase()) < 0) {

        // Push userInput into lettersChosen array
        game.lettersChosen.push(userInput.toUpperCase());
        game.htmlWord = '';
        game.updateHiddenWord();
        game.isWordComplete();
      };
    };
  };




  // Print string of elements in lettersChosen array
  if (game.lettersChosen === 'Game Over') {
    lettersChosenID.innerHTML = game.lettersChosen;
    intro.innerHTML = 'Press Spacebar to try again';
  } else if (game.lettersChosen === 'You win!') {
    lettersChosenID.innerHTML = game.lettersChosen;
    intro.innerHTML = 'Press Spacebar to continue!';
  } else {
    lettersChosenID.innerHTML = game.lettersChosen.join('  ');
  };

  // When the current round is over
  if (game.roundOver === true) {

    // If the round is a win, show the currentWord and color green
    if (game.userGuesses > 0) {
        htmlWordID.innerHTML = game.currentWord;
        htmlWordID.style.color = 'green';

    // If the round is a lose, show the currentWord and color red
    } else {
      htmlWordID.innerHTML = game.currentWord;
      htmlWordID.style.color = 'red';
    }
  };
};
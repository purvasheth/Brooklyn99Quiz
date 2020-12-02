/*
Additional Features
+ used a mock api to fetch questions 
+ added chalk 
+ quiz has a MCQ format with options
+ high score function
*/

const fetch = require("node-fetch");
const chalk = require('chalk');
const readlineSync = require('readline-sync')

const log = console.log
const clear = console.clear

highScores = [
  { name: 'abc', score: 14 },
  { name: 'pqr', score: 13 },
  { name: 'xyz', score: 12 },
]

fetchQuestions(play)

function play(questions) {
  clear()
  welcome()
  var s = displayQuestions(questions)
  checkHighScores(s)
}

async function fetchQuestions(play) {
  var response = await fetch('https://run.mocky.io/v3/ccab1f0b-05e9-49d0-975c-3c5d422bdc09')
  questions = await response.json()
  play(questions)
}

function welcome() {
  name = readlineSync.question(chalk.yellow(" What's your name? "))
  log(chalk.cyanBright("  Welcome " + name + " !"))
  log()
  log(chalk.cyanBright("Get ready to play the 'Brooklyn 99' Quiz"))
  log()

}
function displayQuestions(questions) {
  var score = 0
  for (q of questions) {
    log(chalk.yellow(q.Question))
    var options = q.Options.map(op => chalk.cyanBright(op))
    index = readlineSync.keyInSelect(options, 'Select option ', { cancel: false });

    answer = q.Answer
    if ((index + 1) == answer) {
      log(chalk.green("Correct!"))
      ++score
    }
    else {
      log(chalk.red("Wrong :("))
      log(chalk.green("Correct Answer is " + answer))
    }
    log("Your score so far: " + score)
    log()
  }
  var n = questions.length;
  log(chalk.yellowBright.bold("Your Final Score : " + score + "/" + n))
  return score
}

function checkHighScores(score) {

  for (var i = 0; i < 3; i++) {
    if (score >= highScores[i]['score']) {
      log(chalk.green('Congratulations!!! You have made it to the highscore table. Send me a screenshot to get your name in it.'))

      break
    }
  }
  log(chalk.cyanBright('High Scores Table'))
  for (var i = 0; i < 3; i++) {
    log(highScores[i]['name'], highScores[i]['score'])

  }
}



// Globals
// Question Objects
let questionOne = {
    color: 'red',
    multiplier: -3,
  } 
let questionTwo = {
    color: 'orange',
    multiplier: -2,
  } 
let questionThree = {
    color: 'yellow',
    multiplier: -1,
  }
let questionFour = {
    color: 'green',
    multiplier: 1,
  } 
let questionFive = {
    color: 'blue',
    multiplier: 2,
  }
let questionSix = {
    color: 'purple',
    multiplier: 3,
  }
let questions = [questionOne, questionTwo, questionThree, questionFour, questionFive, questionSix]

let currentQuestion = 0
let questionScores = [6,5,4,3,2,1]
let scoreTotal = 0;

let answers = $('.answer')
let submitButton = $("#submit")
let goBackButton = $("#goBack")
console.log(answers)

// Submit an answer!
  // Make an array of all the answers
  // Check which answer is selected and tally the score appropriately
    // If no answer is selected, do not continue
    // Alert user to select an answer
  // Move on to the next question!
const submitAnswer = (e) => {
    console.log('Submitting answer...')
    e.preventDefault()
    question = questions[currentQuestion]
    console.log(answers)

    for (let i=0; i<questionScores.length; i++) {
        console.log('Checking answer',i)
        if(answers[i].checked) {
            question.answer = answers[i].value
            console.log(answers[i].value)
            scoreTotal += question.multiplier * questionScores[i]
            console.log('Checker:' + question.multiplier + ',' + questionScores[i] + ',' +scoreTotal)
            nextQuestion()
        } else {
            $('#errorBox').text = 'Please select an answer'
        }
    }
}

// Changes up the display to allow for the next question
const nextQuestion = () => {
    console.log('Updating next question...')
    currentQuestion++

    for (let i=0; i<questionScores.length; i++) {
        answers[i].checked = false
    } 
    
    if (currentQuestion >= questions.length) {
        endGameScreen()
    } else {
        setUpPage()
    }
}

// Tell the player how messed up they are
const endGameScreen = () => {
    $('#colorBox').css("background-color", "white")
    submitButton.click()
    resultImage = $('#imageResult')
    resultMessage = $("#messageResult")
    if (scoreTotal > 10) {
        // You're not that messed up
        resultImage.attr("src", "https://i.imgur.com/LobirPo.jpg")
        resultMessage.text("You're not that messed up. A little torture never hurt anyone.")

    } else if (scoreTotal < -10) {
        // Oof. Yeah, you are WAY messed up my friend.
        resultImage.attr("src", "https://i.imgur.com/xWwewZb.jpg")
        resultMessage.text("Oof. Yeah, you are WAY messed up my friend.")
    } else {
        // You need some help
        resultImage.attr("src", "https://i.imgur.com/rOMWHta.png")
        resultMessage.text("You need some help. You're the run-of-the-mill murderous type.")
    }
}

// Randomize the question order
const randomizeQuestions = () => {
    for (i=0; i< questions.length; i++) {
        randIndex = Math.floor(Math.random() * questions.length) // Select a random index to swap with
        
        var placeHolder = questions[i]
        questions[i] = questions[randIndex]
        questions[randIndex] = placeHolder
    }
}

// Go Back a question
const goBack = () => {
    if (currentQuestion <= 0) {
        return
    } else {
        currentQuestion--
        console.log(questions[currentQuestion].answer)
        setUpPage()
        for (var i=0; i<questionScores.length; i++) {
            if(questions[currentQuestion].answer === answers[i].value) {
                console.log("Checking box",answers[i].value)
                answers[i].checked = true
                scoreTotal -= question.multiplier * questionScores[i]
            }
        }
    }
}

// Startup Function
const setUpPage = () => {
    background = $('#colorBox')
    background.css("background-color", questions[currentQuestion].color)
}

randomizeQuestions()
setUpPage();
submitButton.click(submitAnswer)
goBackButton.click(goBack)
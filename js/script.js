



const quiz = document.querySelector('#quiz')
const answerEl = document.querySelectorAll('.answer')
const questionEl = document.querySelector('#question')
const a_text = document.querySelector('#a_text')
const b_text = document.querySelector('#b_text')
const c_text = document.querySelector('#c_text')
const d_text = document.querySelector('#d_text')
const submit = document.querySelector('#submit')

let currentQuestion = 0
let score = 0


function loadQuiz() {
  const quizData = getData('quizData') 
  const newData = quizData.map((item, index) => {
    return {
      ...item,
      id: index,
    }
  })
  setData('quizData', newData)


  currentQuizData = newData[currentQuestion]
  questionEl.innerHTML = currentQuizData.question

  a_text.innerHTML = currentQuizData.a
  b_text.innerHTML = currentQuizData.b
  c_text.innerHTML = currentQuizData.c
  d_text.innerHTML = currentQuizData.d
}


const getSelected = () => {
  let answer = null

  answerEl.forEach(item => {
    console.log(item.id);
    if (item.checked) {
      answer = item.id
    }
  })

  return answer
}
getSelected()


const deselectedAnswers = () => {
  answerEl.forEach(item => {
    item.checked = false
  })
}


submit.addEventListener('click', (e) => {
  const quizData = getData('quizData')
  e.preventDefault()
  const answer = getSelected()
  if (answer) {
    if (answer === quizData[currentQuestion].correct) {
      score++
    }

    currentQuestion++

    if (currentQuestion < quizData.length) {
      loadQuiz()
      deselectedAnswers()
    } else {
      quiz.innerHTML = `
        <h2>You ansvered correctly at ${score} / ${quizData.length} questions</h2>
        <button onclick="showCorrectAnswers()">Show correctly answers</button>
      `
    }
  }
})

loadQuiz()

function showCorrectAnswers() {
  const quizData = getData('quizData')
  let template = ''

  quizData.forEach(question => {
    template += `
      <ol type="a" style="padding: 20px; text-align: center; list-style-position: inside;">
        <h2>${question.question}</h2>
        <li>${question.a}</li>
        <li>${question.b}</li>
        <li>${question.c}</li>
        <li>${question.d}</li>
        <h3>true answer: <span style="color: red;">${question.correct}</span></h3>
      </ol>
    `
  })
  template += `<button onclick="window.location.reload()" id="exitBtn">Exit</button>`

  quiz.innerHTML = template
}

function getData(key) {
  return JSON.parse(localStorage.getItem(key))
}
function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

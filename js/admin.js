const mainContainer = document.querySelector('.mainContainer')
const modalContainer = document.querySelector('.modalContainer')
const modalCard = document.querySelector('.modalCard')
const contentContainer = document.querySelector('.content')


window.addEventListener('DOMContentLoaded', () => {
  const quizData = getData('quizData')
  if (!quizData) {
    setData('quizData', [])
  } else {
    const newData = quizData.map((item, index) => {
      return {
        ...item,
        id: index,
        edited: null,
      }
    })
    setData('quizData', newData)
    const content = newData.reverse().map(({ question, a, b, c, d, correct, id, edited }) => adminContainer(question, a, b, c, d, correct, id, edited)).join('')
    contentContainer.innerHTML = content

  }

})


function adminContainer(question, a, b, c, d, correct, id, edited) {
  return `
    <div class="questionCard">
      <div class="questionBody">
        <h3 style="text-align: center;">${question}</h3>
        <ol style="padding: 0 0 0 50px;" type="a">
          <li>${a}</li>
          <li>${b}</li>
          <li>${c}</li>
          <li>${d}</li>
        </ol>
        <h3 style="text-align: center;">True variant: <span style="color: red;">${correct}</span></h3>
        ${edited ? `<span class="editTime">редак... ${edited}</span>` : ''}
      </div>
      <div class="questionFooter">
        <button onclick="deleteQuestion(${id})" id="delete" class="action">delete</button>
        <button onclick="editQuiestion(${id})" id="edit" class="action">edit</button>
      </div>
    </div>
    `
}
const newQue = document.querySelector('#newQue')
const newA = document.querySelector('#newA')
const newB = document.querySelector('#newB')
const newC = document.querySelector('#newC')
const newD = document.querySelector('#newD')
const correctVariant = document.querySelector('#correctVariant')
const addBtn = document.querySelector('#add')
const eidtBtn = document.querySelector('#edit')
const deleteBtn = document.querySelector('#delete')
const addQuestion = document.querySelector('.addQuestion')


function deleteQuestion(id) {
  const askDelete = confirm('Вы действительно хотите удалить?')

  if (!askDelete) return

  const quizData = getData('quizData')
  const newData = quizData.filter(item => item.id !== id)

  setData('quizData', newData)
  window.location.reload()
}


function setQuestion() {
  const quizData = getData('quizData')
  if (isValidate(newQue, newA, newB, newC, newD, correctVariant)) {
    setData('quizData', [
      ...quizData,
      {
        question: newQue.value,
        a: newA.value,
        b: newB.value,
        c: newC.value,
        d: newD.value,
        correct: correctVariant.value,
      }
    ])
    window.location.reload()
  }
}
const body = document.querySelector('body')
const editModal = document.querySelector('.editModal')
const editCard = document.querySelector('.editCard')
const editQue = document.querySelector('#editQue')
const editA = document.querySelector('#editA')
const editB = document.querySelector('#editB')
const editC = document.querySelector('#editC')
const editD = document.querySelector('#editD')
const editCorrect = document.querySelector('#editCorrect')
const saveEditBtn = document.querySelector('#saveEditBtn')



function editQuiestion(id) {
  const quizData = getData('quizData')
  editModalCard(editModal)

  quizData.forEach(item => {
    if (item.id === id) {
      editQue.value = item.question
      editA.value = item.a
      editB.value = item.b
      editC.value = item.c
      editD.value = item.d
      editCorrect.value = item.correct
    }
  })

  saveEditBtn.addEventListener('click', () => {
    const newData = quizData.map(item => {
      if (item.id !== id) return item
      if (isValidate(editQue, editA, editB, editC, editD, editCorrect)) {
        return {
          ...item,
          question: editQue.value,
          a: editA.value,
          b: editB.value,
          c: editC.value,
          d: editD.value,
          correct: editCorrect.value,
          edited: currentDate(),
        }
      }
  })
  setData('quizData', newData)
  closeModalCard(editCard)
  window.location.reload()
})
}



function closeModalCard(item) {
  item.classList.remove('openEditModal')
  body.style.overflow = 'auto'
}


function editModalCard(item) {
  item.classList.add('openEditModal')
  body.style.overflow = 'hidden'

}



function getData(key) {
  return JSON.parse(localStorage.getItem(key))
}
function setData(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}


function isValidate(question, a, b, c, d, correct) {

  if (!question.value) {
    question.classList.add('error')
    return false
  } 
  question.classList.remove('error')
  

  if (!a.value) {
    a.classList.add('error')
    return false
  }
  a.classList.remove('error')
  
  if (!b.value) {
    b.classList.add('error')
    return false
  }
  b.classList.remove('error')
  
  if (!c.value) {
    c.classList.add('error')
    return false
  }
  c.classList.remove('error')
  
  if (!d.value) {
    d.classList.add('error')
    return false
  }
  d.classList.remove('error')

  if (!correct.value || correct.value !== 'a' && correct.value !== 'b' && correct.value !== 'c') {
    correct.classList.add('error')
    return false
  }
  correct.classList.remove('error')
  return true
}



function currentDate() {
  return new Date().toLocaleString()
}
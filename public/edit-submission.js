const submissionIDDOM = document.querySelector('.submission-edit-id')
const submissionNameDOM = document.querySelector('.submission-edit-name')
const submissionCompletedDOM = document.querySelector('.submission-edit-completed')
const editFormDOM = document.querySelector('.single-submission-form')
const editBtnDOM = document.querySelector('.submission-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName

const showSubmission = async () => {
  try {
    const {
      data: { submission },
    } = await axios.get(`/api/v1/submissions/${id}`)
    const { _id: submissionID, completed, name } = submission

    submissionIDDOM.textContent = submissionID
    submissionNameDOM.value = name
    tempName = name
    if (completed) {
      submissionCompletedDOM.checked = true
    }
  } catch (error) {
    console.log(error)
  }
}

showSubmission()

editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...'
  e.preventDefault()
  try {
    const submissionName = submissionNameDOM.value
    const submissionCompleted = submissionCompletedDOM.checked

    const {
      data: { submission },
    } = await axios.patch(`/api/v1/submissions/${id}`, {
      name: submissionName,
      completed: submissionCompleted,
    })

    const { _id: submissionID, completed, name } = submission

    submissionIDDOM.textContent = submissionID
    submissionNameDOM.value = name
    tempName = name
    if (completed) {
      submissionCompletedDOM.checked = true
    }
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited submission`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    console.error(error)
    submissionNameDOM.value = tempName
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }
  editBtnDOM.textContent = 'Edit'
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 6000)
})
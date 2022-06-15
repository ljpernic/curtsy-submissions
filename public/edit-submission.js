const submissionIDDOM = document.querySelector('.submission-edit-id')
const submissionNameDOM = document.querySelector('.submission-edit-name')
const submissionStatusDOM = document.querySelector('.submission-edit-status')
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
    const { _id: submissionID, status, name } = submission

    submissionIDDOM.textContent = submissionID
    submissionNameDOM.value = name
    tempName = name
    if (status) {
      submissionStatusDOM.checked = true
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
    const submissionStatus = submissionStatusDOM.checked
//    console.log(submissionStatus);
    const {
      data: { submission },
    } = await axios.patch(`/api/v1/submissions/${id}`, {
      name: submissionName,
      status: submissionStatus,
    })

    const { _id: submissionID, status, name } = submission

    submissionIDDOM.textContent = submissionID
    submissionNameDOM.value = name
    tempName = name
    if (status) {
      submissionStatusDOM.checked = true
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
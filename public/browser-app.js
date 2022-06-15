const submissionsDOM = document.querySelector('.submissions')                           // document.querySelector('.something') returns the first Element within the 
const loadingDOM = document.querySelector('.loading-text')                              //// document that matches the specified selector, or group of selectors.
const formDOM = document.querySelector('.submission-form')                                    //// Some of these are for CSS, some are for content, and some are for 
const submissionInputDOM = document.querySelector('.submission-input')                              //// submissions and alerts.
const emailInputDOM = document.querySelector('.email-input')
const titleInputDOM = document.querySelector('.title-input')
const typeInputDOM = document.querySelector('.type-input')
const wordCountInputDOM = document.querySelector('.word-count-input')
const fileInputDOM = document.querySelector('.file-input')
const coverLetterInputDOM = document.querySelector('.cover-letter-input')
const formAlertDOM = document.querySelector('.form-alert')

// Load submissions from /api/submissions
const showSubmissions = async () => {                                                   // Function to show all submissions.
  loadingDOM.style.visibility = 'visible'                                               // Shows a loading message if it takes too long
  try {
    const {
      data: { submissions },                                                                  // Data that's returned in JSON with the submission 
    } = await axios.get('/api/v1/submissions')                                                // Looks to see if there is anything actually there
    if (submissions.length < 1) {                                                             // If there are no submissions,
      submissionsDOM.innerHTML = '<h5 class="empty-list">No submissions in your list</h5>'    //// show "No submissions!"
      loadingDOM.style.visibility = 'hidden'                                                  //// and don't show loading.
      return
    }
    const allSubmissions = submissions                                                        // Otherwise, assign the submissions found to allSubmissions and
      .map((submission) => {                                                                  // map them into an array with
        const { status, _id: submissionID, name } = submission                                //// the key pairs assigned to each individual submission
                                                                                              // Then return HTML that gives new submission details
        return `<div class="single-submission ${status && 'submission-status'}">
                  <h5>
                    <span>
                      <i class="far fa-check-circle"></i>
                    </span>
                      ${name}
                  </h5>
                  <div class="submission-links">
                    <a href="submission.html?id=${submissionID}" class="edit-link">                     <!-- edit link -->
                      <i class="fas fa-edit"></i>
                    </a>
                    <button type="button" class="delete-btn" data-id="${submissionID}">           <!-- delete btn -->
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>`
        })
      .join('')
    submissionsDOM.innerHTML = allSubmissions                                                           // Then return all submissions.
  } catch (error) {                                                                         // Otherwise, if there's an error
    submissionsDOM.innerHTML =                                                                    //// return an error message instead
      `<h5 class="empty-list">
        There was an error, please try later....
      </h5>`
  }
  loadingDOM.style.visibility = 'hidden'                                                    // And make the loading message hidden again
}

showSubmissions()                                                                                 // Executes the function

// delete submission /api/submissions/:id

submissionsDOM.addEventListener('click', async (e) => {                                           // Function with event listener for deleting submissions
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {                                  // If the button is clicked
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/submissions/${id}`)                                             //// delete the entry that corresponds to the submissionID 
      showSubmissions()                                                                           //// and reshow all submissions
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form
formDOM.addEventListener('submit', async (e) => {                                           // Function with event listener for new entries
  e.preventDefault()
  const name = submissionInputDOM.value                                                           // Uses input class in index.html to match name submitted there
  const email = emailInputDOM.value
  const title = titleInputDOM.value
  const type = typeInputDOM.value
  const wordCount = wordCountInputDOM.value
  const file = fileInputDOM.value
  const coverLetter = coverLetterInputDOM.value
                                                                                         //// with name key pair here
  try {
    await axios.post('/api/v1/submissions', { 
      name, 
      email, 
      title,
      type,
      wordCount,
      file,
      coverLetter
     })                                             // Then try to post that name value to the JSON.
    showSubmissions()                                                                             // Then show all submissions and
    submissionInputDOM.value = ''                                                                 //// reset the value to null and
    emailInputDOM.value = ''
    titleInputDOM.value = ''
    typeInputDOM.value = ''
    wordCountInputDOM.value = ''
    fileInputDOM.value = ''
    coverLetterInputDOM.value = ''
    formAlertDOM.style.display = 'block'                                                    //// show an alert that it was successfully added
    formAlertDOM.textContent = `success, submission added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {                                                                         // Otherwise, show an error.
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`                                      //// with this message
  }
  setTimeout(() => {                                                                        // Removes the success alert after a few seconds
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 6000)
})
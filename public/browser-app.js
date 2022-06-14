const tasksDOM = document.querySelector('.tasks')                                       // document.querySelector('.something') returns the first Element within the 
const loadingDOM = document.querySelector('.loading-text')                              //// document that matches the specified selector, or group of selectors.
const formDOM = document.querySelector('.task-form')                                    //// Some of these are for CSS, some are for content, and some are for 
const taskInputDOM = document.querySelector('.task-input')                              //// submissions and alerts.
const emailInputDOM = document.querySelector('.email-input')
const titleInputDOM = document.querySelector('.title-input')
const typeInputDOM = document.querySelector('.type-input')
const wordCountInputDOM = document.querySelector('.word-count-input')
const fileInputDOM = document.querySelector('.file-input')
const coverLetterInputDOM = document.querySelector('.cover-letter-input')
const formAlertDOM = document.querySelector('.form-alert')

// Load tasks from /api/tasks
const showTasks = async () => {                                                         // Function to show all tasks.
  loadingDOM.style.visibility = 'visible'                                               // Shows a loading message if it takes too long
  try {
    const {
      data: { tasks },                                                                  // Data that's returned in JSON with the submission 
    } = await axios.get('/api/v1/tasks')                                                // Looks to see if there is anything actually there
    if (tasks.length < 1) {                                                             // If there are no tasks,
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'          //// show "No tasks!"
      loadingDOM.style.visibility = 'hidden'                                            //// and don't show loading.
      return
    }
    const allTasks = tasks                                                              // Otherwise, assign the tasks found to allTasks and
      .map((task) => {                                                                  // map them into an array with
        const { completed, _id: taskID, name } = task                                   //// the key pairs assigned to each individual task
                                                                                        // Then return HTML that gives new task details
        return `<div class="single-task ${completed && 'task-completed'}">
                  <h5>
                    <span>
                      <i class="far fa-check-circle"></i>
                    </span>
                      ${name}
                  </h5>
                  <div class="task-links">
                    <a href="task.html?id=${taskID}" class="edit-link">                     <!-- edit link -->
                      <i class="fas fa-edit"></i>
                    </a>
                    <button type="button" class="delete-btn" data-id="${taskID}">           <!-- delete btn -->
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>`
        })
      .join('')
    tasksDOM.innerHTML = allTasks                                                           // Then return all tasks.
  } catch (error) {                                                                         // Otherwise, if there's an error
    tasksDOM.innerHTML =                                                                    //// return an error message instead
      `<h5 class="empty-list">
        There was an error, please try later....
      </h5>`
  }
  loadingDOM.style.visibility = 'hidden'                                                    // And make the loading message hidden again
}

showTasks()                                                                                 // Executes the function

// delete task /api/tasks/:id

tasksDOM.addEventListener('click', async (e) => {                                           // Function with event listener for deleting tasks
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {                                  // If the button is clicked
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/tasks/${id}`)                                             //// delete the entry that corresponds to the taskID 
      showTasks()                                                                           //// and reshow all tasks
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form
formDOM.addEventListener('submit', async (e) => {                                           // Function with event listener for new entries
  e.preventDefault()
  const name = taskInputDOM.value                                                           // Uses input class in index.html to match name submitted there
  const email = emailInputDOM.value
  const title = titleInputDOM.value
  const type = typeInputDOM.value
  const wordCount = wordCountInputDOM.value
  const file = fileInputDOM.value
  const coverLetter = coverLetterInputDOM.value
                                                                                         //// with name key pair here
  try {
    await axios.post('/api/v1/tasks', { 
      name, 
      email, 
      title,
      type,
      wordCount,
      file,
      coverLetter
     })                                             // Then try to post that name value to the JSON.
    showTasks()                                                                             // Then show all tasks and
    taskInputDOM.value = ''                                                                 //// reset the value to null and
    emailInputDOM.value = ''
    titleInputDOM.value = ''
    typeInputDOM.value = ''
    wordCountInputDOM.value = ''
    fileInputDOM.value = ''
    coverLetterInputDOM.value = ''
    formAlertDOM.style.display = 'block'                                                    //// show an alert that it was successfully added
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {                                                                         // Otherwise, show an error.
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`                                      //// with this message
  }
  setTimeout(() => {                                                                        // Removes the success alert after a few seconds
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
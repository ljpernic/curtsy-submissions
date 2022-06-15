const readersDOM = document.querySelector('.readers')                           // document.querySelector('.something') returns the first Element within the 
const loadingDOM = document.querySelector('.loading-text')                              //// document that matches the specified selector, or group of selectors.
const formDOM = document.querySelector('.reader-form')                                    //// Some of these are for CSS, some are for content, and some are for 
const readerInputDOM = document.querySelector('.reader-input')                              //// readers and alerts.
const emailInputDOM = document.querySelector('.email-input')
const formAlertDOM = document.querySelector('.form-alert')

// Load readers from /api/readers
const showReaders = async () => {                                                   // Function to show all readers.
  loadingDOM.style.visibility = 'visible'                                               // Shows a loading message if it takes too long
  try {
    const {
      data: { readers },                                                                  // Data that's returned in JSON with the readers 
    } = await axios.get('/api/v1/readers')                                                // Looks to see if there is anything actually there
    if (readers.length < 1) {                                                             // If there are no readers,
      readersDOM.innerHTML = '<h5 class="empty-list">No readers in your list</h5>'          //// show "No readers!"
      loadingDOM.style.visibility = 'hidden'                                            //// and don't show loading.
      return
    }
    const allReaders = readers                                                  // Otherwise, assign the readers found to allReaders and
      .map((reader) => {                                                                  // map them into an array with
        const { status, _id: readerID, readerName } = reader                                   //// the key pairs assigned to each individual reader
                                                                                        // Then return HTML that gives new reader details
        return `<div class="single-reader ${status && 'reader-status'}">
                  <h5>
                    <span>
                      <i class="far fa-check-circle"></i>
                    </span>
                      ${readerName}
                  </h5>
                  <div class="reader-links">
                    <a href="reader.html?id=${readerID}" class="edit-link">                     <!-- edit link -->
                      <i class="fas fa-edit"></i>
                    </a>
                    <button type="button" class="delete-btn" data-id="${readerID}">           <!-- delete btn -->
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>`
        })
      .join('')
      readersDOM.innerHTML = allReaders                                                           // Then return all readers.
  } catch (error) {                                                                         // Otherwise, if there's an error
    readersDOM.innerHTML =                                                                    //// return an error message instead
      `<h5 class="empty-list">
        There was an error, please try later....
      </h5>`
  }
  loadingDOM.style.visibility = 'hidden'                                                    // And make the loading message hidden again
}

showReaders()                                                                                 // Executes the function

// delete reader /api/readers/:id

readersDOM.addEventListener('click', async (e) => {                                           // Function with event listener for deleting readers
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {                                  // If the button is clicked
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id
    try {
      await axios.delete(`/api/v1/readers/${id}`)                                             //// delete the entry that corresponds to the readerID 
      showReaders()                                                                           //// and reshow all readers
    } catch (error) {
      console.log(error)
    }
  }
  loadingDOM.style.visibility = 'hidden'
})

// form
formDOM.addEventListener('submit', async (e) => {                                           // Function with event listener for new entries
  e.preventDefault()
  const readerName = readerInputDOM.value                                                 // Uses input class in index.html to match readerName submitted there
                                                                                         //// with readerName key pair here
  try {
    await axios.post('/api/v1/readers', { 
      readerName, 
     })                                             // Then try to post that readerName value to the JSON.
    showReaders()                                                                             // Then show all readers and
    readerInputDOM.value = ''                                                                 //// reset the value to null and
    emailInputDOM.value = ''
    formAlertDOM.style.display = 'block'                                                    //// show an alert that it was successfully added
    formAlertDOM.textContent = `success, reader added`
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
export const makeTaskModal = (modalType) => {
    const mainBody = document.querySelector('.main-body');
    const modalDiv = document.createElement('div')
    modalDiv.classList.add('task-input-modal')
    modalDiv.id = 'task-input-modal'
    mainBody.appendChild(modalDiv)
    const modalHeader = document.createElement('div')
    modalHeader.classList.add('modal-header')
    modalDiv.appendChild(modalHeader)
    const modalTitle = document.createElement('div')
    modalTitle.classList.add('modal-title')
    modalTitle.innerText = modalType
    modalHeader.appendChild(modalTitle)
    const modalCloseButton = document.createElement('button')
    modalCloseButton.classList.add('modal-close-button')
    modalCloseButton.id = 'modal-close-button'
    modalCloseButton.textContent = '✖'
    modalHeader.appendChild(modalCloseButton)
    const modalBody = document.createElement('div')
    modalBody.classList.add('modal-body')
    modalDiv.appendChild(modalBody)
    const form = document.createElement('form')
    modalBody.appendChild(form)
    const formTop = document.createElement('div')
    formTop.classList.add('form-top')
    form.appendChild(formTop)
    const formTopLeft = document.createElement('div')
    formTopLeft.classList.add('form-top-left')
    formTop.appendChild(formTopLeft)
    const titleLabel = document.createElement('label')
    titleLabel.for = 'title'
    titleLabel.innerText = 'Title:'
    formTopLeft.appendChild(titleLabel)
    const titleInput = document.createElement('input')
    titleInput.type = 'text'
    titleInput.name = 'title'
    titleInput.id = 'form-title'
    formTopLeft.appendChild(titleInput)
    const descriptionLabel = document.createElement('label')
    descriptionLabel.for = 'description'
    descriptionLabel.innerText = 'Description:'
    formTopLeft.appendChild(descriptionLabel)
    const descriptionText = document.createElement('textarea')
    descriptionText.rows = '5'
    descriptionText.cols = '25'
    descriptionText.name = 'description'
    descriptionText.id = 'form-description'
    formTopLeft.appendChild(descriptionText)
    const formTopRight = document.createElement('div')
    formTopRight.classList.add('form-top-right')
    formTop.appendChild(formTopRight)
    const dateLabel = document.createElement('label')
    dateLabel.for = 'date'
    dateLabel.innerText = 'Date:'
    formTopRight.appendChild(dateLabel)
    const dateInput = document.createElement('input')
    dateInput.type = 'datetime-local'
    dateInput.name = 'date'
    dateInput.id = 'form-date'
    formTopRight.appendChild(dateInput)
    const priorityLabel = document.createElement('label')
    priorityLabel.for = 'priority'
    priorityLabel.innerText = 'Priority:'
    formTopRight.appendChild(priorityLabel)
    const prioritySelect = document.createElement('select')
    prioritySelect.name = 'priority'
    prioritySelect.id = 'form-priority'
    formTopRight.appendChild(prioritySelect)
    const lowOption = document.createElement('option')
    lowOption.value = 'low'
    lowOption.innerText = 'Low'
    prioritySelect.appendChild(lowOption)
    const mediumOption = document.createElement('option')
    mediumOption.value = 'medium'
    mediumOption.innerText = 'Medium'
    prioritySelect.appendChild(mediumOption)
    const highOption = document.createElement('option')
    highOption.value = 'high'
    highOption.innerText = 'High'
    prioritySelect.appendChild(highOption)
    const listLabel = document.createElement('label')
    listLabel.for = 'list'
    listLabel.innerText = 'List'
    formTopRight.appendChild(listLabel)
    const listSelect = document.createElement('select')
    listSelect.name = 'list'
    listSelect.id = 'form-list'
    formTopRight.appendChild(listSelect)
    const mainOption = document.createElement('option')
    mainOption.value = 'main'
    mainOption.innerText = 'Main'
    listSelect.appendChild(mainOption)
    const newTaskLists = JSON.parse(localStorage.getItem('newTaskLists')) || [];
    newTaskLists.forEach(list => {
        const newOption = document.createElement('option')
        newOption.value = list
        newOption.innerText = list
        listSelect.appendChild(newOption)
    })
    const formButtonDiv = document.createElement('div')
    formButtonDiv.classList.add('form-bottom')
    formTopRight.appendChild(formButtonDiv)
    const formButton = document.createElement('button')
    formButton.id = 'submit-btn'
    formButton.innerText = 'Submit'
    formButtonDiv.appendChild(formButton)
    const overlayDiv = document.createElement('div')
    overlayDiv.id = 'overlay'
    mainBody.appendChild(overlayDiv)
}


export const closeModal = (modalID) => {
    const modalContainer = document.getElementById(modalID);
    modalContainer.remove()
    const overlayContainer = document.getElementById('overlay');
    overlayContainer.remove();
}

import { makeTaskModal, closeModal } from "./utils.js"
import TaskList from "./tasklist.js"
import CompletedTaskList from "./completedTasklist.js";
import { differenceInHours, differenceInCalendarDays, parseISO, compareAsc } from 'date-fns'
import sideMenuImg from './assets/menu-symbol-of-three-parallel-lines-svgrepo-com.svg'


export default class Mainpage {

    constructor() {

        this.main = new TaskList('main');
        this.generatePage()
        this.initiateEventListeners()
        this.loadNewLists()
        
    }

    initiateEventListeners() {
        this.addTaskButtonEvent()
        this.addMainBtnEvent()
        this.addNewListBtnEvent()
        this.addDeleteNewListBtnEvent()
        this.addDeleteAllEvent()
        this.addCompletedTasksEvent()
        this.addTodayBtnEvent()
        this.addWeekBtnEvent()
        this.addSideMenuEvent()
    }

    //Event listeners

    addTaskButtonEvent() {
        const addTaskButton = document.getElementById('add-task-button')

        addTaskButton.addEventListener('click', () => {

            makeTaskModal('Add New Task')

            const submitBtn = document.getElementById('submit-btn')
            const closeModalButton = document.getElementById('modal-close-button')

            const formTitle = document.getElementById('form-title')
            const formDescription = document.getElementById('form-description')
            const formDate = document.getElementById('form-date')
            const formPriority = document.getElementById('form-priority')
            const formList = document.getElementById('form-list')

            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const listForUpdate = formList.value;
                this.taskFactory(formTitle.value, formDescription.value, formDate.value, formPriority.value, formList.value, false);
                this.resetInputs();
                this.updateScreen(listForUpdate);
                closeModal('task-input-modal');
            })
            //put submit event listener
            closeModalButton.addEventListener('click', () => {
                closeModal('task-input-modal')
            })
        })
    }

    addMainBtnEvent() {
        const mainBtn = document.getElementById('main-btn');
        mainBtn.addEventListener('click', () => {
            this.main.clearScreen();
            this.main.loadTaskList();
        })
    }

    addSideMenuEvent() {
        const sideMenuBtn = document.querySelector('.open-side-menu-container')
        const sideMenu = document.querySelector('.sidebar')
        const mainBody = document.querySelector('.main-body')
        sideMenuBtn.addEventListener('click', () => {
            sideMenu.classList.contains('active') ? 
                sideMenu.classList.remove('active') :
                sideMenu.classList.add('active')    
            mainBody.classList.contains('active') ?
                mainBody.classList.remove('active') :
                mainBody.classList.add('active')
        })
    }

    addTodayBtnEvent() {
        const todayBtn = document.getElementById('today-list-btn')
        todayBtn.addEventListener('click', this.parseDatesToday)
    }

    addWeekBtnEvent() {
        const weekBtn = document.getElementById('week-btn')
        weekBtn.addEventListener('click', this.parseDatesWeek)
    }

    addNewListBtnEvent() {
        const newListBtn = document.getElementById('add-new-list')

        newListBtn.addEventListener('click', () => {
            this.createListInputModal()

            const submitBtn = document.getElementById('submit-btn')
            const listNameInput = document.getElementById('list-name-input')
            const closeModalButton = document.getElementById('modal-close-button')

            submitBtn.addEventListener('click', () => {
                const name = listNameInput.value
                const newTaskLists = JSON.parse(localStorage.getItem('newTaskLists')) || [];
                newTaskLists.forEach(list => {
                    if (list == name) {
                        console.log('Error. Cannot input duplicate name')
                    }
                })
                if (name != null && name != '') {
                    this.createNewList(name);
                } else {
                    console.log('Error. Must input valid name')
                }
                closeModal('list-input-modal')
            })
            
            closeModalButton.addEventListener('click', () => {
                closeModal('list-input-modal')
            })
        })
    }

    addDeleteNewListBtnEvent() {
        const deleteNewListBtn = document.getElementById('delete-new-list')

        deleteNewListBtn.addEventListener('click', () => {
            this.createDeleteListModal()

            const submitBtn = document.getElementById('delete-list-confirm-btn')
            const cancelBtn = document.getElementById('delete-list-no-btn')
            const listNameInput = document.getElementById('delete-list-input')
            const closeModalButton = document.getElementById('modal-close-button')

            submitBtn.addEventListener('click', () => {
                const name = listNameInput.value

                if (name === 'close-modal') {
                    closeModal('delete-list-modal')
                } else {
                    this.deleteNewList(name)
                    closeModal('delete-list-modal')
                }
            })

            closeModalButton.addEventListener('click', () => {
                closeModal('delete-list-modal')
            })

            cancelBtn.addEventListener('click', () => {
                closeModal('delete-list-modal')
            })


            
        })
    }

    addCompletedTasksEvent() {
        const completedTasksBtn = document.getElementById('completed-tasks')
        completedTasksBtn.addEventListener('click', () => {
            this.changeToCompletedTasks();
        })
    }

    addDeleteAllEvent() {
        const deleteAllBtn = document.getElementById('delete-all-tasks')

        deleteAllBtn.addEventListener('click', () => {
            this.createDeleteModal()

            const closeModalButton = document.getElementById('modal-close-button')
            const confirmDeleteButton = document.getElementById('delete-all-confirm-btn')
            const noDeleteButton = document.getElementById('delete-all-no-btn')

            confirmDeleteButton.addEventListener('click', () => {
                this.deleteEverything()
                new TaskList('main')
                this.loadNewLists();
                this.closeModal('delete-modal')
            })

            closeModalButton.addEventListener('click', () => {
                closeModal('delete-modal')
            })
            
            noDeleteButton.addEventListener('click', () => {
                closeModal('delete-modal')
            })

        })
    }

    resetInputs() {

        const formTitle = document.getElementById('form-title')
        const formDescription = document.getElementById('form-description')
        const formDate = document.getElementById('form-date')
        const formPriority = document.getElementById('form-priority')
        const formList = document.getElementById('form-list')
    
        formTitle.value = ''
        formDescription.value = ''
        formDate.value = ''
        formPriority.value = ''
        formList.value = ''
    }

    taskFactory(title, details, date, priority, list, completed) {
        const listArr = JSON.parse(localStorage.getItem(list)) || [];
        listArr.push({title, details, date, priority, list, completed});
        localStorage.setItem(list, JSON.stringify(listArr));
        return {title, details, date, priority, list, completed};
    }

    //Currently only adds img to a tag
    generatePage() {
       const headerLeft = document.querySelector('.header-left')
        const sideMenuBtnContainer = document.querySelector('.open-side-menu-container')
        sideMenuBtnContainer.firstChild.remove();
        const sideMenuBtnImg = document.createElement('img')
        sideMenuBtnImg.src = sideMenuImg
        sideMenuBtnImg.id = 'open-side-menu'
        sideMenuBtnImg.setAttribute('alt', 'Open side menu button')
        sideMenuBtnContainer.appendChild(sideMenuBtnImg)
    }

    
    updateScreen(list) {
        if (list == 'main') {
            this.main.clearScreen();
            this.main.loadTaskList();
        } else if (list == 'completedTasks') {
            this.changeToCompletedTasks();
        } else {
            this.changeList(list)
        }
    }

    createNewList(name) {
        const newTaskLists = JSON.parse(localStorage.getItem('newTaskLists')) || [];
        newTaskLists.push(name);
        localStorage.setItem('newTaskLists', JSON.stringify(newTaskLists));
        this.createNewListBtn(name);
    }

    createNewListBtn(name) {
        const newBtnDiv = document.getElementById('new-button-container');
        const newBtn = document.createElement('li');
        const addNewBtn = document.getElementById('add-new-list')
        newBtn.classList.add('new-btns')
        newBtn.innerText = name
        newBtnDiv.insertBefore(newBtn, addNewBtn);
    
        //Event listener to open screen
        newBtn.addEventListener('click', () => {
            this.changeList(name);
        })
    }

    createListInputModal() {
        const mainBody = document.querySelector('.main-body');
        const modalDiv = document.createElement('div')
        modalDiv.classList.add('list-input-modal')
        modalDiv.id = 'list-input-modal'
        mainBody.appendChild(modalDiv)
        const modalHeader = document.createElement('div')
        modalHeader.classList.add('modal-header')
        modalDiv.appendChild(modalHeader)
        const modalTitle = document.createElement('div')
        modalTitle.classList.add('modal-title')
        modalTitle.innerText = 'Add New List'
        modalHeader.appendChild(modalTitle)
        const modalCloseButton = document.createElement('button')
        modalCloseButton.classList.add('modal-close-button')
        modalCloseButton.id = 'modal-close-button'
        modalCloseButton.textContent = '✖'
        modalHeader.appendChild(modalCloseButton)
        const modalBody = document.createElement('div')
        modalBody.classList.add('list-modal-body')
        modalDiv.appendChild(modalBody)
        const listModalInput = document.createElement('div')
        listModalInput.classList.add('list-modal-input')
        modalBody.appendChild(listModalInput)
        const nameLabel = document.createElement('label')
        nameLabel.for = 'list-name'
        nameLabel.innerText = 'Name:'
        listModalInput.appendChild(nameLabel)
        const nameInput = document.createElement('input')
        nameInput.type = 'text'
        nameInput.name = 'list-name'
        nameInput.id = 'list-name-input'
        listModalInput.appendChild(nameInput)
        const submitBtn = document.createElement('button')
        submitBtn.id = 'submit-btn'
        submitBtn.innerText = 'Submit'
        modalBody.appendChild(submitBtn)
        const overlayDiv = document.createElement('div')
        overlayDiv.id = 'overlay'
        mainBody.appendChild(overlayDiv)
    }

    createDeleteListModal() {
        const mainBody = document.querySelector('.main-body');
        const modalDiv = document.createElement('div')
        modalDiv.classList.add('delete-list-modal')
        modalDiv.id = 'delete-list-modal'
        mainBody.appendChild(modalDiv)
        const modalHeader = document.createElement('div')
        modalHeader.classList.add('modal-header')
        modalDiv.appendChild(modalHeader)
        const modalTitle = document.createElement('div')
        modalTitle.classList.add('modal-title')
        modalTitle.innerText = 'Delete New List'
        modalHeader.appendChild(modalTitle)
        const modalCloseButton = document.createElement('button')
        modalCloseButton.classList.add('modal-close-button')
        modalCloseButton.id = 'modal-close-button'
        modalCloseButton.textContent = '✖'
        modalHeader.appendChild(modalCloseButton)
        const modalBody = document.createElement('div')
        modalBody.classList.add('delete-list-modal-body')
        modalDiv.appendChild(modalBody)
        const deleteListInputDiv = document.createElement('div')
        deleteListInputDiv.classList.add('delete-list-input-div')
        modalBody.appendChild(deleteListInputDiv)
        const deleteListInputLabel = document.createElement('label')
        deleteListInputLabel.innerText = 'Select the list you wish to delete:'
        deleteListInputLabel.classList.add('delete-list-input-label')
        deleteListInputDiv.appendChild(deleteListInputLabel)
        const deleteListInput = document.createElement('select')
        deleteListInput.classList.add('delete-list-input')
        deleteListInput.setAttribute('id', 'delete-list-input')
        deleteListInputDiv.appendChild(deleteListInput)
        const deletableLists = JSON.parse(localStorage.getItem('newTaskLists')) || [];
        if (deletableLists.length > 0) {
            deletableLists.forEach(list => {
                const deleteListInputOption = document.createElement('option')
                deleteListInputOption.setAttribute('value', list)
                deleteListInputOption.innerText = list
                deleteListInput.appendChild(deleteListInputOption)
            })
        } else {
            const deleteListInputOption = document.createElement('option')
                deleteListInputOption.setAttribute('value', 'close-modal')
                deleteListInputOption.innerText = 'No lists'
                deleteListInput.appendChild(deleteListInputOption)
        }
        const deleteBtnDiv = document.createElement('div')
        deleteBtnDiv.classList.add('delete-list-btn-div')
        modalBody.appendChild(deleteBtnDiv)
        const noBtn = document.createElement('button')
        noBtn.id = 'delete-list-no-btn'
        noBtn.innerText = 'No'
        deleteBtnDiv.appendChild(noBtn)
        const yesBtn = document.createElement('button')
        yesBtn.id = 'delete-list-confirm-btn'
        yesBtn.innerText = 'Yes'
        deleteBtnDiv.appendChild(yesBtn)
        const overlayDiv = document.createElement('div')
        overlayDiv.id = 'overlay'
        mainBody.appendChild(overlayDiv)
    }

    changeList(name) {
        const newList = new TaskList(name)
        newList.clearScreen();
        newList.loadTaskList();
    }

    loadNewLists() {
        const newTaskLists = JSON.parse(localStorage.getItem('newTaskLists')) || [];
        const newBtnDiv = document.getElementById('new-button-container');
        const addNewBtn = document.getElementById('add-new-list')
        while (newBtnDiv.firstChild != addNewBtn) {
            newBtnDiv.firstChild.remove();
        }
        newTaskLists.forEach(tasklist => {
            this.createNewListBtn(tasklist);
        })
    }

    deleteNewList(name) {
       
        const newTaskLists = JSON.parse(localStorage.getItem('newTaskLists')) || [];

        const arrIndex = newTaskLists.indexOf(name)

        newTaskLists.splice(arrIndex, 1)

        localStorage.setItem('newTaskLists', JSON.stringify(newTaskLists))

        localStorage.removeItem(name)

        this.loadNewLists();

    }

    changeToCompletedTasks() {
        const createCompletedTasks = new CompletedTaskList('completedTasks')
        createCompletedTasks.clearScreen();
        createCompletedTasks.loadTaskList();
    }

    deleteEverything () {
        const newTaskLists = JSON.parse(localStorage.getItem('newTaskLists')) || [];
        localStorage.removeItem('main')
        newTaskLists.forEach(list => {
            localStorage.removeItem(list)
        })
        localStorage.removeItem('newTaskLists')
        localStorage.removeItem('completedTasks')
    }

    createDeleteModal() {
        const mainBody = document.querySelector('.main-body');
        const modalDiv = document.createElement('div')
        modalDiv.classList.add('delete-modal')
        modalDiv.id = 'delete-modal'
        mainBody.appendChild(modalDiv)
        const modalHeader = document.createElement('div')
        modalHeader.classList.add('modal-header')
        modalDiv.appendChild(modalHeader)
        const modalTitle = document.createElement('div')
        modalTitle.classList.add('modal-title')
        modalTitle.innerText = 'Delete All Tasks'
        modalHeader.appendChild(modalTitle)
        const modalCloseButton = document.createElement('button')
        modalCloseButton.classList.add('modal-close-button')
        modalCloseButton.id = 'modal-close-button'
        modalCloseButton.textContent = '✖'
        modalHeader.appendChild(modalCloseButton)
        const modalBody = document.createElement('div')
        modalBody.classList.add('delete-modal-body')
        modalDiv.appendChild(modalBody)
        const deleteModalText = document.createElement('h3')
        deleteModalText.innerText = 'Are you sure you want to delete all tasks, lists, and associated information from your browser?'
        modalBody.appendChild(deleteModalText)
        const deleteBtnDiv = document.createElement('div')
        deleteBtnDiv.classList.add('delete-btn-div')
        modalBody.appendChild(deleteBtnDiv)
        const noBtn = document.createElement('button')
        noBtn.id = 'delete-all-no-btn'
        noBtn.innerText = 'No'
        deleteBtnDiv.appendChild(noBtn)
        const yesBtn = document.createElement('button')
        yesBtn.id = 'delete-all-confirm-btn'
        yesBtn.innerText = 'Yes'
        deleteBtnDiv.appendChild(yesBtn)
        const overlayDiv = document.createElement('div')
        overlayDiv.id = 'overlay'
        mainBody.appendChild(overlayDiv)
    }

    //FIXME getCUrrentDate and getAllTasks throw typeerror. Same with below.
    parseDatesToday() {
        const currentTime = parseISO(getCurrentDate());
        let today = getAllTasks().filter((task) => {
            const difference = differenceInHours(parseISO(task.date), currentTime)
            return difference <= 24
        }) || []
        if (today.length > 0) {
            today = today.sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)))
        }
        localStorage.setItem('today', JSON.stringify(today));
        changeList('today')
    }

    parseDatesWeek() {
        const currentTime = parseISO(getCurrentDate());
        let week = getAllTasks().filter((task) => {
            const difference = differenceInCalendarDays(parseISO(task.date), currentTime)
            return difference <= 7
        }) || []
        if (week.length > 0) {
            week = week.sort((a, b) => compareAsc(parseISO(a.date), parseISO(b.date)))
        }
        localStorage.setItem('week', JSON.stringify(week));
        changeList('week')
    }

    // getCurrentDate() {
    //     const currentDate = new Date()
    //     const formattedCurrentDate = currentDate.toISOString();
    //     return formattedCurrentDate
    // }

    // getAllTasks() {
    //     const allTasks = [];
    //     const mainTasks = JSON.parse(localStorage.getItem('main'));
    //     allTasks.push(...mainTasks);
    //     const newLists = JSON.parse(localStorage.getItem('newTaskLists')) || [];
    //     if (newLists.length > 0) {
    //         newLists.forEach((list) => {
    //             const listTasks = JSON.parse(localStorage.getItem(list))
    //             allTasks.push(...listTasks);
    //         })
    //     }
    //     console.log(allTasks)
    //     return allTasks
    // }
    
}

//TODO: figure out why this.[below functions] won't work in above class
function getCurrentDate() {
    const currentDate = new Date()
    const formattedCurrentDate = currentDate.toISOString();
    return formattedCurrentDate
}

function getAllTasks() {
    const allTasks = [];
    const mainTasks = JSON.parse(localStorage.getItem('main'));
    allTasks.push(...mainTasks);
    const newLists = JSON.parse(localStorage.getItem('newTaskLists')) || [];
    if (newLists.length > 0) {
        newLists.forEach((list) => {
            const listTasks = JSON.parse(localStorage.getItem(list))
            allTasks.push(...listTasks);
        })
    }
    return allTasks
}

function changeList(name) {
    const newList = new TaskList(name)
    newList.clearScreen();
    newList.loadTaskList();
}
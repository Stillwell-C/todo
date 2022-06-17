import { makeTaskModal, closeModal } from "./utils.js";
import { format, parseISO } from 'date-fns'
//Images
import gripLines from './assets/grip-lines-solid-svgrepo-com.svg'
import infoButton from './assets/info-svgrepo-com.svg'
import editButton from './assets/edit-svgrepo-com.svg'
import lowFlag from './assets/flag-svgrepo-com-low.svg'
import mediumFlag from './assets/flag-svgrepo-com-medium.svg'
import highFlag from './assets/flag-svgrepo-com-high.svg'
import trashButton from './assets/trash-svgrepo-com.svg'

export default class TaskList {
    constructor(listname) {
        this.name = listname;
        this.root = document.getElementById('content-container');

        this.loadTaskList()
    }

    pageContentGenerator() {
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('task-container');
        taskContainer.id = 'task-container';
        this.root.appendChild(taskContainer);
        const headerTitleDiv = document.createElement('div');
        headerTitleDiv.classList.add('header-title-div')
        taskContainer.appendChild(headerTitleDiv)
        const headerTitle = document.createElement('h2');
        if (this.name == 'main') {
            headerTitle.innerText = 'Main List';
        } else if (this.name == 'completedTasks') {
            headerTitle.innerText = 'Completed Tasks'
        } else if (this.name == 'week') {
            headerTitle.innerText = 'This Week\'s Tasks'
        } else if (this.name === 'today') {
            headerTitle.innerText = 'Today\'s Tasks'
        } else {
            headerTitle.innerText = this.name;
        }
        headerTitle.id = 'task-container-header'
        headerTitleDiv.appendChild(headerTitle);
    }

    taskLineGenerator({title, details, date, priority, list, completed}) {
        const taskContainer = document.getElementById('task-container');
        const taskLine = document.createElement('div')
        taskLine.classList.add('task-line')
        taskContainer.appendChild(taskLine)

        const taskLineTop = document.createElement('div')
        taskLineTop.classList.add('task-line-top')
        taskLine.appendChild(taskLineTop)
        const taskLineLeft = document.createElement('div')
        taskLineLeft.classList.add('task-line-left')
        taskLineTop.appendChild(taskLineLeft)
        const taskLineCheckbox = document.createElement('input')
        taskLineCheckbox.type = "checkbox"
        taskLineCheckbox.classList.add('task-check')
        completed === false ? 
            taskLineCheckbox.checked = false :
            taskLineCheckbox.checked = true
        taskLineLeft.appendChild(taskLineCheckbox)
        const taskLineTitle = document.createElement('p')
        taskLineTitle.innerText = `${title}`
        taskLineTitle.classList.add('task-title')
        taskLineLeft.appendChild(taskLineTitle)
        const taskLineRight = document.createElement('div')
        taskLineRight.classList.add('task-line-right')
        taskLineTop.appendChild(taskLineRight)
        
        const moveAnchor = document.createElement('a')
        taskLineRight.appendChild(moveAnchor)
        moveAnchor.id = 'task-change-position-btn'
        const moveImg = document.createElement('img')
        moveImg.src = gripLines
        moveImg.alt = 'Change task position'
        moveAnchor.appendChild(moveImg)
        const infoAnchor = document.createElement('a')
        taskLineRight.appendChild(infoAnchor)
        infoAnchor.id = 'task-info-btn'
        const infoImg = document.createElement('img')
        infoImg.src = infoButton
        infoImg.alt = 'Task information button'
        infoAnchor.appendChild(infoImg)
        const editAnchor = document.createElement('a')
        taskLineRight.appendChild(editAnchor)
        editAnchor.id = 'task-edit-btn'
        const editImg = document.createElement('img')
        editImg.src = editButton
        editImg.alt = 'Edit task button'
        editAnchor.appendChild(editImg)
        const priorityAnchor = document.createElement('a')
        taskLineRight.appendChild(priorityAnchor)
        priorityAnchor.id = 'task-priority-btn'
        const priorityImg = document.createElement('img')
        switch (priority) {
            case 'low':
                priorityImg.src = lowFlag;
                priorityAnchor.classList.add('low-priority');
                break;
            case 'medium':
                priorityImg.src = mediumFlag;
                priorityAnchor.classList.add('medium-priority');
                break;
            case 'high':
                priorityImg.src = highFlag;
                priorityAnchor.classList.add('high-priority');
                break;
        }
        priorityImg.alt = 'Change task priority button'
        priorityAnchor.appendChild(priorityImg)
        const deleteAnchor = document.createElement('a')
        taskLineRight.appendChild(deleteAnchor)
        deleteAnchor.id = 'task-delete-btn'
        const deleteImg = document.createElement('img')
        deleteImg.src = trashButton
        deleteImg.alt = 'Delete task button'
        deleteAnchor.appendChild(deleteImg)
        

        const taskLineBottom = document.createElement('div')
        taskLineBottom.classList.add('task-line-bottom')
        taskLine.appendChild(taskLineBottom)
        const tlBtmLeft = document.createElement('div')
        tlBtmLeft.classList.add('tl-btm-left')
        taskLineBottom.appendChild(tlBtmLeft)
        
        const tlBtmTitleDiv1 = document.createElement('div')
        tlBtmLeft.appendChild(tlBtmTitleDiv1)
        const tlBtmTitleSpan1 = document.createElement('span')
        tlBtmTitleSpan1.classList.add('tl-btm-title')
        tlBtmTitleSpan1.innerText = 'Title: '
        tlBtmTitleDiv1.appendChild(tlBtmTitleSpan1)
        const tbDetails1 = document.createElement('span')
        tbDetails1.classList.add('tb-details')
        tbDetails1.innerText = title
        tlBtmTitleDiv1.appendChild(tbDetails1)

        const tlBtmTitleDiv2 = document.createElement('div')
        tlBtmLeft.appendChild(tlBtmTitleDiv2)
        const tlBtmTitleSpan2 = document.createElement('span')
        tlBtmTitleSpan2.classList.add('tl-btm-title')
        tlBtmTitleSpan2.innerText = 'Due date: '
        tlBtmTitleDiv2.appendChild(tlBtmTitleSpan2)
        const tbDetails2 = document.createElement('span')
        tbDetails2.classList.add('tb-details')
        tbDetails2.classList.add('tb-due-date')
        tbDetails2.dataset.date = date
        tbDetails2.innerText = format(parseISO(date), 'PPp')
        tlBtmTitleDiv2.appendChild(tbDetails2)

        const tlBtmTitleDiv3 = document.createElement('div')
        tlBtmLeft.appendChild(tlBtmTitleDiv3)
        const tlBtmTitleSpan3 = document.createElement('span')
        tlBtmTitleSpan3.classList.add('tl-btm-title')
        tlBtmTitleSpan3.innerText = 'Priority: '
        tlBtmTitleDiv3.appendChild(tlBtmTitleSpan3)
        const tbDetails3 = document.createElement('span')
        tbDetails3.classList.add('tb-details')
        tbDetails3.classList.add('tb-priority')
        tbDetails3.innerText = priority
        tlBtmTitleDiv3.appendChild(tbDetails3)

        const tlBtmRight = document.createElement('div')
        tlBtmRight.classList.add('tl-btm-right')
        taskLineBottom.appendChild(tlBtmRight)

        const tlBtmTitleDiv4 = document.createElement('div')
        tlBtmRight.appendChild(tlBtmTitleDiv4)
        const tlBtmTitleSpan4 = document.createElement('span')
        tlBtmTitleSpan4.classList.add('tl-btm-title')
        tlBtmTitleSpan4.innerText = 'List: '
        tlBtmTitleDiv4.appendChild(tlBtmTitleSpan4)
        const tbDetails4 = document.createElement('span')
        tbDetails4.classList.add('tb-details')
        tbDetails4.classList.add('tb-list')
        tbDetails4.innerText = list
        tlBtmTitleDiv4.appendChild(tbDetails4)

        const tlBtmTitleDiv5 = document.createElement('div')
        tlBtmRight.appendChild(tlBtmTitleDiv5)
        const tlBtmTitleSpan5 = document.createElement('span')
        tlBtmTitleSpan5.classList.add('tl-btm-title')
        tlBtmTitleSpan5.innerText = 'Description: '
        tlBtmTitleDiv5.appendChild(tlBtmTitleSpan5)
        const tbDetails5 = document.createElement('span')
        tbDetails5.classList.add('tb-details')
        tbDetails5.classList.add('tb-description')
        tbDetails5.innerText = details
        tlBtmTitleDiv5.appendChild(tbDetails5)
    }

    loadTaskList() {

        this.clearScreen()

        this.pageContentGenerator()

        const tasklist = JSON.parse(localStorage.getItem(this.name)) || []

        const dragContainer = this.root.querySelector('#task-container')
        
        dragContainer.addEventListener('dragover', (e) => {
            e.preventDefault()
            const draggable = document.querySelector('.dragging')
            const afterElement = this.getDragAfterElement(dragContainer, e.clientY)
            if (afterElement == null) {
                dragContainer.appendChild(draggable)
            } else {
                dragContainer.insertBefore(draggable, afterElement)
            }
            
        })

        tasklist.forEach(taskline => {
            this.addTask(taskline);
        })
    }

    addTask(taskline) {

        this.taskLineGenerator(taskline)

        const lastTaskLine = document.querySelector('.task-line:last-of-type')

        //Event listeners
        //task line right side buttons
        lastTaskLine.querySelector('#task-info-btn').addEventListener('click', () => {
            const children = Array.from(lastTaskLine.children);
            this.showBelowContent(children);
        })

        lastTaskLine.querySelector('#task-delete-btn').addEventListener('click', () => {
            this.deleteTask(lastTaskLine)
        })

        lastTaskLine.querySelector('#task-edit-btn').addEventListener('click', () => {
            this.editTaskClick(lastTaskLine)
        })

        lastTaskLine.querySelector('#task-priority-btn').addEventListener('click', () => {
            this.changePriorityClick(lastTaskLine);
        })

        //checkbox
        lastTaskLine.querySelector('.task-check').addEventListener('click', () => {
            this.completedTaskClick(lastTaskLine)
        })

        //dragging event listeners
        lastTaskLine.querySelector('#task-change-position-btn').addEventListener('dragstart', () => {
            lastTaskLine.classList.add('dragging')
        })

        lastTaskLine.querySelector('#task-change-position-btn').addEventListener('dragend', () => {
            lastTaskLine.classList.remove('dragging')
            this.save()
        })

        

    }

    getDragAfterElement(dragContainer, y) {
        const draggableElements = [...dragContainer.querySelectorAll('.task-line:not(.dragging)')]

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            if (offset < 0 && offset > closest.offset) {
                return {offset: offset , element: child}
            } else {
                return closest
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element
    }

    showBelowContent(children) {
        children[1].classList.contains('visible') ?
        children[1].classList.remove('visible') :
        children[1].classList.add('visible')
    }

    deleteTask(taskLine) {
        taskLine.remove();
        this.save();
    }

    editTaskClick(taskLine) {

        makeTaskModal('Edit task')

        const taskTitle = taskLine.querySelector('.task-title');
        const taskLocation = taskLine.querySelector('.tb-list')
        const taskDueDate = taskLine.querySelector('.tb-due-date')
        const taskDetails = taskLine.querySelector('.tb-description')
        const taskPriority = taskLine.querySelector('.tb-priority')

        //make modal show up
        const overlay = document.getElementById('overlay')
        const modal = document.getElementById('task-input-modal')
        modal.classList.add('active')
        overlay.classList.add('active')

        const formTitle = document.getElementById('form-title')
        const formDescription = document.getElementById('form-description')
        const formDate = document.getElementById('form-date')
        const formPriority = document.getElementById('form-priority')
        const formList = document.getElementById('form-list')
        const submitBtn = document.getElementById('submit-btn')

        formTitle.value = taskTitle.innerText
        formDescription.value = taskDetails.innerText
        formDate.value = taskDueDate.dataset.date
        formPriority.value = taskPriority.innerText
        formList.value = taskLocation.innerText

        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            taskTitle.innerText = formTitle.value;
            taskDetails.innerText = formDescription.value;
            taskDueDate.innerText = format(parseISO(formDate.value), 'PPp');
            taskDueDate.dataset.date = formDate.value;
            taskPriority.innerText = formPriority.value;
            taskLocation.innerText = formList.value;
            if (formList.value != this.name) {
                this.changeList();
            }
            closeModal('task-input-modal');
            this.save();
            this.clearScreen();
            this.loadTaskList();
        })

        document.getElementById('modal-close-button').addEventListener('click', () => {
            closeModal('task-input-modal')
        })
    }

    clearScreen() {
        let taskContainerDiv = document.getElementById('task-container');

        if (taskContainerDiv) {
            taskContainerDiv.remove()
        }
    }

    completedTaskClick(taskLine) {

        this.save()

        const filteredData = this.scrubData().filter((task) => task.completed === true)

        const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
        filteredData.forEach(item => completedTasks.push(item))
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks))

        this.deleteTask(taskLine);
    }

    changeList() {
        const moveListData = this.scrubData().filter((task) => task.list != this.name);

        moveListData.forEach(item => {
            const newList = JSON.parse(localStorage.getItem(item.list)) || [];
            newList.push(item);
            localStorage.setItem(item.list, JSON.stringify(newList))
        })
    }

    scrubData() {
       
        const data = this.getTaskLines().map(taskline => {
            
            return {
                title: taskline.querySelector('.task-title').innerText,
                list: taskline.querySelector('.tb-list').innerText,
                date: taskline.querySelector('.tb-due-date').dataset.date,
                details: taskline.querySelector('.tb-description').innerText,
                priority: taskline.querySelector('.tb-priority').innerText,
                completed: taskline.querySelector('.task-check').checked
            }     
        })
        
        return data
    }

    scrubDataFromLine(taskLine) {
        const data = (taskLine) => {
            return {
                title: taskLine.querySelector('.task-title').innerText,
                list: taskLine.querySelector('.tb-list').innerText,
                date: taskLine.querySelector('.tb-due-date').dataset.date,
                details: taskLine.querySelector('.tb-description').innerText,
                priority: taskLine.querySelector('.tb-priority').innerText,
                completed: taskLine.querySelector('.task-check').checked
            }
        }

        return data
    }

    getTaskLines() {
        return Array.from(this.root.querySelectorAll('.task-line'));
    }

    save() {

        const data = this.scrubData()

        const filteredData = data.filter((task) => task.completed != true && task.list === this.name);

        localStorage.setItem(this.name, JSON.stringify(filteredData));

    }
}
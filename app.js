// DEFINE THE VARIABLES
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const taskInput = document.getElementById('task');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');

// LOAD ALL EVENT LISTENERS
loadEventListeners();

// LOAD ALL EVENT LISTENERS

function loadEventListeners() {
    // DOM LOAD EVENT
    document.addEventListener('DOMContentLoaded', getTasks);
    // ADD TASK EVENT
    form.addEventListener('submit', addTask);
    // REMOVE TASK EVENT
    taskList.addEventListener('click', removeTask);
    // CLEAR TASK EVENT
    clearBtn.addEventListener('click', clearTasks);
    // FILTER TASKS
    filter.addEventListener('keyup', filterTasks);
}

// GET TASK FROM LOCAL STORAGE

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // CREATE LI ELEMENT
        const li = document.createElement('li');

        // ADD A CLASS TO THE LI
        li.className = 'collection-item';

        // CREATE TEXT NODE AND APPEND
        li.appendChild(document.createTextNode(task));

        // CREATE LINK ELEMENT
        const link = document.createElement('a');

        // ADD CLASS TO THE LINK
        link.className = 'delete-item secondary-item';

        // ADD ICON TO THE LINK
        link.innerHTML = '<i class="fa fa-times"></i>';

        // APPEND THE LINK TO LI
        li.appendChild(link);

        // APPEND THE LI TO UL
        taskList.appendChild(li);
    })

}

// ADD TASK

function addTask(e) {
    if (taskInput.value === '') {
        alert('add a task');
    } else if (taskInput !== '') {
        // CREATE LI ELEMENT
        const li = document.createElement('li');

        // ADD A CLASS TO THE LI
        li.className = 'collection-item';

        // CREATE TEXT NODE AND APPEND
        li.appendChild(document.createTextNode(taskInput.value));

        // CREATE LINK ELEMENT
        const link = document.createElement('a');

        // ADD CLASS TO THE LINK
        link.className = 'delete-item secondary-item';

        // ADD ICON TO THE LINK
        link.innerHTML = '<i class="fa fa-times"></i>';

        // APPEND THE LINK TO LI
        li.appendChild(link);

        // APPEND THE LI TO UL
        taskList.appendChild(li);

        storeTaskInLocalStorage(taskInput.value);

        // CLEAR INPUT
        taskInput.value = '';
    }

    e.preventDefault();
}

// STORE TASK IN LOCAL STORAGE

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task)

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// REMOVE TASK

function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// REMOVE FROM LOCAL STORAGE

function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// CLEAR TASKS

function clearTasks() {
    taskList.innerHTML = '';

    // CLEAR TASKS FROM LOCAL STORAGE
    localStorage.clear();

    // while (taskList.firstChild) {
    //     taskList.firstChild.remove();
    // }
}

// FILTER TASKS

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}
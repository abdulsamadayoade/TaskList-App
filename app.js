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
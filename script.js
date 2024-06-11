const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const tasksList = document.getElementById('tasks');
const completedTasksList = document.getElementById('completed-tasks');

let tasks = [];
let completedTasks = [];

addTaskBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
        const taskObj = {
            id: Date.now(),
            task: task,
            completed: false,
            addedAt: new Date().toLocaleString(),
            completedAt: null
        };
        tasks.push(taskObj);
        renderTasks();
        taskInput.value = '';
    }
});

tasksList.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        const taskId = e.target.parentNode.id;
        const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = true;
            tasks[taskIndex].completedAt = new Date().toLocaleString();
            completedTasks.push(tasks.splice(taskIndex, 1)[0]);
            renderTasks();
            renderCompletedTasks();
        }
    }
});

function renderTasks() {
    tasksList.innerHTML = '';
    tasks.forEach((task) => {
        const taskHTML = `
            <li id="${task.id}">
                <span>${task.task}</span>
                <button>Complete</button>
                <span>Added at: ${task.addedAt}</span>
            </li>
        `;
        tasksList.innerHTML += taskHTML;
    });
}

function renderCompletedTasks() {
    completedTasksList.innerHTML = '';
    completedTasks.forEach((task) => {
        const taskHTML = `
            <li id="${task.id}">
                <span>${task.task}</span>
                <span>Completed at: ${task.completedAt}</span>
            </li>
        `;
        completedTasksList.innerHTML += taskHTML;
    });
}

renderTasks();
renderCompletedTasks();
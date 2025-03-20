const taskInput = document.querySelector('.task-input');
const addButton = document.querySelector('.add-button');
const clearButton = document.querySelector('.clear-button');
const backlogTasks = document.querySelector('.backlog .tasks');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = document.createElement('div');
        task.className = 'task';
        task.draggable = true;
        task.textContent = taskText;
        task.setAttribute('ondragstart', 'drag(event)');
        backlogTasks.appendChild(task);
        taskInput.value = '';
    }
}

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.textContent);
    ev.target.classList.add('dragging');
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const draggingElement = document.querySelector('.dragging');
    
    if (draggingElement) {
        const newTask = document.createElement('div');
        newTask.className = 'task';
        newTask.draggable = true;
        newTask.textContent = data;
        newTask.setAttribute('ondragstart', 'drag(event)');
        
        ev.target.closest('.tasks').appendChild(newTask);
        draggingElement.remove();
    }
}

clearButton.addEventListener('click', () => {
    const trashTasks = document.querySelector('.trash .tasks');
    trashTasks.innerHTML = '';
}); 
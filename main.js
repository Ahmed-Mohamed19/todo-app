let input = document.querySelector(".add-task input");
let addBtn = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let deleteAllButton = document.querySelector(".delete-all"); 
let finishAllButton = document.querySelector(".finish-all"); 
let createdElements = [];
const savedTasks = localStorage.getItem('tasks');
const tasks = savedTasks ? JSON.parse(savedTasks) : [];

window.onload = function () {
    input.focus();
}

addBtn.onclick = function ()  {
    if (input.value === "") {
        Swal.fire({
            title: 'Error!',
            text: 'Please input a task title!',
            icon: 'error',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'green',
          })
    } else {
        let noTasksMsg = document.querySelector(".no-tasks-message");
        if (document.body.contains(document.querySelector(".no-tasks-message"))) {
            noTasksMsg.remove();
        }
        const taskDescription = input.value;
        if (!taskExists(taskDescription)) {
            addTask(taskDescription);
            input.value = '';
            displayTasks(); 
            input.focus();
            calculateTasks();
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Task already exists!',
                icon: 'error',
                confirmButtonText: 'Close',
                confirmButtonColor: 'red',
              });
            input.value = '';
        }
    }
};

displayTasks();

deleteAllButton.addEventListener("click", function () {
    createdElements.forEach(function (element) {
      element.remove();
    });
    tasks.length = 0;
    localStorage.removeItem('tasks');
    displayTasks();
    if (!(document.body.contains(document.querySelector(".no-tasks-message")))) {
        createNoTasks();
    }
    createdElements = [];
});

finishAllButton.addEventListener("click", function () {
    createdElements.forEach(function (element) {
      element.classList.add("finished");
    });
});

document.addEventListener('click', function (e) {
    if (e.target.classList.contains('task-box')) {
        e.target.classList.toggle("finished")
    }
    calculateTasks();
})

function saveTasksToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(description) {
    tasks.push({ id: tasks.length + 1, description });
    saveTasksToLocalStorage();
}

function taskExists(description) {
    return tasks.some(task => task.description.toLowerCase() === description.toLowerCase());
  }

function deleteTask(index) {
    tasks.splice(index, 1); // Remove the task from the array
    saveTasksToLocalStorage(); // Update local storage
    displayTasks(); // Update the displayed task list
}

function displayTasks() {
    tasksContainer.innerHTML = '';
    for (let i = 0; i < tasks.length; i++) {
        const mainSpan = document.createElement("span");
        const deleteElement = document.createElement("span");
        const text = document.createTextNode(`Task: ${tasks[i].description}`);
        const deleteText = document.createTextNode("Delete");
        mainSpan.appendChild(text);
        mainSpan.className = "task-box"
        deleteElement.appendChild(deleteText);
        deleteElement.className = "delete";
        mainSpan.appendChild(deleteElement);
        tasksContainer.appendChild(mainSpan);
        createdElements.push(mainSpan);
        deleteElement.addEventListener('click', function() {
            deleteTask(i);
            if(tasksContainer.childElementCount == 0) {
            createNoTasks();
            }
          });
    }
}

function createNoTasks () {
    let msgSpan = document.createElement("span");
    let msgText = document.createTextNode("No tasks to show");
    msgSpan.appendChild(msgText);
    msgSpan.className = "no-tasks-message"
    tasksContainer.appendChild(msgSpan);
}

function calculateTasks() {
    tasksCount.innerHTML = document.querySelectorAll('.tasks-content .task-box').length;
    tasksCompleted.innerHTML = document.querySelectorAll('.tasks-content .finished').length;
}
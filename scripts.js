document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskList = document.getElementById("task-list");

    if (taskInput.value.trim()) {
        const listItem = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.textContent = taskInput.value;

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.classList.add("check");
        checkBox.addEventListener("change", () => {
            toggleTask(taskText, checkBox);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", deleteTask);

        listItem.appendChild(checkBox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
        saveTasks();

        taskInput.value = "";
    }
}

function toggleTask(taskText, checkBox) {
    taskText.classList.toggle("completed", checkBox.checked);
    saveTasks();
}

function deleteTask(event) {
    const listItem = event.target.parentElement;
    listItem.remove();
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(task => {
        tasks.push({
            text: task.querySelector("span").textContent,
            completed: task.querySelector("span").classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("task-list");

    tasks.forEach(task => {
        const listItem = document.createElement("li");
        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.classList.add("completed");
        }

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.classList.add("check");
        checkBox.checked = task.completed;
        checkBox.addEventListener("change", () => {
            toggleTask(taskText, checkBox);
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", deleteTask);

        listItem.appendChild(checkBox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
}

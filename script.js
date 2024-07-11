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
        taskText.addEventListener("click", toggleTask);

        const checkButton = document.createElement("button");
        checkButton.textContent = "✅";
        checkButton.classList.add("check");
        checkButton.addEventListener("click", toggleTask);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", deleteTask);

        listItem.appendChild(taskText);
        listItem.appendChild(checkButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
        saveTasks();

        taskInput.value = "";
    }
}

function toggleTask(event) {
    const taskText = event.target.parentElement.querySelector("span");
    taskText.classList.toggle("completed");
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
        taskText.addEventListener("click", toggleTask);

        const checkButton = document.createElement("button");
        checkButton.textContent = "✅";
        checkButton.classList.add("check");
        checkButton.addEventListener("click", toggleTask);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", deleteTask);

        listItem.appendChild(taskText);
        listItem.appendChild(checkButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    });
}

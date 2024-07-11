document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById("new-task");
    const taskList = document.getElementById("task-list");

    if (taskInput.value.trim()) {
        const listItem = document.createElement("li");
        listItem.textContent = taskInput.value;
        listItem.addEventListener("click", toggleTask);

        taskList.appendChild(listItem);
        saveTasks();

        taskInput.value = "";
    }
}

function toggleTask(event) {
    const listItem = event.target;
    listItem.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(task => {
        tasks.push({
            text: task.textContent,
            completed: task.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("task-list");

    tasks.forEach(task => {
        const listItem = document.createElement("li");
        listItem.textContent = task.text;
        if (task.completed) {
            listItem.classList.add("completed");
        }
        listItem.addEventListener("click", toggleTask);

        taskList.appendChild(listItem);
    });
}

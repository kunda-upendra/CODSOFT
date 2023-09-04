document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    let editingIndex = -1;

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // function renderTasks() {
    //     taskList.innerHTML = '';
    //     tasks.forEach((task, index) => {
    //         const li = document.createElement('li');
    //         li.innerHTML = `
    //             <span>${task}</span>
    //             <button onclick="editTask(${index})">Edit</button>
    //             <button onclick="deleteTask(${index})">Delete</button>
    //         `;
    //         taskList.appendChild(li);
    //     });
    // }
    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <div class="action-buttons">
                    <button class="edit-button" onclick="editTask(${index})">Edit</button>
                    <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }


    function addTask() {
        const newTask = taskInput.value.trim();
        if (newTask !== '') {
            if (editingIndex === -1) {
                tasks.push(newTask);
            } else {
                tasks[editingIndex] = newTask;
                editingIndex = -1;
            }

            saveTasks();
            renderTasks();
            taskInput.value = '';
            addTaskButton.innerText = 'Add Task';
        }
    }

    function editTask(index) {
        taskInput.value = tasks[index];
        editingIndex = index;
        addTaskButton.innerText = 'Save';
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }



    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();

    // Expose deleteTask function globally
    window.deleteTask = deleteTask;
    window.editTask = editTask;
});



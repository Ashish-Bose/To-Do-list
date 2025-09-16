const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        addTaskToList(task.text, task.completed);
    });
}

// Function to add a task to the list
function addTaskToList(text, completed = false) {
    const li = document.createElement('li');
    li.textContent = text;  // Add emojis here if you want, e.g., '🚀 ' + text

    // Checkbox for completing
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        saveTasks();
    });
    li.prepend(checkbox);  // Add checkbox at the start

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });
    li.appendChild(deleteBtn);

    if (completed) {
        li.classList.add('completed');
    }

    taskList.appendChild(li);
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        // Clean up text: Remove checkbox and button text
        const cleanText = li.innerText.replace('☐ ', '').replace('☑ ', '').replace('Delete', '').trim();
        tasks.push({
            text: cleanText,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add task on button click
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTaskToList(taskText);
        saveTasks();
        taskInput.value = '';  // Clear input
    }
});

// Also add on Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});

// Load tasks when page loads
loadTasks();

const STUDENT_ID = "3054195";
const API_KEY = "Itcheui2tB58SlUGe8rrP8mskudGsNDT9nfKKG9S";
let taskArray = [];

// Gets/displays users tasks asynchronously with setting submit button Listener.
const init = () => {
    getTasks();

    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", addTask);
}

// Maps the task API response to the global array and calls to displayTasks.
const getTasks = () => {
    const xhr = new XMLHttpRequest();
    const url = `https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks/${STUDENT_ID}`;
    removeErrorMessage();

    xhr.open("get", url);
    xhr.setRequestHeader('x-api-key', API_KEY);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.responseText !== null) {
            const data = JSON.parse(xhr.responseText);

            if (Array.isArray(data.Items)) {
                taskArray = data.Items.map(item => item.Description);
                displayTasks();
            } else {
                createErrorMessage("Error/Problem getting tasks");
            }
        }
    }

    xhr.send(null);
}

// Posts a json to the task API and updates global array, adding a task.
const addTask = () => {
    const task = document.getElementById("task").value || "";
    const xhr = new XMLHttpRequest();
    const url = `https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks`;
    const postParam = {
        'StudentId': STUDENT_ID,
        'Description': task
    }
    removeErrorMessage();

    if (task.length !== 0) {
        xhr.open("post", url);

        xhr.setRequestHeader('x-api-key', API_KEY);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (!taskArray.includes(task)) {
                    taskArray.push(task);
                } else {
                    createErrorMessage("That is already a task");
                }
                
                displayTasks();
            }
        };

        xhr.send(JSON.stringify(postParam));    
    } else {
        createErrorMessage("Please enter a task");
    }
}

// Sends a delete json to the task API and updates global array, removing the task.
const deleteTask = event => {
    const toDeleteTask =  event.currentTarget.getAttribute("task") || "";
    const xhr = new XMLHttpRequest();
    const url = `https://ghu8xhzgfe.execute-api.us-east-1.amazonaws.com/tasks`;
    const postParam = {
        'StudentId': STUDENT_ID,
        'Description': toDeleteTask
    }
    removeErrorMessage();

    if (toDeleteTask.length !== 0) {
        xhr.open("delete", url);
        xhr.setRequestHeader('x-api-key', API_KEY);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                taskArray.splice(taskArray.indexOf(toDeleteTask), 1)
                displayTasks();
            }
        };

        xhr.send(JSON.stringify(postParam));
    } else {
        createErrorMessage("Problem deleting task");
    }
}

// Displays all task from the global array in a table, and adds listener to delete buttons.
const displayTasks = () => {
    const outputDiv = document.getElementById("taskOutput");
    let output = `<table>`;
    for (const task of taskArray) {
        output += `
            <tr class='border-spacing-px border border-slate-600'>
                <th class='py-1'>
                    <button class='px-4 py-2 text-red-500' delete_button='true' task='${task}'>X</button>
                </th>
                <td class='px-2 py-1'>${task}</td>
            </tr>
        `;
    }
    output += `</table>`;
    outputDiv.innerHTML = output;

    const deleteButtons = document.querySelectorAll("[delete_button='true']");
    if (deleteButtons.length !== 0) {
        deleteButtons.forEach(deleteButton => deleteButton.addEventListener("click", deleteTask));
    }
}

// Inserts an error message for any problems with the tasks.
const createErrorMessage = errorMessage => {
    const inputDiv = document.getElementById("taskInput");
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("text-red-500", "error-message", "text-center");
    errorContainer.textContent = errorMessage;
    inputDiv.insertBefore(errorContainer, inputDiv.firstChild);
}

// Removes Error Message
const removeErrorMessage = () => {
    const errorOutput = document.querySelector(".error-message");
    if (errorOutput) {
        errorOutput.remove();
    }
};

window.onload = init;
const API_URL = "http://localhost:3333/api/tasks";
let taskArray = [];

// Gets/displays users tasks asynchronously with setting submit button Listener.
const init = () => {
    getTasks();

    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", addTask);

    const searchButton = document.getElementById("submitSearchButton");
    searchButton.addEventListener("click", searchTasksById);
}

// Maps the task API response to the global array and calls to displayTasks.
const getTasks = () => {
    removeErrorMessage();
    fetch(API_URL)
        .then(taskResponse => taskResponse.json())
        .catch(err => createErrorMessage(`Problem connecting/getting to task API: ${err}`))
        .then(jsonTaskResponse => {
            if (jsonTaskResponse) {
                taskArray = jsonTaskResponse.map(task => ({id: task.id, description: task.description}));
                displayTasks();
            }
        }).catch(err => createErrorMessage(`Problem processing to task API response: ${err}`));
}

// Uses the search by id url in the task API to query and generate a response back
const searchTasksById = () => {
    removeErrorMessage();
    const taskSearch = document.getElementById("taskSearch").value || "";
    if (!taskSearch || !/\d/.test(taskSearch)) {
        createErrorMessage("Please enter a number to search by Id.");
        return;
    }
    const url = `${API_URL}/${taskSearch}`;

    fetch(url)
        .then(taskResponse => taskResponse.json())
        .catch(err => createErrorMessage(`Problem connecting/getting to task API: ${err}`))
        .then(jsonTaskResponse => {
            if (jsonTaskResponse) {
                taskArray = jsonTaskResponse.map(task => ({id: task.id, description: task.description}));
                displayTasks();
            }
        }).catch(err => createErrorMessage(`Problem processing to task API response: ${err}`));
}


// Posts a json to the task API and updates global array, adding a task.
const addTask = () => {
    const taskDescription = document.getElementById("task").value || "";
    const taskId = document.getElementById("taskId").value || "";
    const url = `${API_URL}/${taskId}/${taskDescription}`;
    const params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': taskId, 'description': task}) 
    };

    removeErrorMessage();
    if (!taskDescription || !/^[A-Za-z]+( [A-Za-z]+)*$/.test(taskDescription)
            || taskArray.some(task => task.description === taskDescription)) {
        createErrorMessage("Please enter a valid task description with letters.");
        return;
    }
    if (!taskId || !/\d/.test(taskId) || taskArray.some(task => task.id === taskId)) {
        createErrorMessage("Please enter a valid task Id that is unique and a number.");
        return;
    }

    fetch(url, params)
        .then(taskResponse => taskResponse.json())
        .catch(err => createErrorMessage(`Problem connecting/getting to task API: ${err}`))
        .then(jsonTaskResponse => {
            if (jsonTaskResponse) {
                taskArray.push({id: taskId, description: taskDescription});
                displayTasks();
            } else {
                createErrorMessage("Error/Problem adding task");
            }
        }).catch(err => createErrorMessage(`Problem processing to task API response: ${err}`));
}

// Sends a delete request with a json in the body to the task API and updates global array, removing the task.
const deleteTask = event => {
    const toDeleteTaskId =  event.currentTarget.getAttribute("taskId") || "";
    const toDeleteTask =  event.currentTarget.getAttribute("task") || "";
    const url = `${API_URL}/${toDeleteTaskId}/${toDeleteTask}`;
    const params = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'id': toDeleteTaskId, 'description': toDeleteTask}) 
    };

    removeErrorMessage();
    if (toDeleteTask.length === 0|| toDeleteTaskId.length === 0) {
        createErrorMessage("Problem deleting task.");
        return;
    }

    fetch(url, params)
        .then(taskResponse => taskResponse.json())
        .catch(err => createErrorMessage(`Problem connecting/getting to task API: ${err}`))
        .then(jsonTaskReponse => {
            if (jsonTaskReponse) {
                taskArray = taskArray.filter(task => task.id.toString() !== toDeleteTaskId.toString());
                displayTasks();
            } else {
                createErrorMessage("Error/Problem deleting task");
            }
        }).catch(err => createErrorMessage(`Problem processing to task API response: ${err}`));
}

// Displays all task from the global array in a table, and adds listener to delete buttons.
const displayTasks = () => {
    const outputDiv = document.getElementById("taskOutput");
    let output = `<table>
            <tr class='border-spacing-px border border-slate-600'>
                <th class='px-2 py-1 text-white'>Id #</th>
                <th class='px-2 py-1 text-white'>Description</th>
                <th class='px-2 py-1 text-white'>Delete</th>
            </tr>
    `;

    if (taskArray.length !== 0) {
        for (const task of taskArray) {
            output += `
            <tr class='border-collapse'>
                <td class='px-2 py-1 text-white text-center'>${task.id}</td>
                <td class='px-2 py-1 text-white'>${task.description}</td>
                <td class='py-1 text-center'>
                    <button class='px-4 py-2 text-red-500 hover:text-red-600' delete_button='true' 
                        taskId='${task.id}' task='${task.description}'>X</button>
                </td>
            </tr>
        `;
        }
    } else {
        output += `
            <tr class='border-collapse'>
                <td class='px-2 py-1'></td>
                <td class='px-2 py-1 text-white'>No tasks found</td>
                <td class='px-2 py-1'></td>
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
    const titleHeader = document.getElementById("todoTitle");
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("text-red-500", "error-message", "text-center", "mb-3", "text-xl");
    errorContainer.textContent = errorMessage;
    titleHeader.insertAdjacentElement('afterend', errorContainer);
}

// Removes Error Message
const removeErrorMessage = () => {
    const errorOutput = document.querySelector(".error-message");
    if (errorOutput) {
        errorOutput.remove();
    }
};

window.onload = init;
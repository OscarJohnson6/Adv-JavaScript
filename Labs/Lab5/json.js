// Create a json collection output in a table
const init = () => {
    let studentJson = [
        {"id": "1", "name": "Tom", "email": "tom@gmail.com"},
        {"id": "2", "name": "Joe", "email": "JoeMail@gmail.com"},
        {"id": "3", "name": "Sal", "email": "541won@gmail.com"}
    ];

    let table = document.createElement("table");
    table.className = "border-separate mx-auto width-70%";

    let header = table.insertRow();
    let cell1 = header.insertCell(0);
    let cell2 = header.insertCell(1);
    cell1.textContent = "ID";
    cell2.textContent = "Email";

    studentJson.forEach(student => {
        let row = table.insertRow();
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        cell1.textContent = student.id;
        cell2.textContent = student.email;
        cell1.classList.add("border-b-2");
        cell2.classList.add("border-b-2");
    });

    document.body.appendChild(table);
}

window.onload = init;
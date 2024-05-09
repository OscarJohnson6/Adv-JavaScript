const { makeEmptyAggregatedTestResult } = require("@jest/test-result");

const displayHtml = message => {
    const output = document.createElement("div");
    output.classList.add("message_container");
    output.innerHTML = `<h1>${message}</h1>`;
    return output;
}


const students = [
    {id: "1", name: "Oscar", email: "oscarj@madisoncollege.edu"},
    {id: "2", name: "Tim", email: "fergusonberg@yahoo.com"},
    {id: "3", name: "Jim", email: "jimlimmy@outlook.com"},
    {id: "4", name: "Rin", email: "r1number@gmail.com"},
    {id: "5", name: "Benson", email: "ben@hotmail.com"}
];

students.forEach(student => console.log(`ID: ${student.id}\nEmail: ${student.email}`));


const xhr = new XMLHttpRequest();
const url = "motd.php";

xhr.open("get", url);

xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
        const message = JSON.parse(xhr.responseText);
        return message;
    }
}

xhr.send(null);



const states = [
    {abbreviation: "WI", fulltext: "Wisconsin"},
    {abbreviation: "IL", fulltext: "Illinois"},
    {abbreviation: "MN", fulltext: "Minnesota"}
];

const output = `${states[1].abbreviation}, ${states[1].fulltext}`;
console.log(output);
return output;



const buttons = document.querySelectorAll(".course");
if (buttons.length !== 0) {
    buttons.forEach(button => button.addEventListener("click", handleCourseEvent));
}



scoreTotal = scores.reduce((total, score) => total + score, 0);


const display = message => `<h1>Hello, ${message}</h1>`;

const userName = document.getElementById('txtUserName').value || "";

fetch(`motd.php?uname=${userName}`)
  .then(response => response.text())
  .then(welcomeMessage => document.getElementById('welcome_message').textContent = welcomeMessage)
  .catch(error => console.error('Error reading/connecting to motd php: ', error));



students.filter(student => student.gpa > 3.25);

document.getElementById("email").value;
document.getElementById("homePage").getAttribute("href");
document.querySelectorAll("div.course li");
document.getElementById("email").style.margin = "50px";
document.getElementById("_content").innerHTML = `&lt;h1&gt;cubs stink &lt;/h1&gt;`;



















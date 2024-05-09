// Button clicked on html, alert message to user
const init = () => {
    let username = document.getElementById('userTextarea').value;
    const message = username.length > 0 ? username : "username is a required field";
    alert(message);
}
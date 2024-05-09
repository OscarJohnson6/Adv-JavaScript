// Adds a form to the html body
const init = () => {
    let html = document.createElement("form");
    html.innerHTML = "<div class='form-group'>"
                    + "<input class='form-control' placeholder='Enter username' type='text' id='username'/>"
                    + "<button type='button'>Click Me!</button></div>";

    document.body.appendChild(html);
}
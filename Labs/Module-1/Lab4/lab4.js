// Creates Events for buttons with condition-id & height-id attributes, to log thier values
const init = () => {
    let buttons = document.querySelectorAll("[condition-id]");
    buttons.forEach(button => {
        button.onclick = dotNotationCondititonEvent;
    });

    let buttonListener = document.querySelectorAll("[height-id]");
    buttonListener.forEach(button => {
        button.addEventListener("click", heightListenerEvent);
    });
}

// Console logs inline button value
const inlineColorEvent = control => {
    console.log(control.getAttribute("color-id"));
}

// Console logs button attribute value through dot notation 
const dotNotationCondititonEvent = event => {
    console.log(event.currentTarget.getAttribute("condition-id"));
}

// Console logs  button attribute value through listener
const heightListenerEvent = event => {
    console.log(event.currentTarget.getAttribute("height-id"));
}
// Parses message xml and outputs its message as a heading
const init = () => {
    let xhr = new XMLHttpRequest();
    let url = "message.xml";

    xhr.open("get", url);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            let xmlParser = new DOMParser().parseFromString(xhr.responseText, "application/xml");
            let messageNode = xmlParser.getElementsByTagName("message");

            outputResponse(messageNode[0].childNodes[0].nodeValue);
        }
    }

    xhr.send(null);
}

// Outputs a header based on param message 
const outputResponse = message => {
    let header = document.createElement("h2");
    header.innerHTML = message;

    document.body.appendChild(header);
}

window.onload = init;
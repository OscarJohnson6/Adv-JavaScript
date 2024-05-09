// Adds a listener to the submit button to getLocation to display results
const init = () => {
    const buttonListener = document.getElementById("submitButton");
    buttonListener.addEventListener("click", getLocation);
}

// Returns cardinal direction based on wind angle
const getWindDirection = windDirectionAngle => {
    if (windDirectionAngle > 45 && windDirectionAngle < 135) {
        return "N";
    } else if (windDirectionAngle > 135 && windDirectionAngle < 225) {
        return "W";
    } else if (windDirectionAngle > 225 && windDirectionAngle < 315) {
        return "S";
    } else {
        return "E";
    }
}

// Checks if the tempatature in celcius is greater than 85F or less than 15F
const getTempPicture = temperature => {
    if (temperature >= 28.33) {
        return "highTemp";
    } else if (temperature <= 1.11) {
        return "lowTemp";
    } else {
        return "avgTemp";
    }
}

// Checks if wind speed is greater than 20mph or less than 10mph
const getWindPicture = windSpeed => {
    if (windSpeed > 20) {
        return "highWinds";
    } else if (windSpeed < 10) {
        return "lowWinds";
    } else {
        return "avgWinds";
    }
}

// Adds a formatted html output to a div based on parameter data
const createOutput = data => {
    const countryCode = data.weatherObservation.countryCode;
    const stationName = data.weatherObservation.stationName;
    let temperature = data.weatherObservation.temperature;
    const dewPoint = data.weatherObservation.dewPoint;
    const humidity = data.weatherObservation.humidity;
    const clouds = data.weatherObservation.clouds;
    const weatherCondition = data.weatherObservation.weatherCondition;
    const windSpeed = data.weatherObservation.windSpeed;
    const windDirectionAngle = data.weatherObservation.windDirection;
    const windDirection = getWindDirection(windDirectionAngle);
    const tempPicture = getTempPicture(temperature);
    const windPicture = getWindPicture(windSpeed);
    let tempatureDegree = "Celsius";
    const tempType = document.querySelector('input[name="temperature"]:checked').value;
    if (tempType === "fahrenheit") {
        temperature = (9/5 * temperature) + 32;
        tempatureDegree = "Farenheit";
    }
    const outputDiv = document.getElementById("tempatureOutput");

    outputDiv.innerHTML = `
        <h2 class='text-xl font-bold mb-1'>${countryCode}, ${stationName}</h2>
        <div class='flex flex-row justify-between items-center'>
        <p class='mr-3'>${temperature}° ${tempatureDegree}</p>
        <img style='max-width: 3rem;' src='images/${tempPicture}.png'>
        </div>
        <div class='flex flex-row justify-between items-center mb-1'>
        <p class='mr-3'>${windSpeed} mph ${windDirection} Wind</p>
        <img style=' max-width: 5rem;' src='images/${windPicture}.png'>
        </div>
        <table class='table-auto mt-6'>
        <tr class='border-spacing-px border border-slate-600'>
        <th class='px-2 py-1'>Humidity</th>
        <th class='px-2 py-1'>Clouds</th>
        <th class='px-2 py-1'>Condition</th>
        <th class='px-2 py-1'>Dew Points</th>
        </tr>
        <tr class='border-spacing-px border border-slate-600'>
        <td class='px-2 py-1 text-center'>${humidity}</td>
        <td class='px-2 py-1 text-center'>${clouds}</td>
        <td class='px-2 py-1 text-center'>${weatherCondition}</td>
        <td class='px-2 py-1 text-center'>${dewPoint}</td>
        </tr>
        </table>
    `;
}

// Connects to the findNearByWeather API to find weather based on lat and lng param then passes the reponse to createOutput
const getWeather = (lat, lng) => {
    let xhr = new XMLHttpRequest();
    let url = `http://api.geonames.org/findNearByWeatherJSON?username=oscar_johnson&lat=${lat}&lng=${lng}`;

    xhr.open("get", url);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            let data = JSON.parse(xhr.responseText);

            createOutput(data);
        }
    }

    xhr.send(null);
}

// Validates zipcode input and gets lat and lng from an API request
const getLocation = () => {
    const zipCode = document.getElementById("zipCode").value;
    const errorMessage = document.querySelector(".error-message");
    
    if (errorMessage) {
        errorMessage.remove();
    }

    // Checks if zipCode is empty or invalid
    if (!zipCode || !/^\d{5}$/.test(zipCode)) {
        createErrorMessage("Please enter a valid zipcode.");
        return;
    }

    let xhr = new XMLHttpRequest();
    let url = `http://api.geonames.org/postalCodeSearchJSON?postalcode=${zipCode}&username=oscar_johnson&countryCode=US`;

    xhr.open("get", url);

    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            let data = JSON.parse(xhr.responseText);

            if (data.postalCodes && data.postalCodes.length > 0) {
                let lat = data.postalCodes[0].lat;
                let lng = data.postalCodes[0].lng;
                getWeather(lat, lng);
            } else {
                createErrorMessage("No weather info found for zipcode.");
            }
        }
    }

    xhr.send(null);
}

// Inserts an error message for wrong zipcode inputs
const createErrorMessage = errorMessage => {
    const inputDiv = document.getElementById("zipCodeInput");
    const errorContainer = document.createElement("div");
    errorContainer.classList.add("text-red-500", "error-message");
    errorContainer.textContent = errorMessage;
    inputDiv.insertBefore(errorContainer, inputDiv.firstChild);
}

window.onload = init;
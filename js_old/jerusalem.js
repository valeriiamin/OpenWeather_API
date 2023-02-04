const getJerusalemData = async function () {
    // const userPosition = await getUserPosition();

    // https://api.openweathermap.org/data/2.5/weather?q=Kyiv&appid=7db757d57fb1bb5643015749b12656e1

    // const { latitude: lat, longitude: lon } = userPosition.coords;

    const geocodingResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Jerusalem&appid=7db757d57fb1bb5643015749b12656e1`
    );

    const geocodingData = await geocodingResponse.json();
    // console.log(geocodingData);

    const {
        name,
        main: { temp, pressure },
    } = geocodingData;

    const {
        wind: { speed, deg },
    } = geocodingData;

    const {
        weather: [{ description, icon }],
    } = geocodingData;

    const {
        sys: { sunrise, sunset },
    } = geocodingData;

    const sunriseTime = await convertTime(sunrise);
    const sunsetTime = await convertTime(sunset);
    // console.log(sunriseTime);

    const tempC = Math.round(temp - 273);
    const tempF = Math.round(1.8 * (temp - 273) + 32);

    const insertRow = document.querySelector("#row-jerusalem");
    insertRow.innerHTML = `
    <div class="row-item name">${name}</div>
    <div class="row-item weather">
        <span class="weather-temp">${tempC}°C / ${tempF}°F</span>
        <span class="weather-desc">${description}</span>
    </div>
    <div class="row-item icon">${icon}</div>
    <div class="row-item pressure">${pressure} hPa</div>
    <div class="row-item wind">${speed} m/s ${deg} deg</div>
    <div class="row-item suntime">${sunriseTime}/${sunsetTime}</div>
    `;

    return geocodingData;
};

// const getUserPosition = function () {
//     return new Promise(function (resolve, reject) {
//         navigator.geolocation.getCurrentPosition(resolve, reject);
//     });
// };

async function convertTime(param) {
    const date = new Date(param * 1000);
    const time = date.toLocaleTimeString();

    return time;
}

export default getJerusalemData;

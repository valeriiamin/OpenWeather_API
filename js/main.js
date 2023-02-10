// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// http://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f kyiv
// http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f london
// http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bf35cac91880cb98375230fb443a116f ny

// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
// new api key = 5c57e88f04fb9a8c3d02b6c0264127ab

const metricUnits = "metric";
const imperialUnits = "imperial";

window.addEventListener("load", () => {
    contentSwitcher();

    getWeatherData(metricUnits);
});

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const key = "7db757d57fb1bb5643015749b12656e1";
const idKyiv = 703448;
const idLondon = 2643743;
const idNY = 5128638;

const tempBtn = document.querySelector(".button");
let tempC = document.querySelector("#tempC");
let tempF = document.querySelector("#tempF");

const accordionArray = document.querySelectorAll(".accordion");

tempBtn.addEventListener("click", clickTempButton);

//show content box
accordionArray.forEach((item) =>
    item.addEventListener("click", displayAccordion)
);

async function displayAccordion(e) {
    try {
        if (e.target.classList.contains("name")) {
            const rowItem = e.target.parentElement;
            const tableRow = rowItem.parentElement;
            const accordion = tableRow.parentElement;
            const content = accordion.nextElementSibling;
            const triangle = tableRow.firstElementChild;
            const arrow = triangle.firstElementChild;

            if (content.style.display === "flex") {
                content.style.display = "none";
                accordion.classList.remove("active-accordion");
                e.target.classList.remove("name-active");
                arrow.classList.remove("rotate-after");
            } else {
                content.style.display = "flex";
                e.target.classList.add("name-active");
                accordion.classList.add("active-accordion");
                arrow.classList.add("rotate-after");

                //get hourly forecast and display it in content box
                const hourlyWeather = await getHourlyData(
                    e.target.innerHTML,
                    metricUnits
                );
                hourlyWeather.forEach((obj) => displayHourlyData(content, obj));
            }
        }
    } catch (e) {
        console.error(e);
    }
}

async function clickTempButton(e) {
    try {
        if (e.target.innerHTML == "C°") {
            tempF.classList.remove("active");
            tempC.classList.add("active");

            await getWeatherData(metricUnits);

            const accordionActive =
                document.querySelectorAll(".active-accordion");
            accordionActive.forEach(async (item) => {
                const tableRow = item.firstElementChild; //table-row
                const triangle = tableRow.firstElementChild; // triangle
                const rowItem = triangle.nextElementSibling; //row item
                const nameCity = rowItem.firstElementChild; //name city
                const content = item.nextElementSibling; //content

                const hourlyWeather = await getHourlyData(
                    nameCity.innerHTML,
                    metricUnits
                );

                content.innerHTML = "";
                hourlyWeather.forEach((obj) => displayHourlyData(content, obj));
            });
        }

        if (e.target.innerHTML == "F°") {
            tempC.classList.remove("active");
            tempF.classList.add("active");

            await getWeatherData(imperialUnits);

            const accordionActive =
                document.querySelectorAll(".active-accordion");
            accordionActive.forEach(async (item) => {
                const tableRow = item.firstElementChild; //table-row
                const triangle = tableRow.firstElementChild; // triangle
                const rowItem = triangle.nextElementSibling; //row item
                const nameCity = rowItem.firstElementChild; //name city
                const content = item.nextElementSibling; //content

                const hourlyWeather = await getHourlyData(
                    nameCity.innerHTML,
                    imperialUnits
                );

                content.innerHTML = "";
                hourlyWeather.forEach((obj) => displayHourlyData(content, obj));
            });
        }
    } catch (e) {
        console.error(e);
    }
}

const getWeatherData = async function (unit) {
    try {
        const userPosition = await getUserPosition();
        const { latitude: lat, longitude: lon } = userPosition.coords;

        const getCurrentWeather = await Promise.all([
            getDataAndConvertToJSON(
                `${baseUrl}lat=${lat}&lon=${lon}&units=${unit}&appid=${key}`
            ),
            getDataAndConvertToJSON(
                `${baseUrl}id=${idKyiv}&units=${unit}&appid=${key}`
            ),
            getDataAndConvertToJSON(
                `${baseUrl}id=${idLondon}&units=${unit}&appid=${key}`
            ),
            getDataAndConvertToJSON(
                `${baseUrl}id=${idNY}&units=${unit}&appid=${key}`
            ),
        ]);

        const selectorArray = [
            "#row-geo",
            "#row-kyiv",
            "#row-london",
            "#row-ny",
        ];

        selectorArray.forEach((key, i) =>
            showWeather(key, getCurrentWeather[i])
        );

        return getCurrentWeather;
    } catch (e) {
        console.error(e);
    }
};

const getDataAndConvertToJSON = function (
    url,
    errorMessage = "Something went wrong🤨"
) {
    return fetch(url).then((response) => {
        if (!response.ok)
            throw new Error(`${errorMessage} Error ${response.status}`);
        return response.json();
    });
};

function showWeather(selector, data) {
    const row = document.querySelector(selector);
    row.innerHTML = "";

    const tempIcon = tempF.classList.contains("active") ? "°F" : "°C";
    const windUnit = tempF.classList.contains("active") ? "mpH" : "m/s";

    let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    row.insertAdjacentHTML(
        "beforeend",
        `
        <div class="row-item name">${data.name}</div>
        <div class="row-item weather">
            <div class="temp-weather">
                <div class="temp">${Math.round(data.main.temp)}</div>
                <div class="temp-icon">${tempIcon}</div>
            </div>
            <div class="weather-desc">${data.weather[0].description}</div>
        </div>
        <div class="row-item"><img src="http://openweathermap.org/img/wn/${
            data.weather[0].icon
        }@2x.png" class="icon"/></div>
        <div class="row-item pressure">${data.main.pressure} hPa</div>
        <div class="row-item wind">${data.wind.speed} ${windUnit} </ br> ${
            data.wind.deg
        } deg</div>
        <div class="row-item suntime">${sunrise}/</br>${sunset}</div>
    `
    );
}

const getUserPosition = async function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

function contentSwitcher() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            document.querySelector(".content").hidden = false;
            document.querySelector(".preloader").style.display = "none";
        }, 3000);
    });
}

const getHourlyData = async function (dataName, unit) {
    try {
        const baseUrl = "https://api.openweathermap.org/data/2.5/forecast?";
        const key = "5c57e88f04fb9a8c3d02b6c0264127ab";

        const getHourlyWeather = await getDataAndConvertToJSON(
            `${baseUrl}q=${dataName}&units=${unit}&appid=${key}`
        );

        const { list } = getHourlyWeather;

        return list;
    } catch (e) {
        console.error(e);
    }
};

function displayHourlyData(content, dataObject) {
    const tempIcon = tempF.classList.contains("active") ? "°F" : "°C";
    const windUnit = tempF.classList.contains("active") ? "mpH" : "m/s";

    const row = document.createElement("div");
    row.classList.add("content-row");

    row.insertAdjacentHTML(
        "beforeend",
        `
    <div class="content-item day">${dataObject.dt_txt}</div>
    <div class="content-item weather">
        <div class="temp-weather">
            <div class="temp">${Math.round(dataObject.main.temp)}</div>
            <div class="temp-icon">${tempIcon}</div>
        </div>
        <div class="weather-desc">${dataObject.weather[0].description}</div>
    </div>`
    );

    row.insertAdjacentHTML(
        "beforeend",
        `<div class="content-item">
        <img class="icon" src="http://openweathermap.org/img/wn/${dataObject.weather[0].icon}@2x.png" />
    </div>
    <div class="content-item pressure">${dataObject.main.pressure}</div>
    <div class="content-item wind">${dataObject.wind.speed}${windUnit} </ br> ${dataObject.wind.deg} deg</div>
    <div class="content-item suntime">🌅🌄</div>
</div>`
    );
    content.append(row);
}

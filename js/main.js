// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// http://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f kyiv
// http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f london
// http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bf35cac91880cb98375230fb443a116f ny
import { Forecast } from "./forecast.js";
import { ForecastListView } from "./forecastListView.js";

window.addEventListener("load", () => {
    contentSwitcher();
    getWeatherData();
    // getGeoposition();
    // getCurrentWeather();

    // change styles
    document.querySelectorAll(".accordion").forEach((elem) => {
        elem.addEventListener("click", function () {
            elem.classList.toggle("active-accordion");
            document.querySelector(".rotate").classList.toggle("rotate-after");
            let content = elem.nextElementSibling;

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});

function contentSwitcher(content, preloader) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            document.querySelector(".content").hidden = false;
            document.querySelector(".preloader").style.display = "none";
        }, 3000);
    });
}

const getUserPosition = async function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

// const getGeoposition = async function () {
//     try {
//         const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
//         const key = "7db757d57fb1bb5643015749b12656e1";

//         const userPosition = await getUserPosition();

//         const { latitude: lat, longitude: lon } = userPosition.coords;

//         fetch(`${baseUrl}lat=${lat}&lon=${lon}&appid=${key}`)
//             .then((response) => {
//                 if (!response.ok) throw new Error(response.statusText);
//                 return response.json();
//             })
//             .then((data) => showWeather(data));
//     } catch (error) {
//         alert(error);
//     }
// };

function showWeather(selector, data) {
    const row = document.querySelector(selector);
    // console.log(rows)

    let temp = Math.round(data.temp - 273);
    let sunrise = new Date(data.sunrise * 1000).toLocaleTimeString();
    let sunset = new Date(data.sunset * 1000).toLocaleTimeString();

    row.insertAdjacentHTML(
        "beforeend",
        `
        <div class="row-item triangle">
                <div class="rotate"></div></div>
        <div class="row-item name">${data.name}</div>
        <div class="row-item weather"><div class="temp" id="temp">${temp}°C</div><span class="weather-desc">${data.description}</span></div>
        <div class="row-item"><img src="http://openweathermap.org/img/wn/${data.icon}@2x.png" class="icon"/></div>
        <div class="row-item pressure">${data.pressure} hPa</div>
        <div class="row-item wind">${data.speed} m/s </ br> ${data.deg} deg</div>
        <div class="row-item suntime">${sunrise}/</br>${sunset}</div>
    `
    );
}

function switchToFahrenheit(temp) {
    return (temp * 9) / 5 + 32;
}

// const getCurrentWeather = async function(){
//     try{
//         const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
//         const key = '7db757d57fb1bb5643015749b12656e1';
//         const idArray = [703448, 2643743, 5128638];
//         const weatherArray = idArray.map(async (id) => {
//             let response = await fetch(`${baseUrl}id=${id}&appid=${key}`)
//             let data = await response.json();
//             // showWeather(data);
//             console.log(data);

//         });

//         console.log(weatherArray)

//     }catch(e){
//         console.error(e);
//         alert(`Something went wrong: ${e.message}`);
//     }
// }

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

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const key = "7db757d57fb1bb5643015749b12656e1";
const idKyiv = 703448;
const idLondon = 2643743;
const idNY = 5128638;

const getWeatherData = async function () {
    try {
        const userPosition = await getUserPosition();
        const { latitude: lat, longitude: lon } = userPosition.coords;

        const getCurrentWeather = await Promise.all([
            getDataAndConvertToJSON(
                `${baseUrl}lat=${lat}&lon=${lon}&appid=${key}`
            ),
            getDataAndConvertToJSON(`${baseUrl}id=${idKyiv}&appid=${key}`),
            getDataAndConvertToJSON(`${baseUrl}id=${idLondon}&appid=${key}`),
            getDataAndConvertToJSON(`${baseUrl}id=${idNY}&appid=${key}`),
        ]);

        // console.log(getCurrentWeather)
        const forecastList = getCurrentWeather.map(
            (item) => new Forecast(item)
        ); // массив с объектами по городам

        const selectorArray = [
            "#row-geo",
            "#row-kyiv",
            "#row-london",
            "#row-ny",
        ];

        const dataWeather = {};
        selectorArray.forEach((key, i) => (dataWeather[key] = forecastList[i]));

        for (const key in dataWeather) {
            showWeather(key, dataWeather[key]);
            continue;
        }

        const tempBtn = document.querySelector(".button");
        const tempC = document.querySelector("#tempC");
        const tempF = document.querySelector("#tempF");

        tempBtn.addEventListener("click", (e) => {
            if (e.target.innerHTML == "C°") {
                tempF.classList.remove("active");
                tempC.classList.add("active");

                let array_temp = document.querySelectorAll(".temp");
                array_temp.forEach((item, i) => {
                    let temp = Math.round(forecastList[i].temp - 273);
                    item.innerHTML = "";
                    item.innerHTML = `${temp}°C`;
                });
            }
            if (e.target.innerHTML == "F°") {
                tempC.classList.remove("active");
                tempF.classList.add("active");

                let array_temp = document.querySelectorAll(".temp");
                array_temp.forEach((item, i) => {
                    let temp = Math.round(forecastList[i].temp - 273);
                    let fahrenheit = Math.round(switchToFahrenheit(temp));
                    item.innerHTML = "";
                    item.innerHTML = `${fahrenheit}°F`;
                });
            }
        });
    } catch (e) {
        console.error(e);
    }
};
// array selectors,function showWeather(data,selectorArray) , selectorArray.forEach - paste html code

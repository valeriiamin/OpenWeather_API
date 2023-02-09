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
let flag = false; //clear content to 2d time

const contentArray = document.querySelectorAll(".content");
const accordionArray = document.querySelectorAll(".accordion");

tempBtn.addEventListener("click", clickTempButton);

//show content box
accordionArray.forEach((item) =>
    item.addEventListener("click", displayAccordion)
);

async function displayAccordion(item) {
    try {
        const parentNode = item.target.parentNode;
        const parentAccordion = parentNode.parentNode;
        const content = parentAccordion.nextElementSibling;
        const triangleDiv = item.target.previousElementSibling;
        const arrow = triangleDiv.firstChild;

        if (content.style.display === "flex") {
            // content.classList.remove("content-active");
            content.style.display = "none";
            // content.style.maxHeight = null;

            parentAccordion.classList.remove("active-accordion");
            item.target.classList.remove("name-active");
            arrow.nextElementSibling.classList.remove("rotate-after");
        } else {
            content.style.display = "flex";
            // content.style.maxHeight = content.scrollHeight + "px";
            // content.classList.add("content-active");
            // console.log(content.scrollHeight)
            item.target.classList.add("name-active");
            parentAccordion.classList.add("active-accordion");

            arrow.nextElementSibling.classList.add("rotate-after");

            //get hourly forecast and display it in content box
            const hourlyWeather = await getHourlyData(
                item.target.innerHTML,
                metricUnits
            );
            hourlyWeather.forEach((obj) => displayHourlyData(content, obj));
        }
    } catch (e) {
        console.error(e);
    }
}

// const tableBody = document.querySelector("#tableBody");
// tableBody.addEventListener("click", async (e) => {
//     // console.log(e.target);
//     if (e.target.classList.contains("name")) {
//         e.target.classList.add('name-active')

//         const elem = e.target.closest(".accordion");
//         elem.classList.toggle("active-accordion");

//         const content = elem.nextElementSibling;
//         const dataName = e.target.textContent;

//         if (elem.classList.contains("active-accordion")) {
//             // e.target.classList.toggle("name-active");
//             content.classList.toggle("content-active");
//             // content.innerHTML = ''
//             const hourlyWeather = await getHourlyData(dataName, metricUnits);
//             hourlyWeather.forEach((obj) => displayHourlyData(content, obj));
//         }

//         const arrayTriangle = document.querySelectorAll(".rotate");
//         arrayTriangle.forEach((item) => {
//             if (elem.contains(item)) {
//                 item.classList.toggle("rotate-after");

//                 if (content.style.maxHeight) {
//                     content.style.maxHeight = null;
//                     content.classList.toggle('content-active')
//                     e.target.classList.toggle('name-active')
//                 } else {
//                     content.style.maxHeight = content.scrollHeight + "px";
//                 }
//             }
//         });
//     }
// });

async function clickTempButton(e) {
    try {
        const accordionActive = document.querySelectorAll(".active-accordion");
        accordionActive.forEach(async (item) => {
            const tableRow = item.firstElementChild; //table-row
            const triangle = tableRow.firstElementChild; // triangle
            const nameCity = triangle.nextElementSibling; //name city
            const content = item.nextElementSibling; //content
            // let flag = false //flag for clear content in 2d time
            // console.log(content)

            if (e.target.innerHTML == "C°") {
                tempF.classList.remove("active");
                tempC.classList.add("active");

                await getWeatherData(metricUnits);

                
                const hourlyWeather = await getHourlyData(
                    nameCity.innerHTML,
                    metricUnits
                );

                content.innerHTML = ''
                hourlyWeather.forEach((obj) =>
                    displayHourlyData(content, obj)
                );
            }
            if (e.target.innerHTML == "F°") {
                tempC.classList.remove("active");
                tempF.classList.add("active");

                await getWeatherData(imperialUnits);
                
                const hourlyWeather = await getHourlyData(
                    nameCity.innerHTML,
                    imperialUnits
                );

                content.innerHTML = ''
                hourlyWeather.forEach((obj) =>
                    displayHourlyData(content, obj)
                );
            }
        });

        // const nameArray = document.querySelectorAll(".name-active");
        // const contentArray = document.querySelectorAll(".content-active");

        // nameArray.forEach((item, i) => {
        //     const nameCity = item.innerHTML;
        //     // contentArray[i].innerHTML = ''
        //     console.log(nameCity);

        // const hourlyWeather = await getHourlyData(
        //     nameCity,
        //     metricUnits
        // );
        // hourlyWeather.forEach((obj) =>
        //     displayHourlyData(contentArray[i], obj)
        // );

        // accordionArray.forEach((item, i)=> {
        //     if(item.classList.contains('active-accordion')){

        //         const tableRow = item.parentNode;

        //         const cityName = tableRow.childNodes[i];
        //         console.log(cityName)
        //     }
        // })

        // const nameArray = document.querySelectorAll(".name-active");
        // const contentArray = document.querySelectorAll(".content-active");
        // nameArray.forEach(async (item, i) => {
        //     const nameCity = item.innerHTML;
        //     contentArray[i].innerHTML = "";
        //     console.log(nameCity);

        //     const hourlyWeather = await getHourlyData(
        //         nameCity,
        //         imperialUnits
        //     );
        //     hourlyWeather.forEach((obj) =>
        //         displayHourlyData(contentArray[i], obj)
        //     );
        // });

        // getWeatherData();
        // console.log('hello')

        // const namesActiveClass = document.querySelectorAll('.name-active')
        // namesActiveClass.forEach(async item  => {

        //      // typeof item.style.maxHeight - string!!!
        //         const activeAccordion = item.closest('.active-accordion')
        //         const content = activeAccordion.nextElementSibling
        //         // console.log(activeAccordion)

        //          const res = await getHourlyData(item.textContent); //нужно передать имя города
        //         content.innerHTML = ''
        //          //  console.log(res)
        //         res.forEach(obj => displayHourlyData(content, obj))

        // })
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

        const dataWeather = {};
        selectorArray.forEach(
            (key, i) => (dataWeather[key] = getCurrentWeather[i])
        );

        for (const key in dataWeather) {
            showWeather(key, dataWeather[key]);
            continue;
        }

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
    // console.log(data)

    // const temp = tempF.classList.contains("active")
    //     ? Math.round(switchCelsiusToFahrenheit(data.main.temp))
    //     : Math.round(data.main.temp);
    const tempIcon = tempF.classList.contains("active") ? "°F" : "°C";
    const windUnit = tempF.classList.contains("active") ? "mpH" : "m/s";

    let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();

    row.insertAdjacentHTML(
        "beforeend",
        `
        <div class="row-item triangle">
                <div class="rotate"></div></div>
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

// function switchCelsiusToFahrenheit(temp) {
//     return (temp * 9) / 5 + 32;
// }

// function switchFahrenheitToCelsius(temp){
//     return (temp - 32) * 5/9;
// }

const getHourlyData = async function (dataName, unit) {
    try {
        const baseUrl = "https://api.openweathermap.org/data/2.5/forecast?";
        const key = "5c57e88f04fb9a8c3d02b6c0264127ab";

        const getHourlyWeather = await getDataAndConvertToJSON(
            `${baseUrl}q=${dataName}&units=${unit}&appid=${key}`
        );

        const { list } = getHourlyWeather;

        // const forecastList = list.map((obj) => {
        //     if (tempC.classList.contains("active")) {
        //         obj = {
        //             date: obj.dt_txt,
        //             temp: Math.round(obj.main.temp),
        //             description: obj.weather[0].description,
        //             icon: obj.weather[0].icon,
        //             pressure: obj.main.pressure,
        //             speed: obj.wind.speed,
        //             deg: obj.wind.deg,
        //         };
        //     } else {
        //         obj = {
        //             date: obj.dt_txt,
        //             temp: Math.round(switchCelsiusToFahrenheit(obj.main.temp)),
        //             description: obj.weather[0].description,
        //             icon: obj.weather[0].icon,
        //             pressure: obj.main.pressure,
        //             speed: obj.wind.speed,
        //             deg: obj.wind.deg,
        //         };
        //     }
        // });

        return list;
    } catch (e) {
        console.error(e);
    }
};

function displayHourlyData(content, dataObject) {

    const tempIcon = tempF.classList.contains("active") ? "°F" : "°C";
    const windUnit = tempF.classList.contains("active") ? "mpH" : "m/s";
    
    
        
        // content.innerHTML = ""; //clear content in 2d time
        
    
    
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

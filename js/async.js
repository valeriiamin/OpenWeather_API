export const getGeoData = async function () {
    const userPosition = await getUserPosition();

    const { latitude: lat, longitude: lon } = userPosition.coords;

    const geocodingResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7db757d57fb1bb5643015749b12656e1`
    );

    const geocodingData = await geocodingResponse.json();
    // console.log(geocodingData);

    const { name, main: { temp, pressure }, wind: { speed, deg }, weather: [{ description, icon }], sys: { sunrise, sunset }} = geocodingData;

    const sunriseTime = await convertTime(sunrise);
    const sunsetTime = await convertTime(sunset);
    // console.log(sunriseTime);

    const tempC = Math.round(temp - 273);
    const tempF = Math.round(1.8 * (temp - 273) + 32);

    const insertRow = document.querySelector("#row-geo");
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

const getUserPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

// запрос на несколько дней погода
export const getGeoForecast = async function(){
    const userPosition = await getUserPosition();

    const { latitude: lat, longitude: lon } = userPosition.coords;

    const geoForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7db757d57fb1bb5643015749b12656e1`
    );

    const geoResponse = await geoForecast.json(); //массив на 5 дней прогноза

    const {list} = geoResponse;
    console.log(list);
    
        list.forEach((i) => {
            const { dt }  = list[i];
        console.log(dt);
        const date =  convertDate(dt);
        console.log(date);
        })
        
    }
        
   //main: { temp, pressure }, weather:[{ description, icon }], wind: { speed, deg }}
    


async function convertTime(param) {
    const date = new Date(param * 1000);
    const time = date.toLocaleTimeString();

    return time;
}

async function convertDate(param) {
    const newDate = new Date(param * 1000);
    console.log(newDate);
}

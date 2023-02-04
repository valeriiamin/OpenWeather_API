import {  getGeoData } from './async.js'


export const insertGeoData = async function (geocodingData) {
    console.log(geocodingData)
    const {
                name,
                main: { temp, pressure },
            } = geocodingData;
        
            const {
                wind: { speed, deg },
            } = geocodingData;
        
            const {
                weather: { description, icon },
            } = geocodingData;
        
            const {
                sys: { sunrise, sunset },
            } = geocodingData;
    // const { name, main: { temp, pressure }, wind: { speed, deg }, weather: [{ description, icon }], sys: { sunrise, sunset }} = data;

    
    const sunriseTime = await convertTime(sunrise);
    const sunsetTime = await convertTime(sunset);

    const tempC = Math.round(temp - 273);
    const tempF = Math.round(1.8 * (temp - 273) + 32);

    const insertRow = document.querySelector("#row-geo");
    insertRow.insertAdjacentHTML('beforeend', `
    <div class="row-item name">${name}</div>
    <div class="row-item weather">
        <span class="weather-temp">${tempC}°C</span>
        <span class="weather-desc">${description}</span>
    </div>
    <div class="row-item icon"><img src="http://openweathermap.org/img/wn/${icon}@2x.png" /></div>
    <div class="row-item pressure">${pressure} hPa</div>
    <div class="row-item wind">${speed} m/s ${deg} deg</div>
    <div class="row-item suntime">${sunriseTime}/${sunsetTime}</div>
    `);

}


async function convertTime(param) {
    const date = new Date(param * 1000);
    const time = date.toLocaleTimeString();

    return time;
}

async function convertDate(param) {
    const newDate = new Date(param * 1000);
    console.log(newDate);
}
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

window.addEventListener('load', () => {
    // const content = document.querySelector('.content')
    // const preloader = document.querySelector('.preloader')

    contentSwitcher();
    getGeoposition();
    

})

function contentSwitcher(content, preloader) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            document.querySelector('.content').hidden = false;
            document.querySelector('.preloader').style.display = 'none';
        }, 3000)
    })
}

const getUserPosition = async function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const getGeoposition = async function () {
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    const key = '7db757d57fb1bb5643015749b12656e1'

    const userPosition = await getUserPosition();

    const { latitude: lat, longitude: lon } = userPosition.coords;
    
    fetch(
        `${baseUrl}lat=${lat}&lon=${lon}&appid=${key}`
    )
        .then(response => {
            if(!response.ok) throw new Error(response.statusText)
            return response.json()
        })
        .then(data => showWeather(data))
        .catch(error => console.error(error))

}

function showWeather(data) {
    const row = document.querySelector('#row-geo')

    let temp = Math.round(data.main.temp - 273);    
    let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString()
    let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString()
    row.insertAdjacentHTML('beforeend', `<div class="row-item name">${data.name}</div>
    <div class="row-item weather">
        <span class="weather-temp">${temp}°C</span>
        <span class="weather-desc">${data.weather[0].description}</span>
    </div>
    <div class="row-item icon"><img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" /></div>
    <div class="row-item pressure">${data.main.pressure} hPa</div>
    <div class="row-item wind">${data.wind.speed} m/s ${data.wind.deg} deg</div>
    <div class="row-item suntime">${sunrise}/${sunset}</div>`)
}
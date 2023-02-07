export class Forecast {
    constructor(forecast){
        this.name = forecast.name
        this.temp = forecast.temp
        this.description = forecast.weather[0].description
        this.icon = forecast.weather[0].icon
        this.pressure = forecast.main.pressure
        this.speed = forecast.wind.speed
        this.deg = forecast.wind.deg
        this.sunrise = forecast.sys.sunrise
        this.sunset = forecast.sys.sunset
    }

    createElement() {
        const div = document.createElement('div')
        div.classList.add('table-row')
        div.insertAdjacentHTML("beforeend", `
                <div class="row-item name">${this.name}</div>
                <div class="row-item weather"><div class="temp">${this.temp}°C</div><span class="weather-desc">${this.weather[0].description}</span></div>
                <div class="row-item"><img src="http://openweathermap.org/img/wn/${this.weather[0].icon}@2x.png" class="icon"/></div>
                <div class="row-item pressure">${this.main.pressure} hPa</div>
                <div class="row-item wind">${this.wind.speed} m/s </ br> ${this.wind.deg} deg</div>
                <div class="row-item suntime">${this.sunrise}/</br>${this.sunset}</div>
        `);
        return div;
    }
    
}
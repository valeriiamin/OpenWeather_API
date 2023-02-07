export class Forecast {
    constructor(forecast){
        this.name = forecast.name
        this.temp = forecast.main.temp
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
        div.insertAdjacentHTML("afterbegin", `
                <div class="row-item triangle">
                <div class="rotate"></div></div>
                <div class="row-item name">${this.name}</div>
                <div class="row-item weather"><div class="temp">${this.temp}°C</div><span class="weather-desc">${this.description}</span></div>
                <div class="row-item"><img src="http://openweathermap.org/img/wn/${this.icon}@2x.png" class="icon"/></div>
                <div class="row-item pressure">${this.pressure} hPa</div>
                <div class="row-item wind">${this.speed} m/s </ br> ${this.deg} deg</div>
                <div class="row-item suntime">${this.sunrise}/</br>${this.sunset}</div>
        `);
        return div;
    }
    
    switchToFahrenheit(temp) {
    return (this.temp * 9) / 5 + 32;
}

    switchSunrise(sunrise) {
        return new Date(this.sunrise * 1000).toLocaleTimeString(); 
    }
    switchSunset(sunset) {
        return new Date(this.sunset * 1000).toLocaleTimeString();
    }

}
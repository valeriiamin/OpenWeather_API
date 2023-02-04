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

    setTempС(){
        const tempC = Math.round(this.temp - 273);        
        return tempC;
    }

    setTempF(){
        const tempF = Math.round(1.8 * (this.temp - 273) + 32);
        return tempF;
    }

    createElement() {
        const div = document.createElement('div')
        div.classList.add('table-row')
        div.insertAdjacentHTML('beforeend', `<div class="row-item name">${this.name}</div>
        <div class="row-item weather">
            <span class="weather-temp">${this.temp}</span>
            <span class="weather-desc">${this.description}</span>
        </div>
        <div class="row-item icon"><img src="http://openweathermap.org/img/wn/${this.icon}@2x.png" /></div>
        <div class="row-item pressure">${this.pressure} hPa</div>
        <div class="row-item wind">${this.speed} m/s ${this.deg} deg</div>
        <div class="row-item suntime">${this.sunrise}/${this.sunset}</div>
        `);
        return div;
    }
    
}
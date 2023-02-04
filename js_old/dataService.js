import {STATE} from './state&geo.js'

class DataService {
    #baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
    #appId = '7db757d57fb1bb5643015749b12656e1'

    async getWeatherByGeo(lat, lon) {
        const url = `${this.#baseUrl}?lat=${lat}&lon=${lon}&appid=${this.#appId}`
        const response = await fetch(url).catch(e => alert(e.message))
        if(response.ok){
            return await response.json()
        }else {
            throw new Error(`Error with url: ${this.url}. Details: status: ${response.status}, message: ${response.statusText}`)
        }
        
    }

    async getWeatherForecast(cityId) {
        const url = `${this.#baseUrl}?id=${cityId}&appid=${this.#appId}`
        const response = await fetch(url).catch(e => alert(e.message))
        if(response.ok){
            return await response.json()
        }else {
            throw new Error(`Error with url: ${this.url}. Details: status: ${response.status}, message: ${response.statusText}`)
        }
    }
}
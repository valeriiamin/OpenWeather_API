import { getElem } from "./helper.js"
import {Forecast} from './forecast.js'

export class ForecastListView {
    forecastArray = []
    #forecastTableBody

    constructor(tableBodyId){
        this.#forecastTableBody = document.querySelector(tableBodyId)
    }

    push(item){
        
    }

    showForecast(item) {
        if(item instanceof Forecast) {
            document.querySelectorAll('#table-row').push(this.forecastArray)
            this.forecastArray.forEach(elem => elem.append(item.createElement()))
            // this.#forecastTableBody.append(item.createElement())
        } else { return}
    }
}
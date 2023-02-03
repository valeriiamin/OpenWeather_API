// 1 действие - загрузка страницы
// загрузка для геопозиции https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7db757d57fb1bb5643015749b12656e1
// загрузка для Киева
// загрузка для Лондона
// загрузка для Нью-Йорка
// при нажатии на город - запрос данных на 5 дней https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7db757d57fb1bb5643015749b12656e1

import {getGeoData, getGeoForecast} from './async.js';
import getKyivData from './kyiv.js';
import getLondonData from './london.js';
import getJerusalemData from './jerusalem.js';
// import getGeoForecast from './async.js';
// import setGeoData from './helper.js';

window.addEventListener("load", () => {
    // getGeoData();
    getGeoForecast();
    // getKyivData();
    // getLondonData();
    // getJerusalemData();
});

// изменение стилей
document.querySelectorAll(".accordion").forEach((elem) => {
    elem.addEventListener("click", function () {
        elem.classList.toggle("active");
        let content = elem.nextElementSibling;

        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

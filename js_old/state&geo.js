export const STATE = {
    userCoords:[lat, lon],
    citiesList:[703448, 2643743, 5128638],
    currentForecastList: [],

}
const userPosition = await getUserPosition();
const { latitude: lat, longitude: lon } = userPosition.coords;

const getUserPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};
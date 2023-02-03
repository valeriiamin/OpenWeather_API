// import getGeoData from "./async.js";


// вставка данных с геопозиции в приложение
// const setGeoData = function (getGeoData(geocodingData) ){
//     const {
//         name,
//         main: { temp, pressure },
//     } = geocodingData;

//     const {
//         wind: { speed, deg },
//     } = geocodingData;

//     const {
//         weather: { description, icon },
//     } = geocodingData;

//     const {
//         sys: { sunrise, sunset },
//     } = geocodingData;

//     const sunriseTime = convertTime(sunrise);
// };

// const geocodingData = getGeoData();

// конвертируем unix время восхода и захода Солнца
// function convertTime(param){
//      const date = new Date(param * 1000);
// const hours = date.getHours();
// const minutes = '0' + date.getMinutes();
// const seconds = '0' + date.getSeconds();
// const time = hours + ':' + minutes + ':' + seconds;
// console.log(time);
// }

//получаем температуру в разных единицах
// let tempK = geocodingData.main.temp;
// const tempC = Math. round(tempK - 273);
// const tempF = Math.round(1.8 * (tempK - 273) + 32);
// console.log(tempC, tempF);

// const getTempC = function(geocodingData){
//     let tempK = geocodingData.main.temp;
//     const tempC = tempK - 273;
//     console.log(tempC);
//     return tempC;
// };

// const getTempF = function(geocodingData){
//      const tempK = geocodingData.main.temp;
//      const tempF = 1.8 * (tempK - 273) + 32;
//      return tempF;
// }

// export default setGeoData;
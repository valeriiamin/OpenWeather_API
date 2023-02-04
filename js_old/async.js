export const getGeoData = async function () {
    const userPosition = await getUserPosition();

    const { latitude: lat, longitude: lon } = userPosition.coords;

    const geocodingResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7db757d57fb1bb5643015749b12656e1`
    );

    const geocodingData = await geocodingResponse.json();
    // console.log(geocodingData);

    return geocodingData;
};

const getUserPosition = function () {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

// запрос на несколько дней погода
// export const getGeoForecast = async function(){
//     const userPosition = await getUserPosition();

//     const { latitude: lat, longitude: lon } = userPosition.coords;

//     const geoForecast = await fetch(
//         `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=7db757d57fb1bb5643015749b12656e1`
//     );

//     const geoResponse = await geoForecast.json(); //массив на 5 дней прогноза

//     const {list} = geoResponse;
//     console.log(list);
    
//         list.forEach((i) => {
//             const { dt }  = list[i];
//         console.log(dt);
//         const date =  convertDate(dt);
//         console.log(date);
//         })
        
//     }
        
   //main: { temp, pressure }, weather:[{ description, icon }], wind: { speed, deg }}
    






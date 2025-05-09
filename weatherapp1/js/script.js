
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.getElementById("weather-icon");
const error = document.querySelector(".not-found");

const apiKey = '9649c59005419a941807657cd227f3bb';
const cityElement = document.getElementById("cityName");


async function checkWeather(city) {

    // fetching weather api
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
    // https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&unites=metric

    //const response = await fetch(apiUrl + city + '&appid=' + apiKey);
    const response = await fetch(apiUrl + `${city}&appid=${apiKey}`);
    let data = await response.json(); // data will have information about fetched location


    console.log(data);

    if(data.cod == '404') {

        // Error code display
        document.querySelector(".card").style.height = "400px";
       document.querySelector(".weather-box").classList.remove('active');
       document.querySelector(".weather-details").classList.remove('active');
       document.querySelector(".not-found").classList.add('active');
    } 
    else {

        cityElement.value = "";

        // UI visibility
        document.querySelector(".card").style.height = "555px";
        document.querySelector(".weather-box").classList.add('active');
        document.querySelector(".weather-details").classList.add('active');
        document.querySelector(".not-found").classList.remove('active');


        // display weather forecast
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + '<span>˚C</span>';
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".description").innerHTML = data.weather[0].description;
        document.getElementById("humidity").innerHTML = data.main.humidity + '<span>%</span>';
        document.getElementById("wind").innerHTML = data.wind.speed + '<span>Km/h</span>';


        // display forecast image
        if(data.weather[0].main === "Clouds") {
            weatherIcon.src = "./style/cloudsun.png";
        }
        else if(data.weather[0].main === "Clear") {
            weatherIcon.src = "./style/sun.png";

        }
        else if(data.weather[0].main === "Rain") {
            weatherIcon.src = "./style/rain.png";

        }
        else if(data.weather[0].main === "Drizzle") {
            weatherIcon.src = "./style/drizzle.png";

        }
        else if(data.weather[0].main === "Mist") {
            weatherIcon.src = "./style/drizzle.png";

        }


        }

}

// will call on function when search button is clicked
searchBtn.addEventListener("click",  ()=> {
    checkWeather(cityElement.value);
});
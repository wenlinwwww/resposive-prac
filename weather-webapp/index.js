const apikey = "46f80a02ecae410460d59960ded6e1c6";
const weatherDateEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");
formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    const cityValue = cityInputEl.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    console.log("cityValue", cityValue);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("data", data);
        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;
        const details = [
            `Feel like: ${Math.round(data.main.feels_like)}`,
            `Humidity: ${data.main.humidity}%`,
            `Wind speed: ${data.wind.speed} m/s`];
        weatherDateEl.querySelector(
            ".icon"
        ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon"/>`;
        weatherDateEl.querySelector(
            ".temperature"
        ).textContent = `${temperature}°C`;
        weatherDateEl.querySelector(".description").textContent = description;
        weatherDateEl.querySelector(".details").innerHTML = details
            .map((detail) => `<div>${detail}</div>`).join("");
    } catch (error) {
        //handle errors
        console.log("error");
        weatherDateEl.querySelector(".icon").innerHTML = "";
        weatherDateEl.querySelector(".temperature").innerHTML = "";
        weatherDateEl.querySelector(".details").innerHTML = "";
        weatherDateEl.querySelector(".description").textContent = 
        "An error occurred, please try again later";
    }
}
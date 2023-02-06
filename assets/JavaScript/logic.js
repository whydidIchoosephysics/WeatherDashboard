const apiKey = "ec5505d77c6eea9afb6162e232ff043c";

let citiesArea = $("#city-list");

// http://api.openweathermap.org/data/2.5/forecast?lat=53.48&lon=-2.24&appid=ec5505d77c6eea9afb6162e232ff043c

//   console.log(promise.list[0].dt_txt);
//   console.log("Temperature: " + promise.list[0].main.temp + "°C");
//   console.log("Humidity: " + promise.list[0].wind.speed + "KPH");
//   console.log("Humidity: " + promise.list[0].main.humidity + "%");

function cityNameToCoordinates() {
  let cityName = $("#search-term").val().trim();

  let urlCity =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=1&appid=" +
    apiKey;

  $.ajax({
    url: urlCity,
    method: "GET",
  }).then(function (promise) {
    console.log(promise);
    console.log(promise[0].lat, promise[0].lon);

    let lat = promise[0].lat;
    let lon = promise[0].lon;
    let coords = [lat, lon];

    searchCityWeather(coords);
  });

  console.log(cityName);
}

$("#search-button").on("click", function (event) {
  event.preventDefault();

  let coords = cityNameToCoordinates();

  searchCityWeather(coords);
});

function searchCityWeather(coordinates) {
  let lat = coordinates[0];
  let lon = coordinates[1];

  const baseURL = "http://api.openweathermap.org/data/2.5/forecast?";

  let finalURL =
    baseURL +
    "lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=metric" +
    "&appid=" +
    apiKey;

  $.ajax({
    url: finalURL,
    method: "GET",
  }).then(function (promise) {
    console.log(promise);
    console.log(promise.city.name);
    console.log(promise.city.coord);

    for (i = 0; i < promise.list.length; i = i + 8) {
      console.log(promise.list[i].dt_txt);
      console.log("Temperature: " + promise.list[i].main.temp + "°C");
      console.log("Wind: " + promise.list[i].wind.speed + "KPH");
      console.log("Humidity: " + promise.list[i].main.humidity + "%");
    }
  });
}

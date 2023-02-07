const apiKey = "ec5505d77c6eea9afb6162e232ff043c";

let citiesArea = $("#city-list");
let daysArea = $("#weather-days");
let cityBigName = $("#city-name");

let searchedCities = [];

function cityNameToCoordinates() {
  let cityName = $("#search-term").val().trim();

  searchedCities.push(cityName);

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

    let lat = promise[0].lat.toFixed(3);
    let lon = promise[0].lon.toFixed(3);

    console.log(lat, lon);

    searchCityWeather(lat, lon);
  });

  console.log(cityName);
}

function searchCityWeather(latitude, longitude) {
  const baseURL = "http://api.openweathermap.org/data/2.5/forecast?";

  let finalURL =
    baseURL +
    "lat=" +
    latitude +
    "&lon=" +
    longitude +
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

    daysArea.empty();

    cityName = "String";

    let temperature = promise.list[0].main.temp;
    let wind = promise.list[0].wind.speed;
    let humidity = promise.list[0].main.humidity;

    let tempText = "Temperature: " + temperature + "°C";
    let windText = "Wind: " + wind + "KPH";
    let humidityText = "Humidity: " + humidity + "%";

    cityBigName.text(cityName);
    $("#weather-main p:first-of-type").text(tempText);
    $("#weather-main p:nth-of-type(2)").text(windText);
    $("#weather-main p:nth-of-type(3)").text(humidityText);

    for (i = 0; i < promise.list.length; i = i + 8) {
      let date = promise.list[i].dt_txt.split(" ")[0];
      let temperature = promise.list[i].main.temp;
      let wind = promise.list[i].wind.speed;
      let humidity = promise.list[i].main.humidity;

      let tempText = "Temperature: " + temperature + "°C";
      let windText = "Wind: " + wind + "KPH";
      let humidityText = "Humidity: " + humidity + "%";

      console.log(date);
      console.log(tempText);
      console.log(windText);
      console.log(humidityText);

      let card = $("<div>");
      card.addClass("weather mini-day");
      card.attr("id", "weather-mini" + [i / 8]);

      let dateH4 = $("<h4>");
      dateH4.addClass("date");
      dateH4.attr("id", "weather-" + [i / 8]);
      dateH4.text(date);

      let temp = $("<p>").text(tempText);
      temp.addClass("mini-text");

      let win = $("<p>").text(windText);
      win.addClass("mini-text");

      let hum = $("<p>").text(humidityText);
      hum.addClass("mini-text");

      card.append(dateH4, temp, win, hum);
      daysArea.append(card);
    }
  });
}

function renderButtons() {
  searchedCities.forEach(function (name) {
    citiesArea.empty();
    let button = $("<button>");
    button.addClass("btn btn-secondary btn-block");
    button.attr("type", "button");
    button.text(name);
    citiesArea.append(button);
  });
}

function renderCards() {
  daysArea.empty();

  // Create Big Weather

  cityBigName.text(cityName);
  $("#weather-main p:first-of-type").text("Temperature");
  $("#weather-main p:nth-of-type(2)").text("Wind");
  $("#weather-main p:nth-of-type(3)").text("Humidity");

  // Create small cards

  let card = $("<div>");
  card.addClass("weather mini-day");
  card.attr("id", "weather-mini" + [i / 8]);

  let dateH4 = $("<h4>");
  dateH4.addClass("date");
  dateH4.attr("id", "weather-" + [i / 8]);
  dateH4.text(date);

  let temp = $("<p>").text(tempText);
  temp.addClass("mini-text");

  let win = $("<p>").text(windText);
  win.addClass("mini-text");

  let hum = $("<p>").text(humidityText);
  hum.addClass("mini-text");

  card.append(dateH4, temp, win, hum);
  daysArea.append(card);
}

$(document).ready(function () {
  $("#search-button").on("click", function (event) {
    event.preventDefault();

    let coords = cityNameToCoordinates();

    searchCityWeather(coords);

    renderButtons();

    console.log(searchedCities);
  });
});

$("#add-movie").on("click", function (event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var movie = $("#movie-input").val().trim();

  // The movie from the textbox is then added to our array
  movies.push(movie);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

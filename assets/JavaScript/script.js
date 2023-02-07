const apiKey = "ec5505d77c6eea9afb6162e232ff043c";

//  The base URL for your API calls should look like the following:
// let url =
//       "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=ec5505d77c6eea9afb6162e232ff043c";

// let latitudeCoord = ""
// let longitudeCoord = ""

//  let baseUrl = ("https://api.openweathermap.org/data/2.5/forecast?lat=" latitudeCoord + "&lon=" + longitudeCpprd + "&appid=" + apiKey)

//  $.ajax({
//     url: baseUrl,
//     method: "GET"
//  }.then( function () {
//     console.log(promis)
//  })
//  )

let getWeatherButton = $("#btnGet");
let currentLocationButton = $("#btnCurrent");
let latData = $("#latitude");
let lonData = $("#longitude");

function init() {
  getWeatherButton.on("click", fetchWeather);
  currentLocationButton.on("click", getLocation);

  function fetchWeather(event) {
    let lat = latData.value;
    let lon = lonData.value;
    let key = apiKey;
    let lang = "en";
    let units = "metric";
    //  let url =
    //    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    //    lat +
    //    "&lon=" +
    //    lon +
    //    "&appid=" +
    //    apiKey; //   &appid=${key}&units=${units}&lang=${lang}
    let url =
      "http://api.openweathermap.org/data/2.5/forecast?lat=53.48&lon=-2.24&appid=ec5505d77c6eea9afb6162e232ff043c";

    //  // fetch the weather

    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        showWeather(data);
      })
      .catch(console.err);
  }

  function getLocation(event) {
    let options = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds
      maximumAge: 1000 * 60 * 5, // 5 mins
    };
    navigator.geolocation.getCurrentPosition(ftw, wtf, options);
  }
  function ftw(position) {
    // got position
    latData.value = position.coords.latitude.toFixed(2);
    lonData.value = position.coords.longitude.toFixed(2);
  }
  function wtf(err) {
    console.log(err);
    // geolocation failed
  }
  function showWeather(resp) {
    console.log(resp);
    console.log(resp.list);
    let row = $(".weather.row");
    //  // clear previous weather

    row.innerHTML = resp.list
      .map((day, idx) => {
        if (idx <= 2) {
          return "";
        }
      })
      .join(" ");
  }
}

init();

// Code to try from AI

function getCoordinates(city) {
  $.ajax({
    url: `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`,
    method: "GET",
    dataType: "json",
  }).then({});
}

function getWeather(latitude, longitude) {
  return $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<API_KEY>`,
    method: "GET",
    dataType: "json",
  });
}

$(document).ready(function () {
  let city = prompt("Enter the city name: ");
  getCoordinates(city).done(function (data) {
    let latitude = data.results[0].geometry.lat;
    let longitude = data.results[0].geometry.lng;
    getWeather(latitude, longitude).done(function (data) {
      console.log(data);
    });
  });
});

// Code to try #2

function getCoordinates(city) {
  return $.ajax({
    url: `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=<API_KEY>`,
    method: "GET",
    dataType: "json",
  });
}

function getWeather(latitude, longitude) {
  return $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<API_KEY>`,
    method: "GET",
    dataType: "json",
  });
}

$(document).ready(function () {
  let city = prompt("Enter the city name: ");
  getCoordinates(city)
    .then(function (data) {
      let latitude = data.results[0].geometry.lat;
      let longitude = data.results[0].geometry.lng;
      return getWeather(latitude, longitude);
    })
    .then(function (data) {
      console.log(data);
    });
});

// Code #3

function getCoordinates(city) {
  return $.ajax({
    url: `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`,
    method: "GET",
    dataType: "json",
  });
}

function getWeather(latitude, longitude) {
  return $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<API_KEY>`,
    method: "GET",
    dataType: "json",
  });
}

$(document).ready(function () {
  $("#search-button").click(function () {
    let city = $("#city-input").val();
    getCoordinates(city)
      .then(function (data) {
        let latitude = data.results[0].geometry.lat;
        let longitude = data.results[0].geometry.lng;
        return getWeather(latitude, longitude);
      })
      .then(function (data) {
        let weather = data.weather[0].main;
        let icon = data.weather[0].icon;
        let temperature = data.main.temp;
        let humidity = data.main.humidity;
        let windSpeed = data.wind.speed;

        $("#weather-card").html(`
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Weather in ${city}</h5>
              <p class="card-text">
                <img src="http://openweathermap.org/img/w/${icon}.png" />
                <br>
                Weather: ${weather}
                <br>
                Temperature: ${temperature}°C
                <br>
                Humidity: ${humidity}%
                <br>
                Wind Speed: ${windSpeed} m/s
              </p>
            </div>
          </div>
        `);
      });
  });
});

// Code #4

function getCoordinates(city) {
  return $.ajax({
    url: `https://api.opencagedata.com/geocode/v1/json?q=${city}&key=<API_KEY>`,
    method: "GET",
    dataType: "json",
  });
}

function getWeather(latitude, longitude) {
  return $.ajax({
    url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=<API_KEY>`,
    method: "GET",
    dataType: "json",
  });
}

$(document).ready(function () {
  let cities = [];

  $("#search-button").click(function () {
    let city = $("#city-input").val();
    getCoordinates(city)
      .then(function (data) {
        let latitude = data.results[0].geometry.lat;
        let longitude = data.results[0].geometry.lng;
        return getWeather(latitude, longitude);
      })
      .then(function (data) {
        cities.push({
          name: city,
          weather: data,
        });

        let cityList = "";
        for (let i = 0; i < cities.length; i++) {
          cityList += `<button class="city-button" id="city-${i}">${cities[i].name}</button>`;
        }

        $("#city-list").html(cityList);

        $(".city-button").click(function () {
          let id = $(this).attr("id").split("-")[1];
          let weather = cities[id].weather;

          let temperature = weather.main.temp;
          let humidity = weather.main.humidity;
          let windSpeed = weather.wind.speed;
          let weatherDescription = weather.weather[0].main;
          let icon = weather.weather[0].icon;

          $("#weather-card").html(`
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Weather in ${city}</h5>
                <p class="card-text">
                  <img src="http://openweathermap.org/img/w/${icon}.png" />
                  <br>
                  Weather: ${weatherDescription}
                  <br>
                  Temperature: ${temperature}°C
                  <br>
                  Humidity: ${humidity}%
                  <br>
                  Wind Speed: ${windSpeed} m/s
                </p>
              </div>
            </div>
          `);
        });
      });
  });
});

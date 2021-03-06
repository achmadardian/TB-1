let weather = {
  apiKey: "0a5b88d30d1aa6d8bc0312a9cc30ec1f",
  fetchWeather: function (city) {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey + "&lang=id")
      .then((response) => {
        if (!response.ok) {
          alert("Pastikan nama kota atau negara benar.");
          throw new Error("Pastikan nama kota atau negara benar.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { temp_min, temp_max } = data.main;
    document.querySelector(".city").innerText = "Keadaan cuaca di " + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Kelembaban: " + humidity + "%";
    document.querySelector(".wind").innerText = "Kecepatan angin: " + speed + " km/h";
    document.querySelector(".temp-min").innerText = "Temperature minimal: " + temp_min + "°C";
    document.querySelector(".temp-max").innerText = "Temperature maximal: " + temp_max + "°C";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Jakarta");

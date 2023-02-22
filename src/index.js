function convertUnixToTime(unix_timestamp) {
  // Convert Unix timestamp to JavaScript Date object
  var date = new Date(unix_timestamp * 1000);

  var hours = date.getHours();
  var minutes = date.getMinutes();
  var am_pm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var formattedTime = hours + ":" + minutes + " " + am_pm;
  return formattedTime;
}

var options2 = {
  series: [
    {
      name: "Sales",
      data: [],
    },
  ],
  colors: ["#f77c2f", "#F0BF6E"],
  chart: {
    height: 350,
    type: "line",
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "straight",
  },

  title: {
    text: "24 Hour temp Forecast",
    align: "left",
    style: {
      color: "white",
      fontWeight: 600,
    },
  },
  legend: {
    tooltipHoverFormatter: function (val, opts) {
      return (
        val +
        " - " +
        opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
        ""
      );
    },
    labels: {
      colors: "grey",
    },
  },
  markers: {
    size: 0,
    hover: {
      sizeOffset: 6,
    },
  },
  tooltip: {
    y: [
      {
        title: {
          formatter: function (val) {
            return val;
          },
        },
      },
      {
        title: {
          formatter: function (val) {
            return val;
          },
        },
      },
      {
        title: {
          formatter: function (val) {
            return val;
          },
        },
      },
    ],
  },
  xaxis: {
    categories: [],
    axisTicks: {
      show: false,
      height: 100,
      offsetX: 0,
      offsetY: 0,
    },
    axisBorder: {
      show: true,
      color: "white",
      height: 1,
      width: "100%",
      offsetX: 0,
      offsetY: 0,
    },
  },

  yaxis: {
    lines: {
      show: true,
      color: "#0000ff",
    },

    labels: {
      style: {
        fontSize: "12px",
        colors: "white",
      },
    },
  },
  grid: {
    show: true,
    borderColor: "#90A4AE",
    strokeDashArray: 0,
    position: "back",
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
        offsetY: 30,
      },
    },
    row: {
      colors: undefined,
      opacity: 0.5,
    },
    column: {
      colors: undefined,
      opacity: 0.5,
    },
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  },
};

let chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
chart2.render();

let apiKey = "f08ff0c0a00f88dd53b1c5107dc3824b";
let apiKey2 = "7cfec588c1221a4c4905a1ef703adc06";

function drawChart(city) {
  let fiveDayForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey2}`;
  axios.get(fiveDayForecastUrl).then(function (response) {
    let hoursInfo = response.data.list;
    var maxTemps = [];
    var minTemps = [];
    var categories = [];
    for (let i = 1; i < 10; i++) {
      let dateString = hoursInfo[i].dt_txt;
      let hourMinute = dateString.slice(11, 16);
      let minTemp = Math.floor(hoursInfo[i].main.temp_min);
      let maxTemp = hoursInfo[i].main.temp_max;
      categories.push(hourMinute);
      minTemps.push(minTemp);
      maxTemps.push(maxTemp);
    }
    chart2.updateOptions({
      series: [
        {
          name: "Max Temp",
          data: maxTemps,
        },
        {
          name: "Min Temp",
          data: minTemps,
        },
      ],
      xaxis: {
        categories: categories,
        lines: {
          colors: "yellow",
        },
        labels: {
          style: {
            colors: "#d5dbe0",
            fontSize: "12px",
          },
        },
      },
    });
  });
}

let time = document.querySelector("#time");
let now = new Date();
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
time.innerHTML = `${
  daysOfWeek[now.getDay()]
} ${now.getHours()}:${now.getMinutes()}`;

function writeDays(city) {
  let fiveDayForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey2}`;
  axios.get(fiveDayForecastUrl).then(function (response) {
    for (var i = 0; i < 5; i++) {
      var dayDiv = document.getElementById("day" + (i + 1));
      let imgIcon = document.getElementById("day" + (i + 1) + "-icon");
      let highLow = document.getElementById("high-low-" + (i + 1));
      highLow.innerHTML = `${Math.round(
        response.data.list[i + 7].main.feels_like
      )}° ${Math.round(response.data.list[i + 7].main.temp_max)}°`;
      let imgUrl = `https://openweathermap.org/img/wn/${
        response.data.list[i + 7].weather[0].icon
      }@2x.png`;
      imgIcon.setAttribute("src", imgUrl);
      dayDiv.innerHTML = daysOfWeek[(now.getDay() + i + 1) % 7];
    }
  });
}

// todayImg.src = todayImgUrl;
// todayImg.src = "pic.jpg";
//todayImg

const searchBox = document.getElementById("searchBox");
let heading_temp = document.getElementById("heading-temp");
let temp = document.getElementById("temp");
let weather_setting = document.querySelector(".weather-setting");
let wind = document.getElementById("wind");
let visibility = document.getElementById("visibility");
let humidity = document.getElementById("humidity");
let pressure = document.getElementById("pressure");
let clouds = document.getElementById("clouds");
let feelsLike = document.getElementById("feels-like");
let weatherDescription = document.getElementById("weather-description");
let minTemp = document.getElementById("min-temp");
let maxTemp = document.getElementById("max-temp");
let sunriseTime = document.getElementById("sunrise-time");
let sunsetTime = document.getElementById("sunset-time");
let todayicon = document.getElementById("day0-icon");
let todayHighLow = document.getElementById("high-low-0");

let unitsMap = {
  "°F": "Imperial",
  "°C": "Metric",
};
let aqiMap = {
  1: "Good",
  2: "Fair",
  3: "Moderate",
  4: "Poor",
  5: "Very Poor",
};
let healthRecomMap = {
  1: " Air quality is satisfactory, and air pollution poses little or no risk.",
  2: " Air quality is acceptable. There may be a risk for  those who are unusually sensitive to air pollution.",
  3: " Members of sensitive groups may experience health effects. The general public is less likely to be affected.",
  4: " Members of sensitive groups may experience more serious health effects.",
  5: " Health alert,The risk of health effects is increased for everyone.",
};

// let url = `https://api.openweathermap.org/data/2.5/weather?q=Tehran&appid=${apiKey}&units=metric`;

let units = "";
function currentDay(city) {
  if (weather_setting.innerHTML === "°C") {
    units = "metric";
    var tempUnit = "°C";
  } else {
    units = "Imperial";
    var tempUnit = "°F";
  }
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(function (response) {
    heading_temp.innerHTML = Math.round(response.data.main.temp) + tempUnit;
    temp.innerHTML = Math.round(response.data.main.temp) + tempUnit;
    wind.innerHTML = Math.round(response.data.wind.speed) + " m/s";
    visibility.innerHTML = Math.round(response.data.visibility) / 1000 + " km";
    humidity.innerHTML = Math.round(response.data.main.humidity) + "%";
    pressure.innerHTML = response.data.main.pressure + " hPa";
    clouds.innerHTML = Math.round(response.data.clouds.all) + "%";
    feelsLike.innerHTML = Math.round(response.data.main.feels_like) + tempUnit;
    weatherDescription.innerHTML = response.data.weather[0].description;
    minTemp.innerHTML = response.data.main.temp_min.toFixed(1) + tempUnit;
    maxTemp.innerHTML = response.data.main.temp_max.toFixed(1) + tempUnit;
    sunriseTime.innerHTML = convertUnixToTime(response.data.sys.sunrise);
    sunsetTime.innerHTML = convertUnixToTime(response.data.sys.sunset);
    let todayImgUrl = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    todayicon.setAttribute("src", todayImgUrl);
    todayHighLow.innerHTML = `${Math.round(response.data.main.temp_max)}°
    ${Math.round(response.data.main.temp_min)}°`;
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;

    let aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    axios.get(aqiUrl).then(function (response) {
      let aqi = document.getElementById("aqi-index");
      let weatherQuality = document.getElementById("weather-quality");
      let spanhealthRecom = document.getElementById("health-recom");

      aqi.innerHTML = response.data.list[0].main.aqi;
      weatherQuality.innerHTML = aqiMap[response.data.list[0].main.aqi];
      spanhealthRecom.innerHTML =
        healthRecomMap[response.data.list[0].main.aqi];
    });
  });
}

writeDays("tehran");
drawChart("tehran");
currentDay("tehran");

searchBox.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    dropdown.innerHTML = "";
    // 13 is the enter key code
    event.preventDefault(); // Prevent the default form submission
    let city = searchBox.value;
    writeDays(city);
    drawChart(city);
    units = unitsMap[weather_setting.innerHTML];
    const modifiedString =
      city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
    let location = document.getElementById("location");
    location.innerHTML = modifiedString;
    currentDay(city);
  }
});
let temp_icon = document.querySelector(".temperature");
temp_icon.addEventListener("click", function (event) {
  event.preventDefault();
  let location = document.getElementById("location");
  if (weather_setting.innerHTML === "°F") {
    weather_setting.innerHTML = "°C";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location.innerHTML}&appid=${apiKey}&units=Metric`;

    axios.get(url).then(function (response) {
      console.log(response.data);
      heading_temp.innerHTML = Math.round(response.data.main.temp) + "°C";
      temp.innerHTML = Math.round(response.data.main.temp) + "°C";
      minTemp.innerHTML = response.data.main.temp_min.toFixed(1) + "°C";
      maxTemp.innerHTML = response.data.main.temp_max.toFixed(1) + "°C";
      feelsLike.innerHTML = Math.round(response.data.main.feels_like) + "°C";
    });
  } else {
    weather_setting.innerHTML = "°F";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location.innerHTML}&appid=${apiKey}&units=Imperial`;

    axios.get(url).then(function (response) {
      console.log(response.data);
      heading_temp.innerHTML = Math.round(response.data.main.temp) + "°F";
      temp.innerHTML = Math.round(response.data.main.temp) + "°F";
      minTemp.innerHTML = response.data.main.temp_min.toFixed(1) + "°F";
      maxTemp.innerHTML = response.data.main.temp_max.toFixed(1) + "°F";
      feelsLike.innerHTML = Math.round(response.data.main.feels_like) + "°F";
    });
  }
});

var options = {
  series: [
    {
      data: [
        {
          x: "Temperature",
          y: [54, 66, 69, 75, 88],
        },
        {
          x: "Pressure",
          y: [43, 65, 69, 76, 81],
        },
        {
          x: "Humidity",
          y: [31, 39, 45, 51, 59],
        },
        {
          x: "Wind",
          y: [39, 46, 55, 65, 71],
        },
        {
          x: "Precipitation",
          y: [29, 31, 35, 39, 44],
        },
        {
          x: "Clouds",
          y: [41, 49, 58, 61, 67],
        },
      ],
    },
  ],
  chart: {
    type: "boxPlot",
    height: 350,
  },
  title: {
    text: "BoxPlot Chart",
    align: "left",
    style: {
      color: "white",
      fontWeight: 600,
    },
  },

  plotOptions: {
    bar: {
      horizontal: false,
      barHeight: "50%",
    },
    boxPlot: {
      colors: {
        upper: "#EDB830",
        lower: "#968230",
      },
      dataLabels: {
        text: {
          colors: "#d5dbe0",
        },
      },
    },
  },
  xaxis: {
    lines: {
      colors: "yellow",
    },

    labels: {
      style: {
        colors: "#d5dbe0",
        fontSize: "12px",
      },
    },
  },
  yaxis: {
    lines: {
      show: true,
      color: "#0000ff",
    },

    labels: {
      style: {
        fontSize: "12px",
        colors: "white",
      },
    },
  },
  stroke: {
    colors: ["grey"],
  },
  // grid: {
  //   row: {
  //     colors: ["#F44336", "#E91E63", "#9C27B0"],
  //   },
  // },
  markers: {
    colors: ["#F44336", "#E91E63", "#9C27B0"],
  },
  grid: {
    show: true,
    borderColor: "grey",
    strokeDashArray: 0,
    position: "back",
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
    row: {
      colors: undefined,
      opacity: 0.5,
    },
    column: {
      colors: undefined,
      opacity: 0.5,
    },
  },
};

var chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();

let cities = null;
fetch("city-names.json")
  .then((response) => response.json())
  .then((data) => {
    cities = data;
  });

//autocomplete part
suggestion = document.getElementById("suggestion");

let searchInput = document.getElementById("searchBox");
let dropdown = document.getElementById("suggestion");
// Add an event listener to the search bar to detect input
searchBox.addEventListener("input", (event) => {
  dropdown.innerHTML = "";

  // Get the value of the search bar
  let searchValue = searchBox.value;
  if (searchValue.length >= 2) {
    // let searchValue = event.target.value;

    // Filter the list of cities based on the search value
    let filteredCities = cities.filter((city) => {
      return city.toLowerCase().startsWith(searchValue.toLowerCase());
    });

    filteredCities.slice(0, 10).forEach((city) => {
      let button = document.createElement("button");
      button.innerHTML = city;
      button.classList.add("list-group-item");
      button.classList.add("list-group-item-action");
      button.setAttribute("type", "button");
      dropdown.appendChild(button);
    });
  }
});

dropdown.addEventListener("click", (event) => {
  var target = event.target;
  //   alert(target.innerHTML);
  searchInput.value = target.innerHTML;
  dropdown.innerHTML = "";
});

searchInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 34) {
    // 34 is the key code for the page down key
    event.preventDefault();
    dropdown.scrollTop = 0;
  }
});

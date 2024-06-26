import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WiHumidity } from "react-icons/wi";

import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";

import clear_icon from "../Assets/clear.png";

import search_icon from "../Assets/search.png";
import cloud_icon from "../Assets/cloud.png";
import clear from "../resources/clear.avif";
import cloud from "../resources/cloud.jpg";
import drizzle from "../resources/drizzle.jpg";
import rain from "../resources/rain.jpg";
import snow from "../resources/snow.jpeg";
import { GiWindSlap } from "react-icons/gi";

const WeatherApp = () => {
  let apiKey = "a4eec7822601e6b81ee7522bec958a0c";
  const [wicon, setWicon] = useState(cloud_icon);
  const [Background, setBackground] = useState(cloud);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      toast.error("Please enter a city name!");
      return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${apiKey}`;
    let response = await fetch(url);

    if (!response.ok) {
      toast.error("City not found. Please enter a valid city name!");
      return;
    }

    let data = await response.json();

    const humidity = document.getElementsByClassName("humidity-percentage");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    humidity[0].innerHTML = Math.floor(data.main.humidity) + "%";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " Km/h";
    temperature[0].innerHTML = data.main.temp + "°C";
    location[0].innerHTML = data.name;

    switch (data.weather[0].icon) {
      case "01d":
      case "01n":
        setWicon(clear_icon);
        setBackground(clear);
        break;
      case "02d":
      case "02n":
        setWicon(cloud_icon);
        setBackground(cloud);
        break;
      case "03d":
      case "03n":
        setWicon(drizzle_icon);
        setBackground(drizzle);
        break;
      case "04d":
      case "04n":
        setWicon(clear_icon);
        setBackground(clear);
        break;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        setWicon(rain_icon);
        setBackground(rain);
        break;
      case "13d":
      case "13n":
        setWicon(snow_icon);
        setBackground(snow);
        break;
      default:
        setWicon(clear_icon);
        setBackground(clear);
        break;
    }
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center min-h-screen w-full flex flex-col justify-center items-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <ToastContainer />
      <div className="bg-white bg-opacity-20 backdrop-blur-md mx-auto p-4 shadow-lg flex flex-col items-center justify-center w-[400px] h-[600px] rounded-lg mt-[-10px] text-gray-800">
        <div className="top-bar flex justify-between items-center w-full mb-6">
          <div className="flex items-center w-full">
            <input
              type="text"
              className="cityInput border border-gray-300 rounded-l-md py-2 px-4 w-full"
              placeholder="Search"
              style={{ backgroundColor: "#f0f0f0" }}
            />
            <div
              className="search-icon cursor-pointer bg-gray-300 p-2 rounded-r-md ml-2"
              onClick={search}
            >
              <img src={search_icon} alt="search icon" className="w-6 h-6" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-4">
          <img src={wicon} alt="weather icon" className="w-24 h-24" />
          <div className="weather-temp text-4xl font-bold mt-4">24°C</div>
          <div className="weather-location text-xl mt-2">London</div>

          <div className="data-container flex justify-around w-full mt-8">
            <div className="element flex items-center mr-8">
              {/* <img src={humidity_icon} alt="humidity icon" className="w-8 h-8" /> */}
              <WiHumidity className="w-8 h-8"/>
             
              <div className="data ml-2">
                <div className="humidity-percentage font-bold text-lg">64%</div>
                <div className="text-xs text-gray-700">Humidity</div>
              </div>
            </div>
            <div className="element flex items-center ml-8">
              {/* <img src={wind_icon} alt="wind icon" className="w-8 h-8" /> */}

              <GiWindSlap className="w-8 h-8"/>
              <div className="data ml-2">
                <div className="wind-rate font-bold text-lg">18 Km/h</div>
                <div className="text-xs text-gray-700">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;

window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(".temperature-description");
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api =`//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=5a4d15891346020245a189c31c45313d`;

      fetch(api)
        .then(response =>{
          return response.json();
        })
        .then(data =>{
          console.log(data);
          const {temp} = data.main;
          const {description, icon} = data.weather[0]; 
          const {country} = data.sys;
          const temperature = (temp - 273.15) * 9 / 5 + 32;
          //Set DOM Elements from API
          temperatureDegree.textContent = Math.floor(temperature);
          temperatureDescription.textContent = description;
          locationTimezone.textContent = country;
          //foremula for selsius
          let celsius = (temperature - 32) * (5 / 9);
          //Set icon
          const iconID = icon;
          const iconUrl = "http://openweathermap.org/img/w/" + iconID + ".png";
          const icon1 = document.getElementById("icon1");
          icon1.src = iconUrl;
          
          //Change temperature 
          temperatureSection.addEventListener('click', () =>{
            if(temperatureSpan.textContent === "F"){
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            }else{
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(temperature);
            }
          });
        })
    });
  } 
});
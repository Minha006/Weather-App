const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


search.addEventListener('click', () => {

    const APIKey = '62dc0386f7ec2594ccadc5a8cbc69caf';
    const city = document.querySelector('.search-box input').value;

  if(city == '')
    return;
  
 fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(Response => Response.json())
     .then(json => {
        if(json.cod === '404'){
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
               return;
        }
           container.style.height = '555px';
           weatherBox.classList.add('active');
           weatherDetails.classList.add('active');
           error404.classList.remove('active');
              
         const image = document.querySelector('.weather-box img');
         const temperature = document.querySelector('.weather-box .temperature');
         const description = document.querySelector('.weather-box .description');
         const humidity = document.querySelector('.weather-details .humidity span');
         const wind = document.querySelector('.weather-details .Wind span');

      switch (json.weather[0].main) {
        case 'Clear':
            image.src = './Assets/sun png.png';
            break;
      
        case 'Rain': 
            image.src = './Assets/thunderstorm-rain-3d-render-png.webp';
            break;

        case 'Snow': 
            image.src = './Assets/snow.png';
            break; 
            
        case 'Cloud': 
            image.src = './Assets/cloud.png';
            break; 

        case 'Mist':
            image.src = './Assets/mist.png';
             break;
         
        case 'Haze':
            image.src = './Assets/haze.png.png';
             break;

        default:
            image.src = './Assets/3d-weather-icon-day-free-png.webp';
       }    
          temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
          description.innerHTML = `${json.weather[0].description}`;
          humidity.innerHTML = `${json.main.humidity}%`;
          wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });

});

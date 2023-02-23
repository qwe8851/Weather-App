const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = 'bb0b2a37df3a8ef60110c66820badd47';
    const city = document.querySelector('.search-box input').value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(resp => resp.json())
    .then(json=> {
        if(json.code === '404'){
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display ='block';
            error404.classList.add('fadeIn');
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('weater-details .humidity');
        const wind = document.querySelector('weater-details .wind span');

        switch(json.weather[0].main){
            case 'Clear' : 
                image.src = 'images/clear.png';

            case 'Rain':
                image.src = 'images/Rain.png';

            case 'Snow':
                image.src = 'images/Snow.png';

            case 'Clouds':
                image.src = 'images/Clouds.png';

            case 'Mist':
                image.src = 'images/mist.png';
            
            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${paresInt(json.wind.speed)}Km/h`;

        weatherBox.style.display='';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '590px';
    });
});
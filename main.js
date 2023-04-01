//object factory
function weather(name, temp_f, feelslike_f, gust_mph, humidity) {
    return{name, temp_f, feelslike_f, gust_mph, humidity}
}
//async await gets data
async function getWeather(location) {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=2964ab63e4934c09be8171808233103&q=${location}`);
    const data = await response.json();
   
    arrWeather.push(weather(data.location.name, data.current.temp_f, data.current.feelslike_f, data.current.gust_mph, data.current.humidity));
     displayData(arrWeather);
}
//displays data
function displayData(arrWeather){
    //input elements
    let container = document.getElementById('weather-container');
    //removes existing elements
    while(container.hasChildNodes()){
    container.removeChild(container.firstChild);
}

    arrWeather.forEach(arr => {
        //create the box element
        let box = document.createElement('div');
        box.classList.add('item');

        //creates and adds the text to the box
        let city = document.createElement('p');
        city.classList.add('city');
        city.innerText = arr.name;

        let temp = document.createElement('p');
        temp.classList.add('temp');
        temp.innerText = arr.temp_f + '°';

        let feels = document.createElement('p');
        feels.classList.add('feels');
        feels.innerText = 'feels like '+ arr.feelslike_f+ '°';

        let wind = document.createElement('p');
        wind.classList.add('wind');
        wind.innerText = 'wind speed ' + arr.gust_mph + ' mph';

        let humid = document.createElement('p');
        humid.classList.add('humid');
        humid.innerText = 'humidity ' + arr.humidity + '%';
        //adds the box elemnt to the page
        box.appendChild(city);
        box.appendChild(temp);
        box.appendChild(feels);
        box.appendChild(wind);
        box.appendChild(humid);
        container.appendChild(box);
    });
}

let arrWeather = [];

getWeather('baltimore');

let input = document.getElementById('input');

input.addEventListener('keydown',(e) =>{
    if(e.key == 'Enter') {
        getWeather(input.value);
    }
})
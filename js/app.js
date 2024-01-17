(function($, document, window) {

    $(document).ready(function() {

        // Cloning main navigation for mobile menu
        $(".mobile-navigation").append($(".main-navigation .menu").clone());

        // Mobile menu toggle 
        $(".menu-toggle").click(function() {
            $(".mobile-navigation").slideToggle();
        });
    });

    $(window).load(function() {

    });

})(jQuery, document, window);


// COMMUNICATING WITH FORECAST JS
const defaultCity = 'Mumbai';
const cityForm = document.querySelector('form');
const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const imagePath = "images/icons/";

const updateUI = (data, cityName) => {
    const locations = document.getElementsByClassName('location');
    const location = locations[0];
    const days = document.getElementsByClassName('day');
    const date = document.getElementsByClassName('date')[0];
    const temps = document.getElementsByClassName('temp');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');
    const windDegree = document.getElementById('wind-degree');
    const icons = document.getElementsByClassName('weather-icon');

    location.innerHTML = cityName;
    humidity.innerHTML = data.list[0].main.humidity + "%";

    //1m/sec = 3.6km/hr
    const apiWindSpeed = data.list[0].wind.speed;
    const apiWindDeg = data.list[0].wind.deg;

    windSpeed.innerHTML = Math.round((apiWindSpeed * 3.6 * 10))/10 + "km/hr";
    windDegree.innerHTML = apiWindDeg + "<sup>o</sup>";

    const todaysDate = new Date(data.list[0].dt_txt);
    const todaysDay = todaysDate.getDay();

    console.log(todaysDay);

    const todaysMonth = monthsNames[todaysDate.getMonth()];

    date.innerHTML = todaysDate.getDate() + " " + todaysMonth;

    let i = 0;
    let j = 0;
    for(let element of days) {
        const dayName = dayNames[(todaysDay + i)%7];
        element.innerHTML = dayName;

        const temp = Math.round(data.list[j].main.temp);
        temps[i].innerHTML = temp + "<sup>o</sup>C";

        icons[i].src = imagePath + data.list[j].weather[0].icon + ".svg";
        i++;
        j+=8;
    }
};

cityForm.addEventListener('submit', evt => {
    evt.preventDefault();

    let cityName = cityForm.city.value;
    if(cityName==="") {
        cityName = defaultCity;
    }

    getForecast(cityName)
        .then(data => updateUI(data, cityName))
        .catch(err => alert(err));
});


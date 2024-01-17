const API_KEY = "3aa9b280bb0e9439a670520c38463e3f";
const BASE_URL = "http://api.openweathermap.org/data/2.5/forecast";

const getForecast = async (city) => {
    let requestURL = BASE_URL + `?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(requestURL);

    if(response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error ("Status Code: " + response.status);
    }

}


function getTodaysDate(date) {
    date = new Date();
    const isoString = date.toISOString();
    const formattedDate = isoString.split("T")[0];
    formattedDate.toString();
    console.log(formattedDate);
    return formattedDate;
}


//get user input and capitalize the first letter because docs wants first letter like that
function getUserInput(location) {
    const userInput = document.querySelector("#userInput");
    location = userInput.value;
    const capitalized = location.charAt(0).toUpperCase() + location.slice(1);
    return capitalized;
}

/* function createApiUrl() {
    const url =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";
    const apiKey = "?key=QARTRYEARU82C4QTZQ24YZ36K";
    
    let apiUrl = `${url}/${getUserInput()}/${getTodaysDate()}${apiKey}`;
    console.log(apiUrl);
    return apiUrl;
} */

/* const weatherButton = document.querySelector("#weatherButton");
weatherButton.addEventListener("click", displayUrl);

function displayUrl() {
    //const dataDisplay = document.querySelector("#display");
    const displayHeader = document.querySelector("#headerLocation");

    displayHeader.innerText = getUserInput()
    //dataDisplay.innerText = createApiUrl();
} */

const Api = {
    baseUrl: "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
    location: "London/", //getUserInput() note slash (/) after location
    date: getTodaysDate(),
    unit: "?unitGroup=metric",
    include: "&include=days",
    apiKey: "&key=QARTRYEARU82C4QTZQ24YZ36K",

    //url: https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/2022-02-01/next5days?unitGroup=us&key=YOUR_API_KEY 

}
/* let str = Object.keys(Api).map(function(key) {
    return Api[key];
}).join("");
console.log(str); */

//console.log("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/2022-02-01?unitGroup=metric&include=days&key=QARTRYEARU82C4QTZQ24YZ36K");

async function getDataFromApi() {
    const res = await fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Stockholm/2022-02-01?unitGroup=metric&include=current&key=QARTRYEARU82C4QTZQ24YZ36K");
    const data = await res.json();
    console.log(data);
    return data;
}

const weatherButton = document.querySelector("#weatherButton");
weatherButton.addEventListener("click", handleClick);

async function handleClick() {
    const dataDisplay = document.querySelector("#display");
    const displayHeader = document.querySelector("#headerLocation");

    const data = await getDataFromApi();
    displayHeader.innerText = data.days[0].description;
    dataDisplay.innerText = "todays temp: " + data.days[0].temp;
}
const url = "https://api.nasa.gov/planetary/apod?api_key=35P9n6JvLIivmwZxIptpRFNgziN7pCyuZ9bAycjz";

//QARTRYEARU82C4QTZQ24YZ36K
/* async function main() {
    const weather = await fetch(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK/last30days?key=QARTRYEARU82C4QTZQ24YZ36K&contentType=json",{ mode: "no-cors"}
    );
    const data = await weather.json();
    console.log(data);
}
*/

//35P9n6JvLIivmwZxIptpRFNgziN7pCyuZ9bAycjz

const catButton = document.querySelector("#catButton");
const imgElement = document.querySelector("#catDisplay");
const inputElement = document.querySelector("input");


async function getData(date) {
    const res = await fetch(url + "&date=" + date);
    const data = await res.json();
    console.log(data);
    return data;
}

catButton.addEventListener("click", handleClick);


async function handleClick() { 
const date = inputElement.value;
console.log(date);

if(date === " ") {
    console.log("Please enter a date");
    return;
}

const data = await getData(date);

imgElement.src = data.url;



}
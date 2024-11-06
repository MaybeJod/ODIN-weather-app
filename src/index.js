const Api = {
	baseUrl:"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
    location: "",
	date: getTodaysDate(),
	unit: "?unitGroup=metric",
	include: "&include=days",
	apiKey: "&key=QARTRYEARU82C4QTZQ24YZ36K",
};

function getTodaysDate(date) {
	date = new Date();
	const isoString = date.toISOString();
	const formattedDate = isoString.split("T")[0];
	formattedDate.toString();
	return formattedDate;
}

function getUserInput() {
	const userInput = document.querySelector("#userInput");
	let location = userInput.value;
	if (!location) {
		console.log("enter a location");
	} else {
		console.log(location);
		return location;
	}
}

function createApiUrl() {
    Api["location"] = getUserInput() + "/"
	let apiUrl = Object.keys(Api).map(function (key) {
			return Api[key];
		})
		.join("");
	return apiUrl;
}

async function getDataFromApi() {
	const res = await fetch(createApiUrl());
	const data = await res.json();
	console.log(data);
	return data;
}

const weatherButton = document.querySelector("#weatherButton");
weatherButton.addEventListener("click", handleClick);

async function handleClick() {
	const dataDisplay = document.querySelector("#display");
	const displayHeader = document.querySelector("#headerLocation");

	if (getUserInput()) {
		const data = await getDataFromApi();
		displayHeader.innerText = data.days[0].description;
		dataDisplay.innerText = "todays temp: " + data.days[0].temp + "˚";
	} else {
		console.log("error");
	}
}

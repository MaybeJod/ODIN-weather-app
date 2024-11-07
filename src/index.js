const Api = {
	baseUrl:
		"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/",
	location: "london",
	date: getTodaysDate(),
	unit: "?unitGroup=metric",
	include: "&include=days",
	apiKey: "&key=QARTRYEARU82C4QTZQ24YZ36K",
};

function getTodaysDate() {
	const date = new Date();
	const isoString = date.toISOString();
	const formattedDate = isoString.split("T")[0];
	return formattedDate;
}

function getCurrentTime() {
	const date = new Date();
	const isoString = date.toISOString();
	const formattedTime = isoString.split("T")[1].split(".")[0];
	return formattedTime;
}

function updateTime() {
	const currentTimeDisplay = document.querySelector("#currentTime");
	currentTimeDisplay.innerText = getCurrentTime();
	return currentTimeDisplay;
}

setInterval(updateTime, 1000);

function getUserInput() {
	const userInput = document.querySelector("#userInput");
	let location = userInput.value;
	if (!location) {
		console.log("enter a location");
	} else {
		return location;
	}
}

function createApiUrl() {
	Api.location = getUserInput() + "/";
	let apiUrl = Object.keys(Api)
		.map(function (key) {
			return Api[key];
		})
		.join("");
	console.log(apiUrl);
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
	const displayHeader = document.querySelector("#headerLocation");
	const dataDisplay = document.querySelector("#temp");
	const feelsLikeTempDisplay = document.querySelector("#feelsLikeTemp");
	const minMaxTempDisplay = document.querySelector("#minMaxTemp");

	const descriptionDisplay = document.querySelector("#weatherDescription");

	if (getUserInput()) {
		const data = await getDataFromApi();

		displayHeader.innerText = data.resolvedAddress;
		dataDisplay.innerText = data.days[0].temp + "˚";
		feelsLikeTempDisplay.innerText =
			"Feels like: " + data.days[0].feelslike + "˚";
		minMaxTempDisplay.innerText = `H:${data.days[0].tempmax}˚ L:${data.days[0].tempmin}˚`;
		//currentTimeDisplay.innerText = getCurrentTime();
		descriptionDisplay.innerText = data.days[0].description;
	} else {
		console.log("error");
	}
}
var currentAddress = document.querySelector("#userAddress")
var searchButton = document.querySelector("#search-button")
var breweryData = []

var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log(event);
    var startingPoint = currentAddress.value
    console.log('startingPoint var', startingPoint)
    // getMapQuest(startingPoint);
    addressToLatLon(startingPoint);
}

var addressToLatLon = function (startingPoint){
    console.log('startingpoint', startingPoint);
    var geoCodeApi = `http://www.mapquestapi.com/geocoding/v1/address?key=rpAvJfYmOqPswEf5T36Wqk8vDHDZDa4v&location=${startingPoint}`
    fetch(geoCodeApi)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);
                console.log(data.results[0].locations[0].latLng.lat);
                console.log(data.results[0].locations[0].latLng.lng);
                userAddressMarker(data);
            }
            )}
    })
}

var userAddressMarker = function (data){
    console.log(data);
    var startingLat = data.results[0].locations[0].latLng.lat;
    var startingLon = data.results[0].locations[0].latLng.lng;
    L.marker([startingLat, startingLon]).addTo(breweryMap);
};

var getBreweries = function (breweryName) {
    var listBreweriesApi = "https://api.openbrewerydb.org/breweries?by_city=salt_lake_city&sort=name:desc"
    fetch(listBreweriesApi)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                loadBreweryButtons(data);
                // breweryName.innerText = 
            }
            )
        }
    }
    )
};
getBreweries();

var toAddress = "40.6987539, -111.8503182"
// going to need a for loop to add each extra to location at end of link
var getMapQuest = function (startingPoint) {
    var mapQuestApi = `http://cors-anywhere.herokuapp.com/https://open.mapquestapi.com/guidance/v2/route?key=rpAvJfYmOqPswEf5T36Wqk8vDHDZDa4v&from=${startingPoint}&to=${toAddress}`
    fetch(mapQuestApi)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data){
                console.log(data);
                
            }
            )
        }
    }
    )
}

function loadBreweryButtons(data) {
    var btnDiv = document.getElementById("btnDiv");
    // var listBreweries = JSON.parse(localStorage.getItem("brewery"));
    for (let i = 0; i < data.length; i++) {
        breweryData.push(data[i])
        var button = document.createElement("button");
        button.innerText = data[i].name
        button.value = data[i].name
        button.classList.add("btn");
        button.classList.add("barbtn");
        button.addEventListener("click",chosenBrewery);
        btnDiv.appendChild(button);
    }

    // var L = brewerydata[2].street.lat();
    // console.log(L);
    // for loop to check if address is null if so console.log it
    for (let i=0; i < data.length; i++) {
        if (breweryData[i].latitude === null &&
            breweryData[i].longitude === null && 
            breweryData[i].street === null) {
                console.log(`${[i]} is null`);
            }
        else if (breweryData[i].latitude === null &&
            breweryData[i].longitude === null && 
            breweryData[i].street === true){
                // convert street address to long and lat
            } 
        else {
            console.log(breweryData[i].latitude);
            var lat = breweryData[i].latitude;
            var long = breweryData[i].longitude;
            L.marker([lat, long]).addTo(breweryMap);
            console.log(breweryData[2]);
        }
    }
};


function chosenBrewery(event) {
    console.log(event.target.value)
    var name = event.target.value
    //         getMapQuest(name);
    console.log(name)
    // grabbing bar location from API
    var breweryAddress = event.target
    console.log(breweryAddress);
}

L.mapquest.key = "rpAvJfYmOqPswEf5T36Wqk8vDHDZDa4v";
    var breweryMap = L.mapquest.map('map', {
    // coordinates of center of the map
    center: [40.7608, -111.8910],
    layers: L.mapquest.tileLayer('map'),
    zoom: 12
    });
L.marker([40.7608, -111.8910]).addTo(breweryMap);
// documentation with L infort accesses leaflet library
var displayMap = function(startingPoint){
    
    console.log(startingPoint)
    // need to convert starting point to longitude.
    L.marker([40.7608, -111.8910]).addTo(breweryMap);
}
displayMap();

searchButton.onclick = formSubmitHandler;

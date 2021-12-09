var currentAddress = document.querySelector("#userAddress");
var searchButton = document.querySelector("#search-button");
var breweryData = [];
var resultsLat;
var resultsStreet;

var formSubmitHandler = function (event) {
  event.preventDefault();
  console.log(event);
  var startingPoint = currentAddress.value;
  console.log("startingPoint var", startingPoint);
  // getMapQuest(startingPoint);
  addressToLatLon(startingPoint);
};

var addressToLatLon = function (startingPoint, user) {
  console.log("startingpoint", startingPoint);
  var geoCodeApi = `http://www.mapquestapi.com/geocoding/v1/address?key=rpAvJfYmOqPswEf5T36Wqk8vDHDZDa4v&location=${startingPoint}`;
  if (!user) {
    for (let i = 0; i < resultsStreet.length; i++) {
      var geoStreetApi = `http://www.mapquestapi.com/geocoding/v1/address?key=rpAvJfYmOqPswEf5T36Wqk8vDHDZDa4v&location=${resultsStreet[i].street} ${resultsStreet[i].city} ,${resultsStreet[i].state}`;
      fetch(geoStreetApi).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            resultsStreet[i].latitude =
              data.results[0].locations[0].latLng.lat.toString();
            resultsStreet[i].longitude =
              data.results[0].locations[0].latLng.lng.toString();
          });
        }
      });
    }
    //resultsLat = resultsLat.concat(resultsStreet)
    console.log(resultsLat.concat(resultsStreet));
    loadBreweryButtons(resultsLat.concat(resultsStreet));
    // not making it to else statment, maybe has something to do with funtion (startingPoint, user) above?  not logging user? since not defined anywhere else?
  } else {
    fetch(geoCodeApi).then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
          console.log(data.results[0].locations[0].latLng.lat);
          console.log(data.results[0].locations[0].latLng.lng);
          userAddressMarker(data);
        });
      }
    });
  }
};

var userAddressMarker = function (data) {
  console.log(data);
  var startingLat = data.results[0].locations[0].latLng.lat;
  var startingLon = data.results[0].locations[0].latLng.lng;
  var userIcon = L.icon({
    iconUrl: "home.png",
    iconSize: [50, 32],
    iconAnchor: [25, 32],
  });
  console.log(startingLat);
  L.marker([startingLat, startingLon], { icon: userIcon }).addTo(breweryMap);
};

var getBreweries = function (breweryName) {
  var listBreweriesApi =
    "https://api.openbrewerydb.org/breweries?by_city=salt_lake_city&sort=name:desc";
  fetch(listBreweriesApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);

        resultsLat = data.filter(function (brewery) {
          return brewery.latitude;
        });
        resultsStreet = data.filter(function (brewery) {
          return brewery.street && brewery.latitude === null;
        });
        addressToLatLon();
        console.log(resultsStreet);
      });
    }
  });
};
getBreweries();

var toAddress = "40.6987539, -111.8503182";
var getMapQuest = function (startingPoint) {
  var mapQuestApi = `http://cors-anywhere.herokuapp.com/https://open.mapquestapi.com/guidance/v2/route?key=rpAvJfYmOqPswEf5T36Wqk8vDHDZDa4v&from=${startingPoint}&to=${toAddress}`;
  fetch(mapQuestApi).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      });
    }
  });
};

function loadBreweryButtons(data) {
  console.log("data is", data);
  var btnDiv = document.getElementById("btnDiv");
  // var listBreweries = JSON.parse(localStorage.getItem("brewery"));
  for (let i = 0; i < data.length; i++) {
    var button = document.createElement("button");
    button.innerText = data[i].name;
    button.value = data[i].name;
    button.classList.add("btn");
    button.classList.add("barbtn");
    button.addEventListener("click", chosenBrewery);
    btnDiv.appendChild(button);
  }

  console.log("Results", data);
  for (let i = 0; i < data.length; i++) {
    console.log("Results Lat", data[i].latitude);
    var lat = data[i].latitude;
    var long = data[i].longitude;
    var marker = L.marker([lat, long]).bindPopup(data[i].name);
    //functions for popup to disappear when user hovers in and out
    marker.on("mouseover", function (e) {
      this.openPopup();
    });
    marker.on("mouseout", function (e) {
      this.closePopup();
    });
    console.log(marker);
    if (marker) {
      marker.addTo(breweryMap);
    }
  }
}

function chosenBrewery(event) {
  console.log(event.target.value);
  var name = event.target.value;
  //         getMapQuest(name);
  console.log(name);
  // grabbing bar location from API
  var breweryAddress = event.target;
  console.log(breweryAddress);
}

L.mapquest.key = "rpAvJfYmOqPswEf5T36Wqk8vDHDZDa4v";
var breweryMap = L.mapquest.map("map", {
  // coordinates of center of the map
  center: [40.7608, -111.891],
  layers: L.mapquest.tileLayer("map"),
  zoom: 12,
});

// for loop to add each city btn clicked to route?
var directions = L.mapquest.directions().route(
  {
    start: "900 e 900 s Salt Lake City, Ut",
    end: "4662 s tinn Way Murray, UT 84107",
    options: {
      timeOverage: 25,
      maxRoutes: 2,
    },
  }
);
directions.addTo(breweryMap);


searchButton.onclick = formSubmitHandler;

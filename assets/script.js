var currentAddress = document.querySelector("#userAddress");
var searchButton = document.querySelector("#search-button");
var routeBtn = document.getElementById("route-btn");
var breweryData = [];
var resultsLat;
var resultsStreet;
var startingPoint;
var array = [];

var formSubmitHandler = function (event) {
  event.preventDefault();
  console.log(event);
    startingPoint = currentAddress.value;
  console.log("startingPoint var", startingPoint);
  // getMapQuest(startingPoint);
  addressToLatLon(startingPoint,true);
//   directions(latLon, startingPoint);
};

var addressToLatLon = function (startingPoint, user) {
  console.log("startingPoint", startingPoint);
  var geoCodeApi = `http://www.mapquestapi.com/geocoding/v1/address?key=rpAvJfYmOqPswEf5T36Wqk8vDHDZDa4v&location=${startingPoint}`;
  if (!user) {
    let promises =[];
    for (let i = 0; i < resultsStreet.length; i++) {
      var geoStreetApi = `http://www.mapquestapi.com/geocoding/v1/address?key=rpAvJfYmOqPswEf5T36Wqk8vDHDZDa4v&location=${resultsStreet[i].street} ${resultsStreet[i].city} ,${resultsStreet[i].state}`;
      promises.push(fetch(geoStreetApi).then(async function (response) {
        if (response.ok) {
          await response.json().then(function (data) {
            resultsStreet[i].latitude =
              data.results[0].locations[0].latLng.lat.toString();
            resultsStreet[i].longitude =
              data.results[0].locations[0].latLng.lng.toString();
          });
        }
      }));
    }
    Promise.all(promises).then(function (){
        resultsLat = resultsLat.concat(resultsStreet);
        loadBreweryButtons(resultsLat);
        // chosenBrewery(resultsLat);
    })

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

// we want to add data attributes with lat and long when creating these buttons to access in chosen when user clicks on button
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
    button.setAttribute('latitude', data[i].latitude);
    button.setAttribute('longitude', data[i].longitude);
    button.addEventListener("click", chosenBrewery);
    btnDiv.appendChild(button);
  }

  console.log("Results", data);
  for (let i = 0; i < data.length; i++) {
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
    if (marker) {
      marker.addTo(breweryMap);
    }
  }
}

function chosenBrewery(event) {
  console.log(event.target.value);
  console.log(event.target.getAttribute('latitude'));
  console.log(event.target.getAttribute('longitude'));
  var lat = event.target.getAttribute('latitude');
  var lon = event.target.getAttribute('longitude');
  var latLon = `${lat}, ${lon}`;
  var name = event.target.value;
  //         getMapQuest(name);
  console.log(name);
  console.log(resultsLat.concat(resultsStreet));
  // grabbing bar location from API
  var breweryAddress = event.target;
  console.log(breweryAddress);
    array.push(latLon);
    console.log(array);
    //   directions(latLon, startingPoint);
  console.log(startingPoint);
}

L.mapquest.key = "rpAvJfYmOqPswEf5T36Wqk8vDHDZDa4v";
var breweryMap = L.mapquest.map("map", {
  // coordinates of center of the map
  center: [40.7608, -111.891],
  layers: L.mapquest.tileLayer("map"),
  zoom: 12,
});

routeBtn.addEventListener('click', function (latLon){

    console.log('click');
    console.log('starting point', startingPoint);
    console.log('latlon', array);
    L.mapquest.directions().route(
    {
        start: startingPoint,
        waypoints : array
        },
    
    );
    
})
searchButton.onclick = formSubmitHandler;

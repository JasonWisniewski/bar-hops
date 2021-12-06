console.log('js linked successfully')

var currentAddress = document.querySelector("#userAddress")
var searchButton = document.querySelector("#search-button")



var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log(event);
    var startingPoint = currentAddress.value
    console.log(startingPoint)
}

var getBreweries = function (breweryName) {
    var listBreweriesApi = "https://api.openbrewerydb.org/breweries?by_city=salt_lake_city&sort=name:desc"
    fetch(listBreweriesApi)
    .then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                console.log(data);
                // breweryName.innerText = 
            }
            )
        }
    }
    )
};
getBreweries();

var getMapQuest = function () {
    var mapQuestApi = `http://cors-anywhere.herokuapp.com/http://open.mapquestapi.com/guidance/v2/route?key=rpAvJfYmOqPswEf5T36Wqk8vDHDZDa4v&from=1555+Blake+St.,+Denver,+CO+80202&to=1701+Wynkoop+St,+Denver,+CO+80202`
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

L.mapquest.key = "rpAvJfYmOqPswEf5T36Wqk8vDHDZDa4v";
L.mapquest.map('map', {
  center: [40.7608, -111.8910],
  layers: L.mapquest.tileLayer('map'),
  zoom: 12
});


getMapQuest();
// create buttons for breweries
// save breweries to local storage
// current position function

searchButton.onclick = formSubmitHandler;
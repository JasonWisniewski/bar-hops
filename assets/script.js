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
// create buttons for breweries
// save breweries to local storage
// current position function

searchButton.onclick = formSubmitHandler;

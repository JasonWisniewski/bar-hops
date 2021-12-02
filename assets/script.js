console.log('js linked successfully')

var currentAddress = document.querySelector("form-control")

var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log(event);
    var startingPoint = currentAddress.value.trim();
    console.log(startingPoint);
}

var getBreweries = function (breweryName) {
    var listBreweriesApi = "https://api.openbrewerydb.org/breweries?by_city=salt_lake_city&by_type=micro&per_page=15" + breweryName + "&appid="
    // fetch(listBreweriesApi);
    // console.log(data);
    // .then(function(response) {
    //     if(response.ok) {
    //         response.json().then(function(data) {
    //             console.log(data);
    //             breweryName.innerText = 
    //         }
    //         )
    //     }
    // }
    // )
};
// create buttons for breweries
// save breweries to local storage
// current position function
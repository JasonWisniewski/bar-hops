console.log('js linked successfully')

var currentAddress = document.querySelector("#userAddress")
var searchButton = document.querySelector("#search-button")
var breweryData = []



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
                loadBreweryButtons(data);
                // breweryName.innerText = 
            }
            )
        }
    }
    )
};
getBreweries();

var getMapQuest = function () {
    var mapQuestApi = `http://cors-anywhere.herokuapp.com/https://open.mapquestapi.com/guidance/v2/route?key=rpAvJfYmOqPswEf5T36Wqk8vDHDZDa4v&from=1555+Blake+St.,+Denver,+CO+80202&to=1701+Wynkoop+St,+Denver,+CO+80202`
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
        btnDiv.appendChild(button)
    }
    console.log(breweryData)
}

function chosenBrewery(event) {
    console.log(event.target.value)
    var name = event.target.value
    //         getMapQuest(name);
    console.log(name)
}


getMapQuest();
// create buttons for breweries
// save breweries to local storage
// current position function

searchButton.onclick = formSubmitHandler;

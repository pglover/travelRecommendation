//The retrieved location data
var location_data = {};

//Load the location data
fetch("travel_recommendation_api.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network error");
    }
    return response.json();
  })
  .then((travel_data) => {
    location_data = travel_data;
    console.log(location_data);
  })
  .catch((error) => {
    console.error("There was a problem with the Fetch operation:", error);
  });

/*Find the locations that match the topic
    - Topics are "beaches" "temples" or the name of the country
    - Search is case insensitive
*/
function findLocationByTopic(topic) {
  //Use regular expression to make the search case insensitive
  const topicRegex = new RegExp(topic, "i");

  //See if there's a subject search match
  for (const keyword of ["temples", "beaches"]) {
    if (keyword.match(topicRegex)) {
      return location_data[keyword];
    }
  }
  //See if there's a country search match
  for (const country of location_data.countries) {
    if (country.name.match(topicRegex)) {
      return country.cities;
    }
  }

  //for debugging / checking, dump all the locations
  if ("all".match(topicRegex) || "country".match(topicRegex)) {
    var allLocations = location_data.temples.concat(location_data.beaches);
    for (const country of location_data.countries) {
      allLocations = allLocations.concat(country.cities);
    }
    return allLocations;
  }


  return null;
}

//Perform the search
function searchClick() {
  var topicToFind = document
    .getElementById("search_field")
    .value.trim()
    .toLowerCase();

  var resultsDOM = document.getElementById("search_results");

  var results = findLocationByTopic(topicToFind);

  if (results) {
    var innerDOM = `<div class="container-fluid bg-dark bg-opacity-50">`;
    results.forEach((location) => {
      innerDOM += `<div class="card border mb-2 rounded text-bg-secondary">
                      <img class="card-img-top img-fluid" width="300" height="200" src="./images/${location.imageUrl}">
                      <div class="card-body">
                        <h4 class="card-title">${location.name}</h4>
                        <p class="card-text">${location.description}</p>
                        <a class="btn btn-outline-light">Visit</a>
                      </div>
                    </div>`;
    });
    innerDOM += "</div>";
    resultsDOM.innerHTML = innerDOM;
  } else {
    resultsDOM.innerHTML = `<div class="container-fluid bg-dark bg-opacity-50">
                               <div class="row p-2 border border-primary-subtle">
                               No Results Found
                               </div>
                            </div>`;
  }
}

//Clear search
function clearSearch() {
  document.getElementById("search_field").value = "";
  document.getElementById("search_results").innerHTML = "";
}

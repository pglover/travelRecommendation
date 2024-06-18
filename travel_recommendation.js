var location_data = {};

fetch("travel_recommendation_api.json")
  .then((response) => {
    return response.json();
  })
  .then((travel_data) => {
    location_data = travel_data;
    console.log(location_data);
  });

function findLocationByTopic(topic) {
  //Use regular expression to make the search case insensitive
  const topicRegex = new RegExp(topic, "i");

  for (const [key, value] of Object.entries(location_data)) {
    if (key.match(topicRegex)) return value;
  }
  return null;
}

function searchClick() {
  var topicToFind = document.getElementById("search_field").value;
  if (topicToFind == null || topicToFind == "") {
    alert("Please enter a search topic.");
    return;
  }
  var resultsDOM = document.getElementById("search_results");

  var results = findLocationByTopic(topicToFind);

  if (results) {
    var innerDOM = `<div class="container-fluid bg-dark bg-opacity-50">`;
    results.forEach((location) => {
      innerDOM += `<div class="card border mb-2 rounded text-bg-secondary">
                      <img class="card-img-top" width="300" height="200" src="./images/${location.imageUrl}">
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

function clearSearch() {
  document.getElementById("search_field").value = '';
  document.getElementById("search_results").innerHTML = '';
}

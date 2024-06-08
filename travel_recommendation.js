fetch("travel_recommendation_api.json")
  .then((response) => {
    return response.json();
  })
  .then((travel_data) => {
    console.log(travel_data);
  });

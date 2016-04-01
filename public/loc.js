function suggestions(lat, long) {
  var location = lat + ',' + long;

  var req = new XMLHttpRequest();
  req.addEventListener("load", response_handler);
  req.open("GET", '/place/'+location);
  req.send();
}

function response_handler(resp) {
  var new_state = document.createElement('div'),
      data = JSON.parse(resp.currentTarget.responseText),
      nearby = data.results;

  nearby.forEach(function (el) {
    var place = document.createElement('div'),
        name = document.createElement('h1'),
        rating = document.createElement('p'),
        opening_hours = document.createElement('p');

    name.innerHTML = el.name;
    place.appendChild(name);

    if (el.rating) {
      rating.innerHTML = 'Rating: '+ el.rating;
      place.appendChild(rating);
    }

    if (el.opening_hours) {
      opening_hours.innerHTML = el.opening_hours.open_now ?
          'Open now!' : 'Closed';
      place.appendChild(opening_hours);
    }
    
    new_state.appendChild(place);
  });

  document.body.innerHTML = new_state.innerHTML;
}

// instantiate
navigator.geolocation.getCurrentPosition(function(position) {
  var nearby = suggestions(
        position.coords.latitude,
        position.coords.longitude);
});

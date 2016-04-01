var app;

/* Types: https://developers.google.com/places/supported_types#table1
 * E.g.: lodging, restaurant, atm, museum, night_club, spa, stadium, zoo, cafe,
 * amusement_park
 */

function suggestions(lat, long, type) {
  var location = lat + ',' + long;

  var req = new XMLHttpRequest(),
      handler = suggestions_handler.bind(null, type);

  req.addEventListener("load", handler);
  req.open("GET", '/place/'+location+'/'+type);
  req.send();
}

function suggestions_handler(type, resp) {
  var new_state = document.createElement('div'),
      data = JSON.parse(resp.currentTarget.responseText),
      nearby = data.results;

  var category = document.createElement('div');
  category.innerHTML = type.toUpperCase();
  new_state.appendChild(category);

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

  if (!nearby.length > 0) {
    return render('Could not find anything nearby for: ' + type);
  }
  
  return render(new_state.innerHTML);
}

function render(html) {
  if (!app) {
    app = document.getElementById('root');
  }
  app.innerHTML = html;
}

// instantiate the geolock
navigator.geolocation.getCurrentPosition(function(position) {
  var types = ['lodging', 'restaurant', 'atm', 'museum', 'night_club', 'spa',
    'stadium', 'zoo', 'cafe', 'amusement_park'];

  var nearby = suggestions(
        position.coords.latitude,
        position.coords.longitude,
        types[Math.floor(Math.random() * types.length)]);
});

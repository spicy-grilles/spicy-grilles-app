var position = [40.44, -3.71];

function initialize() {
  var latlng = new google.maps.LatLng(position[0], position[1]);
  var myOptions = {
    zoom: 2.7,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true, //DISABLE UI
    gestureHandling: "none", // DISABLE SCROLL
    zoomControl: false // DISABLE ZOOM
    
  };

  map = new google.maps.Map(document.getElementById("mapCanvas"), myOptions);

  ////////// ICONS //////////

  var userIcon = {
    url: "/images/userIcon.png", 
    scaledSize: new google.maps.Size(50, 50), 
    origin: new google.maps.Point(0, 0), 
    anchor: new google.maps.Point(25, 25) 
  };

  var restaurantIcon = {
    url: "/images/restaurantIcon.png", 
    scaledSize: new google.maps.Size(50, 50), 
    origin: new google.maps.Point(0, 0), 
    anchor: new google.maps.Point(25, 25) 
  }

  //////////////

  var restaurants = [
    ['Bondi Beach', -33.890542, 151.274856],
    ['Coogee Beach', -33.923036, 151.259052],
    ['Cronulla Beach', -34.028249, 151.157507],
    ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    ['Maroubra Beach', -33.950198, 151.259302, 1]
  ];

  for (i = 0; i < restaurants.length; i++) { 
      restaurant = new google.maps.Marker({
          position: new google.maps.LatLng(restaurants[i][1], restaurants[i][2]),
          map: map
        });
    }
    
    userMarker = new google.maps.Marker({
      position: latlng,
      map: map,
      icon: userIcon, //Select User Icon
      title: "Latitude:" + position[0] + " | Longitude:" + position[1]
    });
    
  google.maps.event.addListener(map, "click", function(event) {
    var result = [event.latLng.lat(), event.latLng.lng()];
    transition(result);
  });
}

//Load google map
google.maps.event.addDomListener(window, "load", initialize);

var numDeltas = 100;
var delay = 10; //milliseconds
var i = 0;
var deltaLat;
var deltaLng;

function transition(result) {
  i = 0;
  deltaLat = (result[0] - position[0]) / numDeltas;
  deltaLng = (result[1] - position[1]) / numDeltas;
  moveMarker();
}

function moveMarker() {
  position[0] += deltaLat;
  position[1] += deltaLng;
  var latlng = new google.maps.LatLng(position[0], position[1]);
  userMarker.setTitle("Latitude:" + position[0] + " | Longitude:" + position[1]);
  userMarker.setPosition(latlng);
  if (i != numDeltas) {
    i++;
    setTimeout(moveMarker, delay);
  }
}


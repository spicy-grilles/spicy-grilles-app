




 let points = document.querySelector("#points").innerHTML


// let button = document.querySelector("#finish")

// console.log(points)



// button.addEventListener("click", event=> {
//   points = +points
//   points += 5
//   console.log(points)

//   axios

// })
























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
  };

  //////////////
  //Restaurants Localitations

  var restaurants = [
    ["Bondi", 3, 23],
    ["Coogee", 48, 11],
    ["Cronulla", 54, -69],
    ["Manly", -9, -60],
    ["Maroubra", 60, 60]
  ];

  restaurants.forEach(restaurant => {
    each = new google.maps.Marker({
      position: new google.maps.LatLng(restaurant[1], restaurant[2]),
      map: map,
      icon: restaurantIcon,
      // label: restaurants[i][0],
      title: restaurant[0]
    });

    each.addListener("click", event => {
      //infowindow.open(map, marker);
      var result = [event.latLng.lat(), event.latLng.lng()];
      transition(result);
      
      axios
      .get('/updatePoints')
      .then((res) => {
        console.log(res.data.data.pointsMatch)
        document.querySelector("#points").innerHTML = res.data.data.pointsMatch
      })
      .catch((err)=> console.log("error " + err))
    });
  });

  userMarker = new google.maps.Marker({
    position: latlng,
    map: map,
    icon: userIcon, //Select User Icon
    title: "Latitude:" + position[0] + " | Longitude:" + position[1]
  });

  google.maps.event.addListener(map, "click", event => {
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
  userMarker.setTitle(
    "Latitude:" + position[0] + " | Longitude:" + position[1]
  );
  userMarker.setPosition(latlng);
  if (i != numDeltas) {
    i++;
    setTimeout(moveMarker, delay);
  }
}

var sfc         = {lat: 35.38, lng: 139.42};
var ryokusuitei = {lat: 38.22, lng: 140.72};

function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('mapCanvas'), {
    zoom: 7,
    center: sfc
  })
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('routeCanvas'));

  var onClickHandler = function() {
    readLinks(directionsService, directionsDisplay);
  };
  document.getElementById('reco').addEventListener('click', onClickHandler);
}

function calcAndDispRoute(end, directionsService, directionsDisplay) {
  var request = {
    origin: sfc,
    destination: end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    }
    else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}
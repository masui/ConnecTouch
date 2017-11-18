var sfc         = {lat: 35.38, lng: 139.42};
var ryokusuitei = {lat: 38.22, lng: 140.72};
var syonandai = {lat: 35.396324, lng: 139.466522}
var kamakura = {lat: 35.319001, lng:139.550733}
var midtown = {lat: 35.665876, lng: 139.731000}

var midtownId = 'ChIJU2MukniLGGAR1qSN4ds5Pus'
var syonanId = 'ChIJh1OnT2tRGGAR57DJe9NICA4'

function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('mapCanvas'), {
    zoom: 7,
    center: syonandai
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
    origin: "東京駅",
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
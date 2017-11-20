var sfc         = {lat: 35.388384, lng: 139.427962}
var ryokusuitei = {lat: 38.220972,	lng: 140.728089}
var syonandai = {lat: 35.396324, lng: 139.466522}
var kamakura = {lat: 35.319001, lng:139.550733}
var midtown = {lat: 35.665876, lng: 139.731000}

// 関数呼び出しの順番どうにかしたい
function initMap() {
  var directionsDisplay = new google.maps.DirectionsRenderer;
  var directionsService = new google.maps.DirectionsService;
  var map = new google.maps.Map(document.getElementById('mapCanvas'), {
    zoom: 7,
    center: midtown
  })
  directionsDisplay.setMap(map);
  directionsDisplay.setPanel(document.getElementById('routeCanvas'));

  var onClickHandler = function() {
    getUid(directionsService, directionsDisplay);
  };
  document.getElementById('reco').addEventListener('click', onClickHandler);
}

function calcAndDispRoute(end, directionsService, directionsDisplay) {
  var request = {
    origin: midtown,
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
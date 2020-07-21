"use strict";

function loadFile() {
  let input, file, fr;
  input = document.getElementById('fileinput');
  file = input.files[0];
  fr = new FileReader();
  fr.onload = receivedText;
  fr.readAsText(file);
  
  function receivedText(e) {
    let lines = e.target.result;
    let newArr = JSON.parse(lines); 
    let iconBase = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/';
    let icons = {
      parking: {
        icon: iconBase + 'parking_lot_maps.png'
      },
      library: {
        icon: iconBase + 'library_maps.png'
      },
      info: {
        icon: iconBase + 'info-i_maps.png'
      }
    };
    let map = initMap();
    console.log(newArr);

    newArr.vehicles.forEach(element => {
      //console.log(element.timeSchedule[0].startLocation.coord.x + " " + element.timeSchedule[0].startLocation.coord.y)
      let location = {lat: element.timeSchedule[0].startLocation.coord.x, lng: element.timeSchedule[0].startLocation.coord.y};
      //let marker = new google.maps.Marker({position: location, map: map});
    });

    newArr.shipments.forEach(element => { 
      let location = {lat: element.delivery.location.coord.x, lng: element.delivery.location.coord.y};
      //let location = {lat: element.pickup.location.coord.x, lng: element.pickup.location.coord.y};
      let marker = new google.maps.Marker({position: location, map: map});
    });
  }
}

function initMap(){
  let map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 50.397, lng: 30.644},
    zoom: 10
  });
  return map;
}


const mapview = new ol.View({
  center: ol.proj.fromLonLat([131.463774, 33.227400]),
  minZoom : 7,
  zoom: 10,
  extent: ol.proj.transformExtent([130.824563, 32.714204, 132.102984, 33.740596], "EPSG:4326", "EPSG:3857"),
});


const map = new ol.Map({
  target: 'container',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: mapview,
    /*
    new ol.View({
    center: fromLonLat([139.767, 35.681]),
    zoom: 11,
    extent: transformExtent([139.7568, 35.6746, 139.7774, 35.6877], 'EPSG:4326', 'EPSG:3857')
  }),
  */

});




const geolocation = new ol.Geolocation({
  trackingOptions: {
    enableHighAccuracy: true
  },
  projection: "EPSG:4326",
});

function el(id) {
  return document.getElementById(id);
}

el("track").addEventListener("change", function(){
  //geolocation.setTracking(this.checked);
  const coord = geolocation.getPosition();
  mapview.setCenter(ol.proj.transform(coord,"EPSG:4326","EPSG:3857"));
  //alert(Array.isArray(geolocation.getPosition()));
  //alert(geolocation.getPosition());
});

geolocation.on("change", function(){
  el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
  el('position').innerText = geolocation.getPosition() + ' [m]';
  el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
});

geolocation.on("error",function(){
  const info = document.getElementById("info");
  info.innerHTML = error.message;
  info.style.display = "";
});

const accuracyFeature = new ol.Feature();
geolocation.on('change:accuracyGeometry', function () {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

const positionFeature = new ol.Feature();
positionFeature.setStyle(
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({
        color: '#3399CC'
      }),
      stroke: new ol.style.Stroke({
        color: '#FFF',
        width: 2
      })
    })
  })
);

/*
el("checkButton").addEventListener("click",function(){
  alert(el("nameText").value);
});
*/


const destinationFeature = new ol.Feature();
destinationFeature.setStyle(
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: 10,
      fill: new ol.style.Fill({
        color: '#f54254'
      }),
      stroke: new ol.style.Stroke({
        color: '#FFF',
        width: 4
      })
    })
  })
);

function setDestination(lng,lat,name){
  const coordinates = ol.proj.transform([lng,lat],"EPSG:4326","EPSG:3857");
  destinationFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
  map.addLayer(
    new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [destinationFeature]
      })
    })
  );
}



geolocation.on('change:position', function(){
  const coordinates = geolocation.getPosition();
  const coo = ol.proj.transform(coordinates,"EPSG:4326","EPSG:3857");
  positionFeature.setGeometry(coo ? new ol.geom.Point(coo) : null);
});



const vectorLayer = new ol.layer.Vector({
  map: map,
  source: new ol.source.Vector({
    features: [accuracyFeature, positionFeature],
  })
});

function currentSet(){
  const currentCoord = geolocation.getPosition();
  mapview.setCenter(ol.proj.transform(currentCoord,"EPSG:4326","EPSG:3857"));
  mapview.setZoom(14);
}






window.addEventListener("DOMContentLoaded",function(){
  setTimeout(function(){
    geolocation.setTracking(true);
    //mapview.setCenter(ol.proj.transform(geolocation.getPosition(),"EPSG:4326","EPSG:3857"));
  },100);
});

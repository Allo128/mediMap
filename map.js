const mapview = new ol.View({
  //projection: "EPSG:4326",
  center: geolocation.getPosition(),
  //center: ol.proj.fromLonLat([131.407244, 33.182399]),
  maxZoom : 18,
  minZoom : 7,
  zoom: 15,
  //extent: [129.534766, 33.934488, 132.014351, 31.153983],  
  extent: ol.proj.transformExtent([130.875630, 32.735597, 132.102984, 33.665779], "EPSG:4326", "EPSG:3857"),
  /*
  center: fromLonLat([139.767, 35.681]),
  zoom: 11,
  extent: transformExtent([139.7568, 35.6746, 139.7774, 35.6877], 'EPSG:4326', 'EPSG:3857')
  */
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
  
  //controls: ol.control.defaults().extend([new ol.control.ZoomSlider()]),

});




const geolocation = new ol.Geolocation({
  trackingOptions: {
    enableHighAccuracy: true
  },
  projection: "EPSG:4326",
    //mapview.getProjection(),
});

function el(id) {
  return document.getElementById(id);
}

/*el("track").addEventListener("change", function(){
  geolocation.setTracking(true);
});*/

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
        color: '#808080',
        width: 2
      })
    })
  })
);

geolocation.on('change:position', function(){
  const coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
});

function getPos(){
  const coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
}



new ol.layer.Vector({
  map: map,
  source: new ol.source.Vector({
    features: [accuracyFeature, positionFeature],
  })
});







window.addEventListener("DOMContentLoaded",function(){
  geolocation.setTracking(true);
  positionFeature.setGeometry(geolocation.getPosition() ? new ol.geom.Point(coordinates) : null);
});

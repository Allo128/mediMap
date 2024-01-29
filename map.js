const mapview = new ol.View({
  //projection: "EPSG:4326",
  //center: [131.463774, 33.227400],
  center: [131.615874,33.235004],
  minZoom : 7,
  zoom: 15,
  //extent: [129.534766, 33.934488, 132.014351, 31.153983],  
  extent: ol.proj.transformExtent([130.824563, 32.714204, 132.102984, 33.740596], "EPSG:4326", "EPSG:3857"),
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



/*
setTimeout(map.on("postcompose",updateView),500);

function updateView() {
  mapview.setCenter(geolocation.getPosition());
}
*/

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

el("track").addEventListener("change", function(){
  //ol.View.setCenter([geolocation.getPosition()]);
  geolocation.setTracking(this.checked);
  mapview.setCenter(geolocation.getPosition());
  //alert(Array.isArray(geolocation.getPosition()));
  //alert(geolocation.getPosition());
  //ol.View.setCenter(geolocation.getPosition());
});

geolocation.on("change", function(){
  el('accuracy').innerText = geolocation.getAccuracy() + ' [m]';
  el('position').innerText = geolocation.getPosition() + ' [m]';
  el('speed').innerText = geolocation.getSpeed() + ' [m/s]';
  //mapview.centerOn(geolocation.getPosition(), map.getSize(), [570,500]);
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

/*
function getPos(){
  const coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
}

setTimeout(function(){
  ol.View.setCenter(geolocation.getPosition());
},100);

*/

new ol.layer.Vector({
  map: map,
  source: new ol.source.Vector({
    features: [accuracyFeature, positionFeature],
  })
});







window.addEventListener("DOMContentLoaded",function(){
  //geolocation.setTracking(true);
  //positionFeature.setGeometry(geolocation.getPosition() ? new ol.geom.Point(coordinates) : null);
  //map.render();
  //ol.View.setCenter(geolocation.getPosition());
});

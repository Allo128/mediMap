//function init_map() {


const mapview = new ol.View({
  center: ol.proj.fromLonLat([131.407244, 33.182399]),
  zoom: 30,
  extent: [130.875630, 33.665779, 132.102984, 32.735597],
});


const map = new ol.Map({
  target: 'container',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: mapview,
});




const geolocation = new ol.Geolocation({
  trackingOptions: {
    enableHighAccuracy: true
  },
  projection: mapview.getProjection(),
});

function el(id) {
  return document.getElementById(id);
}

el("track").addEventListener("change", function(){
  geolocation.setTracking(this.checked);
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
        color: '#808080',
        width: 2
      })
    })
  })
);

geolocation.on('change:position', function () {
  const coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
});

new ol.layer.Vector({
  map: map,
  source: new ol.source.Vector({
    features: [accuracyFeature, positionFeature],
  })
});


//}




//window.addEventListener('DOMContentLoaded', init_map());

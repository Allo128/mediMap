//function init_map() {



const map = new ol.Map({
  target: 'container',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([36,140]), 
    zoom: 6,
    maxZoom : 5,
    minZoom : 20
  })
});

const geolocation = new ol.Geolocation({
  trackingOptions: {
    enableHighAccuracy: true,
  },
  projection: ol.View.getProjection(),
});

function el(id) {
  return document.getElementById(id);
}


//}




window.addEventListener('DOMContentLoaded', init_map());

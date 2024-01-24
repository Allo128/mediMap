function init_map() {
  const map = new ol.Map({
    target: 'container',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([131.5,33.2]), 
      zoom: 6 
    })
  });
}

window.addEventListener('DOMContentLoaded', init_map());

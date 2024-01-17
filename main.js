import Map from 'https://cdn.jsdelivr.net/gh/openlayers/openlayers@main/src/ol/Map.js';
import OSM from 'https://cdn.jsdelivr.net/gh/openlayers/openlayers@main/src/ol/source/OSM.js';
import TileLayer from 'https://cdn.jsdelivr.net/gh/openlayers/openlayers@main/src/ol/layer/Tile.js';
import View from 'https://cdn.jsdelivr.net/gh/openlayers/openlayers@main/src/ol/View.js';

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  target: 'map',
  view: new View({
    projection: 'EPSG:4326',
    center: [0, 0],
    zoom: 2,
  }),
});

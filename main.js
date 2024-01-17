import Map from 'https://cdn.jsdelivr.net/npm/ol@8.2.0/Map.js';
import OSM from 'https://cdn.jsdelivr.net/npm/ol@8.2.0/source/OSM.js';
import TileLayer from 'https://cdn.jsdelivr.net/npm/ol@8.2.0/layer/Tile.js';
import View from 'https://cdn.jsdelivr.net/npm/ol@8.2.0/View.js';

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

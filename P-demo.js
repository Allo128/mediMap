/* 
import Map from 'ol/Map.js';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import View from 'ol/View.js';

const map = new Map({
  target: 'map',
  view: new View({
    projection: 'EPSG:3857', // here is the view projection
    center: [0, 0],
    zoom: 2,
  }),
  layers: [
    new TileLayer({
      source: new TileWMS({
        projection: 'EPSG:4326', // here is the source projection
        url: 'https://ahocevar.com/geoserver/wms',
        params: {
          'LAYERS': 'ne:NE1_HR_LC_SR_W_DR',
        },
      }),
    }),
  ],
});
*/

import Map from "ol/Map.js";
import View from "ol/View.js";
import OSM from "ol/source/OSM.js";

const map = new Map({target: "map"});
map.setView(new View({
  center: [0,0];
  zoom: 2;
}));
const source = OSM();
const layer = new TileLayer({source: source});
map.addLayer(layer);

let aedArray = [];
let hospitalArray = [];

const R = Math.PI / 180;

function distance(lat1, lng1, lat2, lng2) {
  lat1 *= R;
  lng1 *= R;
  lat2 *= R;
  lng2 *= R;
  return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
}



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
      radius: 10,
      fill: new ol.style.Fill({
        color: '#3399CC'
      }),
      stroke: new ol.style.Stroke({
        color: '#FFF',
        width: 3
      })
    })
  })
);






const destinationFeature = new ol.Feature();
destinationFeature.setStyle(
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: 8,
      fill: new ol.style.Fill({
        color: '#b0f279'
      }),
      stroke: new ol.style.Stroke({
        color: '#FFF',
        width: 2
      })
    })
  })
);






//MarkerColor{hospital:red,AED:yellow}

const hospitalFeature = new ol.Feature();
hospitalFeature.setStyle(
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: 12,
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

let aedFeature = new ol.Feature();
aedFeature.setStyle(
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: 8,
      fill: new ol.style.Fill({
        color: '#f5d247'
      }),
      stroke: new ol.style.Stroke({
        color: '#FFF',
        width: 2
      })
    })
  })
);

const hospitalLayer = new ol.layer.Vector({
  map: map  
});

const aedLayer = new ol.layer.Vector({
  map: map  
});

function aedFeatureSet(feature){
  feature.setStyle(
    new ol.style.Style({
      image: new ol.style.Circle({
        radius: 4,
        fill: new ol.style.Fill({
          color: '#f5d247'
        }),
        stroke: new ol.style.Stroke({
          color: '#FFF',
          width: 1
        })
      })
    })
  );
};





function appear(){
  let divs = document.getElementsByClassName("overlay");
  for(let i=0;i<divs.length;i++){
    divs[i].style.display = "block";
  }
};

function disappear(){
  let divs = document.getElementsByClassName("overlay");
  for(let i=0;i<divs.length;i++){
    divs[i].style.display = "none";
  }
};



function setLayer(feature,array){
  const featureArray = [];
  if(feature=="hospital"){


  }else if(feature=='aed'){
    for(let i=0;i<array.length;i++){
      let number = i+1;
      let ex = new ol.Overlay({
        position: ol.proj.fromLonLat(array[i]),
        element: el("aed"+number),
      });
      map.addOverlay(ex);
    }
  }else{
    alert("ERROR");
  }
}





function setDestination(lng,lat,feature,name){
  const coordinates = ol.proj.transform([lng,lat],"EPSG:4326","EPSG:3857");
  feature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
  map.addLayer(
    new ol.layer.Vector({
      source: new ol.source.Vector({
        features: [feature]
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

function currentSet(zoom){
  const currentCoord = geolocation.getPosition();
  mapview.setCenter(ol.proj.transform(currentCoord,"EPSG:4326","EPSG:3857"));
  mapview.setZoom(zoom);
  el("oita").style.display = "block"
}

function xhrCsv(path,arrayName){
  let csv = new XMLHttpRequest();
  csv.open("GET", path, false);
  try {
    csv.send(null);
  } catch (err) {
    console.log(err);
  }
  let lines = csv.responseText.split(/\r\n|\n/);
  for (let i = 0; i < lines.length; ++i) {
    let cells = lines[i].split(",");
    if (cells.length != 1) {
      arrayName.push(cells);
    }
  }
}




function setAed(){
  let length = aedArray.length;
  let parent = el("markers");
  let coordArray = [];
  for (let i = 1; i < length; i++){
    let child = document.createElement("div");
    child.dataset.name = aedArray[i][4];
    child.dataset.place = aedArray[i][6];
    child.dataset.phone = aedArray[i][11];
    child.id = "aed" + i;
    child.className = "overlay";
    //child.onclick = showInfo("aed",i);
    child.innerHTML = aedArray[i][1];
    //child.style.display = "none";
    parent.appendChild(child);
    let lng = aedArray[i][9];
    let lat = aedArray[i][8];
    coordArray.push([lng,lat]);
  }
  return coordArray;
}


function coder(address){
  const id = "";
  const encoded = encodeURI(address);
  const url = `https://map.yahooapis.jp/geocode/V1/geoCoder?appid=${id}&query=${encoded}`;
  //el("coord").innerHTML = url;
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  try {
    csv.send(null);
  } catch (err) {
    console.log(err);
  }
  const responseXML = xhr.responseXML;
  el("coord").innerHTML = responseXML;
  //alert(responseXML);
};






function showInfo(type,id){
  
}


window.addEventListener("DOMContentLoaded",function(){
  geolocation.setTracking(true);
  xhrCsv("Datas/aed.csv",aedArray);
  xhrCsv("Datas/hospital.csv",hospitalArray);
  setLayer("aed",setAed());
  //el("coord").innerHTML = `"${aedArray[2][0]}"+"${hospitalArray[2][0]}"`;
});

const mapping = async () => {
  var greenIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  var blueIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  var orangeIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  //const response = await fetch("/result/data.json");
  const response = await fetch(
    "https://caesariodito.github.io/st-leaflet-map/result/data.json"
  );
  const coors = await response.json(); //extract JSON from the http response

  const aktivitas = coors.data.aktivitas;
  const relawan = coors.data.relawan;

  let map = document.querySelector("map");

  var tiles = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }
  );

  map = L.map("map", {
    center: { lat: 0.7893, lng: 113.9213 },
    zoom: 5,
    layers: [tiles],
  });

  var mcgLayerSupportGroup = L.markerClusterGroup.layerSupport(),
    activities = L.layerGroup(),
    volunteers = L.layerGroup(),
    description1 = L.layerGroup(),
    description2 = L.layerGroup(),
    description3 = L.layerGroup(),
    control = L.control.layers(null, null, { collapsed: false }),
    i,
    a,
    title,
    marker;

  mcgLayerSupportGroup.addTo(map);

  for (let i = 0; i < aktivitas.length; i++) {
    a = aktivitas[i];
    title = a.judul;
    let tanggal_selesai = new Date(a.tanggal_selesai);
    let hari_ini = new Date();
    if (hari_ini > tanggal_selesai) {
      marker = L.marker(new L.LatLng(a.lat, a.long), {
        title: title,
        icon: greenIcon,
      });
    } else {
      marker = L.marker(new L.LatLng(a.lat, a.long), {
        title: title,
        icon: blueIcon,
      });
    }
    marker.bindPopup(title);
    marker.addTo(activities);
  }

  for (let i = 0; i < relawan?.length; i++) {
    a = relawan[i];
    title = a.nama;
    marker = L.marker(new L.LatLng(a.lat, a.long), {
      title: title,
      icon: orangeIcon,
    });
    marker.bindPopup(title);
    marker.addTo(volunteers);
  }

  mcgLayerSupportGroup.checkIn([activities, volunteers]);

  mcgLayerSupportGroup.checkIn([description1, description2, description3]);

  control.addOverlay(activities, "Aktivitas");
  control.addOverlay(volunteers, "Relawan");
  control.addTo(map);

  activities.addTo(map); // Adding to map or to AutoMCG are now equivalent.
  volunteers.addTo(map);

  // Legend
  var legend = L.control({ position: "bottomright" });

  legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Keterangan</h4>";
    div.innerHTML +=
      '<i style="background: #21ab1e"></i><span>Selesai</span><br>';
    div.innerHTML +=
      '<i style="background: #2981ca"></i><span>Sedang Berjalan</span><br>';
    div.innerHTML +=
      '<i style="background: #cb8429"></i><span>Relawan</span><br>';

    return div;
  };

  console.log(map);

  legend.addTo(map);
};

mapping();

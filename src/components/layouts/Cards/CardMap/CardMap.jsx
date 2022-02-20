import React, { useState } from "react";
import { visitIconLocation, proIconLocation } from "./IconLocation";

// LeaflettMap
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

// Icon
import "./CardMap.css";

const { v4: uuid } = require("uuid");

const CardMap = ({ proWorkPlaces = [] }) => {
  //Posicion inicial Lima
  const [position0, setPosition0] = useState([
    "-12.046291689184665",
    "-77.04274940628093",
  ]);

  const coordenadasCiudad = (ciudad) => {
    switch (ciudad) {
      case "tacna":
        return ["-17.970725939394377", "-70.25653251005446"];
      case "cuzco":
        return ["-13.542487950183723", "-71.96407851111653"];
      case "trujillo":
        return ["-8.110809844530836", "-79.02888650373895"];
      case "lima":
        return ["-12.01483566041886", "-77.03808498858163"];
      case "iquitos":
        return ["-3.813928984658219", "-73.2278864112746"];
      case "piura":
        return ["-5.10636205356632", "-80.72056172597772"];
      default:
        break;
    }
  };

  return (
    <div className="profile-card-map">
      <p className="profile-card-map-title">Donde ha trabajado</p>
      <MapContainer center={position0} zoom={4}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker position0={position0} setPosition0={setPosition0} />

        {proWorkPlaces.length > 0 &&
          proWorkPlaces?.map((coor, i) => (
            <Marker
              key={uuid()}
              icon={proIconLocation}
              position={coordenadasCiudad(coor)}
            >
              <Popup>El profesional trabajo en: {coor?.toUpperCase()}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

function LocationMarker({ position0, setPosition0 }) {
  const map = useMapEvents({
    locationfound(e) {
      setPosition0(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  // Posiciona al visitante actual
  map.locate();

  return position0 === null ? null : (
    <Marker icon={visitIconLocation} position={position0} className="red-popup">
      <Popup>Tu estas aquí</Popup>
    </Marker>
  );
}

export default CardMap;

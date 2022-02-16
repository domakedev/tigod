import React, { useState } from "react";
import "./CardMap.css";

// LeaflettMap
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

// Icon
import { visitIconLocation, proIconLocation } from "./IconLocation";
import StudentIcon from "../../../../assets/icons/student.png";

const fakeProWorkPlaces = [
  ["-7.161630582718947", "-78.51263637785485"], // Cax
  ["-6.765749874622064", "-79.85013587442238"], // Chix
  ["-9.934638103136775", "-76.23743643827284"], // Huanuco
];

const CardMap = ({ proWorkPlaces = fakeProWorkPlaces }) => {
  //Posicion inicial Lima
  const [position0, setPosition0] = useState([
    "-12.046291689184665",
    "-77.04274940628093",
  ]);

  proWorkPlaces.map((e) => console.log(e));

  return (
    <div className="profile-card-map">
      <p className="profile-card-map-title">Donde ha trabajado</p>
      <MapContainer center={position0} zoom={6}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={proIconLocation} position={proWorkPlaces[0]}></Marker>
        <LocationMarker position0={position0} setPosition0={setPosition0} />

        {proWorkPlaces?.map((coor, i) => (
          <Marker key={i} icon={proIconLocation} position={coor}></Marker>
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

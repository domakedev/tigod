import Icon from "../../../../assets/icons/student.png";
import IconProfessional from "../../../../assets/icons/professional.png";
import L from "leaflet";

export const visitIconLocation = L.icon({
  iconUrl: Icon,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});

export const proIconLocation = L.icon({
  iconUrl: IconProfessional,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});

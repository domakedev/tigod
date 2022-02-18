import React from "react";
import VoidImage from "../../../../assets/void.png";
import UploadIcon from "../../../../assets/icons/upload.svg";

import "./CardUpdatePhoto.css";

const CardUpdatePhoto = ({
  prevImage = VoidImage,
  newImage = VoidImage,
  cargarNuevaFoto = () => {},
}) => {
  const processFile = async (e) => {
    var file = e.target.files[0];
    var formdata = new FormData();

    formdata.append("file", file);
    formdata.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);

    formdata.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

    let res = await fetch(process.env.REACT_APP_ENDPOINT_CLOUDINARY, {
      method: "post",
      mode: "cors",
      body: formdata,
    });

    let json = await res.json();
    const url = JSON.stringify(json.secure_url);
    const newUrl = url.slice(1, url.length - 1);

    cargarNuevaFoto(newUrl);
  };

  return (
    <div className="config-card">
      <p className="config-card-title">Tu foto de perfil</p>
      <div className="choose-one-option-config-photo">
        <label htmlFor="photo1">
          <img src={prevImage} alt="" />
          {/* <input type="radio" name="photo" id="photo1" /> */}
          Anterior
        </label>
        <label htmlFor="photo2">
          <img src={newImage} alt="" />
          {/* <input type="radio" name="photo" id="photo2" /> */}
          Nueva
        </label>
      </div>
      <div className="update-photo">
        <label htmlFor="uploadimage" onChange={processFile}>
          <img src={UploadIcon} alt="Cargar imagen" />
          <input id="uploadimage" type="file" />
        </label>
      </div>
    </div>
  );
};

export default CardUpdatePhoto;

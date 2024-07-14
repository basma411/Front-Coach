import React, { useRef, useState } from "react";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import "./css/ajoutervideo.css";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import { useNavigate } from "react-router-dom";
import { addvideo } from "../../../Redux/Slice/videoSlice";
import OverlayA from "../OverlayA";

const Ajoutervideo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: "",

    lien: "",
  });

  const photoRef = useRef();
  const handelAcceuil=()=>{
    navigate("/admin/Accueil")
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlevideo = (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("titre", formData.titre);
    formDataToSend.append("lien", formData.lien);
    formDataToSend.append("images", photoRef.current.files[0]);

    dispatch(addvideo(formDataToSend));
    navigate("/admin/videoCoching");
  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <OverlayA/>
      <div className="videoAjouter">
      <button className="btn-ACCEUIL" onClick={()=>handelAcceuil()}>Accueil</button>

        <form className="videoAjouterContainer" onSubmit={handlevideo}>

      <div style={{display:'flex',flexDirection:'column'}}>    <label className="labelAddVideo">Titre :</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleInputChange}
            className="inputAddVideo"
          /></div>
<div style={{display:'flex',flexDirection:'column'}}>
          <label className="labelAddVideo">Photo :</label>
          <input
            type="file"
            ref={photoRef}
            name="images"
          /></div>
        <div style={{display:'flex',flexDirection:'column'}}>  <label className="labelAddVideo">Lien :</label>
          <input
            type="text"
            name="lien"
            value={formData.lien}
            onChange={handleInputChange}
            className="inputAddVideo"
          /></div>

          <button type="submit" className="ButtonAddVideo">Envoyer</button>
        </form>
      </div>
    </>
  );
};

export default Ajoutervideo;

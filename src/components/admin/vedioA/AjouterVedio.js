import React, { useRef, useState } from "react";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import "./css/ajoutervedio.css";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import { useNavigate } from "react-router-dom";
import { addVedio } from "../../../Redux/Slice/VedioSlice";

const AjouterVedio = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titre: "",

    lien: "",
  });

  const photoRef = useRef();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleVedio = (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("titre", formData.titre);
    formDataToSend.append("lien", formData.lien);
    formDataToSend.append("images", photoRef.current.files[0]);

    dispatch(addVedio(formDataToSend));
    navigate("/admin/VedioCoching");
  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <div
        className="ImagePlatforme"
        style={{
          position: "relative",
          textAlign: "center",
          height: "300px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div style={{ paddingTop: "100px" }}>
          <IoPowerOutline style={{ fontSize: "35px", fontWeight: "700" }} />
          <h2 style={{ fontSize: "30px" }}>
            Bienvenue sur votre espace administration
          </h2>
        </div>
      </div>
      <div className="VedioAjouter">
        <form className="VedioAjouterContainer" onSubmit={handleVedio}>
          <label>Titre :</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleInputChange}
            className="styleinput"
          />

          <label>Photo :</label>
          <input
            type="file"
            ref={photoRef}
            className="styleinput"
            name="images"
          />
          <label>Lien :</label>
          <input
            type="text"
            name="lien"
            value={formData.lien}
            onChange={handleInputChange}
            className="styleinput"
          />

          <button type="submit">Envoyer</button>
        </form>
      </div>
    </>
  );
};

export default AjouterVedio;

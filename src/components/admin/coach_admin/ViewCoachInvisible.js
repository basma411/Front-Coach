import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./css/viewcoach.css";
import {
  getCoachInVisivble,
  getCoachVisivble,
} from "../../../Redux/Slice/CoachSlice";
import { getImageUrl } from "../../..";

const ViewCoachInvisible = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const { coacheInvisible } = useSelector((state) => state.coach);

  useEffect(() => {
    dispatch(getCoachInVisivble());
  }, [dispatch]);

  useEffect(() => {
    if (coacheInvisible && id) {
      const CoachView = coacheInvisible.find((coach) => coach._id === id);
      if (CoachView) {
        setFormData(CoachView);
      }
    }
  }, [coacheInvisible, id]);

  return (
    <div className="ViewCoach">
      <div className="viewCoachContainer">
        <h3 className="TitreView">Voir Enregistrement</h3>
        <hr style={{ color: "#ddd" }} />

        <div className="CoachContainer">
          <div className="border-bottom">
            <label className="LabelViewCoach">Nom et Prénom</label>
            <p className="styletexteCoach">{formData.nom}</p>
          </div>

          <div className="border-bottom">
            <label className="LabelViewCoach">Numéro Téléphone</label>
            <p className="styletexteCoach">{formData.num}</p>
          </div>

          <div className="border-bottom">
            <label className="LabelViewCoach" >Domaines D'intervention</label>
            <div className="styletexteCoach">
              {formData.domain?.map((domain, index) => (
                <p key={index} className="styletexteCoach">* {domain}</p>
              ))}
              {formData.AutreDomaine && (
                <p className="styletexteCoach">* {formData.AutreDomaine}</p>
              )}
            </div>
          </div>

          <div className="border-bottom">
            <label className="LabelViewCoach">Adresse Email</label>
            <p className="styletexteCoach">{formData.email}</p>
          </div>

          <div className="border-bottom">
            <label className="LabelViewCoach">Bréve Bio</label>
            <p className="styletexteCoach">{formData.bio}</p>
          </div>

          <label className="LabelViewCoach">Méthode de Coaching</label>
          <div className="styletexteCoach border-bottom">
            {formData.method?.map((methode, index) => (
              <p key={index} className="styletexteCoach">* {methode}</p>
            ))}
          </div>

          <label className="LabelViewCoach">Langue</label>
          <div className="styletexteCoach border-bottom">
            {formData.langue?.map((Langue, index) => (
              <p key={index} className="styletexteCoach">* {Langue}</p>
            ))}
          </div>

          <label className="LabelViewCoach">Type_Client</label>
          <div className="styletexteCoach border-bottom">
            {formData.type_client?.map((TC, index) => (
              <p key={index} className="styletexteCoach">* {TC}</p>
            ))}
          </div>

          <div className="border-bottom">
            <label className="LabelViewCoach">Photo</label>
            <img src={getImageUrl(formData.image)} style={{ display: "block", margin: "auto", width: "100px" }} />
          </div>

          <div className="border-bottom">
            <label className="LabelViewCoach">Site</label>
            <p className="styletexteCoach">{formData.site}</p>
          </div>

          <div className="border-bottom">
            <label className="LabelViewCoach">Facebook</label>
            <p className="styletexteCoach">{formData.fb}</p>
          </div>

          <div className="border-bottom">
            <label className="LabelViewCoach">Linkedin</label>
            <p className="styletexteCoach">{formData.In}</p>
          </div>

          <div className="border-bottom">
            <label className="LabelViewCoach">You Tube</label>
            <p className="styletexteCoach">{formData.yt}</p>
          </div>

          <div className="border-bottom">
            <label className="LabelViewCoach">Piéce Jointe</label>
            <p className="styletexteCoach">{formData.piece}</p>
          </div>

          <div className="border-bottom">
            <label className="LabelViewCoach">Gouvernerats</label>
            <p className="styletexteCoach">{formData.gouv}</p>
          </div>

          <div style={{ width: "100%", padding: "5px" }}>
            <label  className="LabelViewCoach">Tarif</label>
            <p className="styletexteCoach">{formData.tarif ? "oui" : "non"}</p>
          </div>
        </div>

        <button className="button-retour" onClick={() => navigate("/admin/Coachs/invisible")}>
          Retour
        </button>
      </div>
    </div>
  );
};

export default ViewCoachInvisible;

import React, { useEffect, useState } from "react";
import image from '../../images/big_image_atelier.jpg';
import "./css/ajouterAtelier.css";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "../..";
import { GetAtelier } from "../../Redux/Slice/AtelierSlice";
import { GetPublication } from "../../Redux/Slice/PubAtelierSlice";
import { AddList } from "../../Redux/Slice/ListSlice"; // Assurez-vous d'importer votre action addList

const FormAtelier = () => {
  const dispatch = useDispatch();
  const { ateliers } = useSelector((state) => state.atelier);
  const { pubatelier } = useSelector((state) => state.pubatelier);

  const lastAtelier = ateliers.length > 0 ? ateliers[ateliers.length - 1] : null;

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    tel: "",
    mail: "",
    entreprise: "", // Cette valeur sera déterminée par la sélection radio
    poste: "",
    question: ""
  });

  useEffect(() => {
    dispatch(GetAtelier());
    dispatch(GetPublication());
  }, [dispatch, ]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e) => {
    setFormData({ ...formData, entreprise: e.target.value });
  };

  const handleAddAtelier = (e) => {
    e.preventDefault();

    // Extracting values from formData
    const { nom, prenom, tel, mail, entreprise, poste, question } = formData;

    // Dispatching addList action with necessary data
    dispatch(AddList({
      id: lastAtelier ? lastAtelier._id : null,
      data: {
        nom,
        prenom,
        tel,
        mail,
        entreprise,
        poste,
        proposition: question 
      }
    }));

    // Reset form after submission (if needed)
    setFormData({
      nom: "",
      prenom: "",
      tel: "",
      mail: "",
      entreprise: "",
      poste: "",
      question: ""
    });
  };

  const recentPublications  = pubatelier
  .slice()
  .sort(() => Math.random() - 0.5)
  .slice(0, 4); 
  return (
    <>
      <div
        className="ImagePlatformeAtelier"
        style={{
          position: "relative",
          textAlign: "center",
          height: "300px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div style={{ paddingTop: "100px"}}>
          <h3 className="TitreAtelier">Inscription</h3>
        </div>
      </div>

     <div className="AddAtelier">

     <div className="AddAtelier-container">
        <div className="left-Atelier">
          {recentPublications &&
            recentPublications.map((pub, index) => (
              <div key={index}>
                <img src={getImageUrl(pub.img)} alt="atelier" />
                <h1 className="bublAtelier">{pub.titre}</h1>
                <hr />
              </div>
            ))}
        </div>
        <div className="right-Atelier">
          <div>
            {lastAtelier && (
              <>
                <img
                  style={{ display: 'block', margin: '0 auto', width: '300px' }}
                  src={getImageUrl(lastAtelier.photo)}
                  alt="atelier"
                />
                <h3 className="AtelierTheme">{`Théme ${lastAtelier.num}`}</h3>
                <h3 className="AtelierTitre">{lastAtelier.titre}</h3>
                <h3 className="AtelierDate">{lastAtelier.date}</h3>
                <h3 className="AtelierHeure">{lastAtelier.heure}</h3>
                <h3 className="AtelierStatut">{lastAtelier.statut}</h3>
              </>
            )}
            <form onSubmit={handleAddAtelier} style={{marginTop:'50px'}}>
              <label className="labelAtelier">Nom:</label>
              <input type="text" name="nom" className="inputAtelier" value={formData.nom} onChange={handleInputChange} />
              
              <label className="labelAtelier">Prénom:</label>
              <input type="text" name="prenom" className="inputAtelier" value={formData.prenom} onChange={handleInputChange} />
              
              <label className="labelAtelier">Numéro de téléphone:</label>
              <input type="text" name="tel" className="inputAtelier" value={formData.tel} onChange={handleInputChange} />
              
              <label className="labelAtelier">Adresse mail:</label>
              <input type="text" name="mail" className="inputAtelier" value={formData.mail} onChange={handleInputChange} />
              
              <label className="labelAtelier">Entreprise/Coach:</label>
              <div  className="radio">
                <input type="radio" id="entreprise" name="entreprise" value="Entreprise" onChange={handleRadioChange} checked={formData.entreprise === "Entreprise"} />
                <label htmlFor="entreprise" >Entreprise</label>
              </div>
              <div className="radio">
                <input type="radio" id="coach" name="entreprise" value="Coach" onChange={handleRadioChange} checked={formData.entreprise === "Coach"} />
                <label htmlFor="coach" >Coach</label>
              </div>
              
              <label className="labelAtelier">Poste:</label>
              <input type="text" name="poste" className="inputAtelier" value={formData.poste} onChange={handleInputChange} />
              
              <label>Ma question pour un des intervenants (maximum 5 lignes):</label>
              <textarea name="question" className="TextareaAtelier" value={formData.question} onChange={handleInputChange} />
              <label>500
 

 caractères maximum.
 </label>
              <button type="submit" className="BoutonAtelier">Envoyer</button>
            </form>
          </div>
        </div>
      </div>
     </div>
    </>
  );
};

export default FormAtelier;

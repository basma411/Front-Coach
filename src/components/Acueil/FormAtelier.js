import React, { useEffect, useState } from "react";
import image from "../../images/big_image_2.jpg";
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
    // setFormData({
    //   nom: "",
    //   prenom: "",
    //   tel: "",
    //   mail: "",
    //   entreprise: "",
    //   poste: "",
    //   question: ""
    // });
  };

  const recentPublications = pubatelier.slice(-5).reverse();

  return (
    <>
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
          <h2>Partagez un article, une offre</h2>
        </div>
      </div>

      <div className="navigation-arrows">
        <div className="left-Atelier">
          {recentPublications &&
            recentPublications.map((pub, index) => (
              <div key={index}>
                <img src={getImageUrl(pub.img)} alt="atelier" />
                <h1>{pub.titre}</h1>
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
                <p>{`Théme ${lastAtelier.num}`}</p>
                <p>{lastAtelier.titre}</p>
                <p>{lastAtelier.date}</p>
                <p>{lastAtelier.heure}</p>
                <p>{lastAtelier.statut}</p>
              </>
            )}
            <form onSubmit={handleAddAtelier} style={{marginTop:'50px'}}>
              <label>Nom:</label>
              <input type="text" name="nom" className="inputAtelier" value={formData.nom} onChange={handleInputChange} />
              
              <label>Prénom:</label>
              <input type="text" name="prenom" className="inputAtelier" value={formData.prenom} onChange={handleInputChange} />
              
              <label>Numéro de téléphone:</label>
              <input type="text" name="tel" className="inputAtelier" value={formData.tel} onChange={handleInputChange} />
              
              <label>Adresse mail:</label>
              <input type="text" name="mail" className="inputAtelier" value={formData.mail} onChange={handleInputChange} />
              
              <label>Entreprise/Coach:</label>
              <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'10px'}}>
                <input type="radio" id="entreprise" name="entreprise" value="Entreprise" onChange={handleRadioChange} checked={formData.entreprise === "Entreprise"} />
                <label htmlFor="entreprise">Entreprise</label>
              </div>
              <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'10px'}}>
                <input type="radio" id="coach" name="entreprise" value="Coach" onChange={handleRadioChange} checked={formData.entreprise === "Coach"} />
                <label htmlFor="coach">Coach</label>
              </div>
              
              <label>Poste:</label>
              <input type="text" name="poste" className="inputAtelier" value={formData.poste} onChange={handleInputChange} />
              
              <label>Ma question pour un des intervenants (maximum 5 lignes):</label>
              <textarea name="question" className="TextareaAtelier" value={formData.question} onChange={handleInputChange} />
              
              <button type="submit" className="BoutonAtelier">Envoyer</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormAtelier;

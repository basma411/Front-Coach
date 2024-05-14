import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-dropdown-select";
import { getdomaine } from "../../Redux/Slice/DomainSlice";
import { useForm } from "react-hook-form";
import { addCoach, getCoachVisivble } from "../../Redux/Slice/CoachSlice";
import "./css/formulaire.css";
import image from "../../images/big_image_2.jpg";

const Formulaire = () => {
  const dispatch = useDispatch();
  const { coachVisible } = useSelector((state) => state.coach);

  const { domaines } = useSelector((state) => state.domaine);
  const [selectedDomaines, setSelectedDomaines] = useState([]);
  const [compte, setCompte] = useState(0);
  const [gouvernorat, setGouvernorat] = useState("");
  const [selectedMethodes, setSelectedMethodes] = useState([]);
  const [selectedLangues, setSelectedLangues] = useState([]);
  const [selectedTypesClients, setSelectedTypesClients] = useState([]);
  const [tarifPreferentiel, setTarifPreferentiel] = useState()
  const [imageCoach, setImage] = useState(null);
  const [LogoCoach, setLogo] = useState(null);
  const [PdfCoach, setPdf] = useState(null);

  
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const nomPrenomRef = useRef(null);
  const autresDomainesRef = useRef(null);
  const telephoneRef = useRef(null);
  const adresseMailRef = useRef(null);
  const bioRef = useRef(null);
  const siteRef = useRef(null);
  const linkedin = useRef(null);
  const facebook = useRef(null);
  const Youtube = useRef(null);

  useEffect(() => {
    dispatch(getCoachVisivble());
    dispatch(getdomaine());
  }, [dispatch]);

  useEffect(() => {
    setCompte(selectedDomaines.length);
  }, [selectedDomaines]);

  const latestCoach = coachVisible.slice(-3);

  const customContentRenderer = () => {
    return (
      <label>
        <p style={{ color: "#fff", background: "blue", fontSize: "25px", padding: "2px", marginLeft: "600px" }}>
          {compte}
        </p>
      </label>
    );
  };

  const isALLselected = domaines.length > 0 && selectedDomaines.length === domaines.length;

  const handleDomaineChange = (selectedValues) => {
    if (selectedValues.includes("allDomaine")) {
      setSelectedDomaines(isALLselected ? [] : domaines.map((domaine) => ({ value: domaine._id, label: domaine.NomDomaine })));
    } else {
      setSelectedDomaines(selectedValues);
    }
  };

  const handleGouvernoratChange = (e) => {
    setGouvernorat(e.target.value);
  };

  const handleMethodeChange = (methode, checked) => {
    if (checked) {
      setSelectedMethodes((prevSelected) => [...prevSelected, methode]);
    } else {
      setSelectedMethodes((prevSelected) => prevSelected.filter((selected) => selected !== methode));
    }
  };

  const handleLangueChange = (langue, checked) => {
    if (checked) {
      setSelectedLangues((prevSelected) => [...prevSelected, langue]);
    } else {
      setSelectedLangues((prevSelected) => prevSelected.filter((selected) => selected !== langue));
    }
  };

  const handleTypeClientChange = (typeClient, checked) => {
    if (checked) {
      setSelectedTypesClients((prevSelected) => [...prevSelected, typeClient]);
    } else {
      setSelectedTypesClients((prevSelected) => prevSelected.filter((selected) => selected !== typeClient));
    }
  };
  const handleTarifChange = (value) => {
    setTarifPreferentiel(value);
  };
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  
  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };
  const handlePdfChange = (e) => {
    setPdf
    (e.target.files[0]);
  };
  
  const handleAddCoach = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    formData.append("NomPrenom", nomPrenomRef.current.value);
    formData.append("AutreDomaine", autresDomainesRef.current.value);
    formData.append("NumTel", telephoneRef.current.value);
    formData.append("Email", adresseMailRef.current.value);
    formData.append("Bio", bioRef.current.value);
    formData.append("Site", siteRef.current.value);
    formData.append("Facebook", facebook.current.value);
    formData.append("Youtube", Youtube.current.value);
    formData.append("LinkedIn", linkedin.current.value);
    formData.append("Governorat", gouvernorat);
    formData.append("DomainesIntervention", selectedDomaines.map((domaine) => domaine.label));

    formData.append("MethodesDeCoaching", selectedMethodes.join(","));
    formData.append("Langues", selectedLangues.join(","));
    formData.append("TypesDeClients", selectedTypesClients.join(","));
    formData.append("Password", passwordRef.current.value);
    formData.append("ConfirmPassword", confirmPasswordRef.current.value);
    formData.append("TarifPreferentiel", tarifPreferentiel);
    formData.append("imagee", imageCoach);
    formData.append("Logo", LogoCoach);
    formData.append("FichierPDF", PdfCoach);
    console.log(formData);
    dispatch(addCoach(formData))
  };

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
          <h2>Espace Coach
</h2>
        </div>
      </div>
<div className="Formulaire">
        <div className="Formulaire-container">
          <div className="formulaire-left">
            {latestCoach.map((CoachVisible, index) => (
              <div key={index} className="formulaire-Coach">
                <img
                  src={`http://localhost:8000/${CoachVisible.Photo}`}
                  alt="coach"
                />
                <h1 style={{ color: "#000" }}>{CoachVisible.NomPrenom}</h1>
                <h3 style={{ color: "gray" }}>Coach</h3>
                <h3 style={{ color: "gary" }}>Brève bio</h3>
                <p>{CoachVisible.Bio}</p>
              </div>
            ))}
          </div>
          
          <div className="formulaire-right">
            <h1>Remplissez le formulaire ci-joint et faites partie de notre communauté de coachs.</h1>
            <form onSubmit={handleAddCoach}  >
              <label>Nom et prénom:</label>
              <input type="text"  ref={nomPrenomRef}/>
              <label>Domaines d’intervention:</label>
              <Select 
  options={domaines && [
    {
      value: "allDomaine",
      label: (
        <label>
        <input
          type="checkbox"
          checked={isALLselected}
          onChange={() =>
            handleDomaineChange(
              isALLselected
                ? []
                : domaines.map((domaine) => ({
                    value: domaine._id,
                    label: domaine.NomDomaine,
                  }))
            )
          }
          className="CHECK"

        />
        <span style={{ marginLeft: "0px", color: "black" }}>
          Tous les domaines
        </span>
      </label>
      
      ),
    },
    ...domaines.map((domaine) => ({
      value: domaine._id,
      label: (
        <label>
          <input
            type="checkbox"
            checked={selectedDomaines.some(
              (selected) => selected.value === domaine._id
            )}
            onChange={() =>
              handleDomaineChange(
                selectedDomaines.some(
                  (selected) => selected.value === domaine._id
                )
                  ? selectedDomaines.filter(
                      (selected) => selected.value !== domaine._id
                    )
                  : [
                      ...selectedDomaines,
                      { value: domaine._id, label: domaine.NomDomaine },
                    ]
              )
            }
            className="CHECK"
          />
          <span style={{ marginLeft: "8px", color: "black" }}>{domaine.NomDomaine}</span>
        </label>
      ),
    })),
  ]}
  multi
  color="none"
  contentRenderer={customContentRenderer}
  style={{ width: "100%" }}

/>

              <label>Autres domaines:</label>
              <input
                type="text"
                placeholder=""
               ref={autresDomainesRef}
              />
              <label>Gouvernorats</label>
              <select
            id="gouvernorat"
        
                        className="Gouvernorat"
                        value={gouvernorat}
                        onChange={handleGouvernoratChange}
          >
            {[
              "Tunis",
              "Ariana",
              "Ben Arous",
              "Manouba",
              "Nabeul",
              "Zaghouan",
              "Bizerte",
              "Béja",
              "Jendouba",
              "Kef",
              "Siliana",
              "Kairouan",
              "Kasserine",
              "Sidi Bouzid",
              "Sousse",
              "Monastir",
              "Mahdia",
              "Sfax",
              "Kébili",
              "Gabès",
              "Medenine",
              "Tataouine",
              "Tozeur",
              "Gafsa",
            ].map((gouvernorat, index) => (
              <option key={index}  
             >
                {gouvernorat} 
              </option>
            ))}
          </select>
              <label>Numéro de téléphone:</label>
              <input
                type="text"
                placeholder=""
            ref={telephoneRef}
              />
              <label>Adresse mail:</label>
              <input type="text" placeholder="" ref={adresseMailRef}/>
              <label>Mot de passe:</label>
              <input type="password" placeholder="" ref={passwordRef} />
              <label>Confirmer Mot de passe:</label>
              <input type="password" placeholder="" ref={confirmPasswordRef}/>
              <label>Brève Bio (maximum 5 lignes):</label>
              <input type="text" placeholder=""  style={{height:'300px'}}   ref={bioRef}/>
              <label>Méthodes de coaching:</label>
              <div className="checkbox">
            <div>
              <input
                type="checkbox"
                id="face-a-face"
                name="face-a-face"
                onChange={(e) =>
                  handleMethodeChange("Face à face", e.target.checked)
                }
              />
            </div>
            <label htmlFor="face-a-face">Face à face</label>
          </div>
          <div className="checkbox">
            <div>
              <input
                type="checkbox"
                id="en-ligne"
                name="en-ligne"
                onChange={(e) =>
                  handleMethodeChange("En ligne", e.target.checked)
                }
              />
            </div>
            <label htmlFor="en-ligne">En ligne</label>
          </div>

              <label>Langues</label>
              <div className="checkbox">
            <input
              type="checkbox"
              id="arabe"
              name="arabe"
              onChange={(e) => handleLangueChange("Arabe", e.target.checked)}

            />

            <label htmlFor="arabe">Arabe</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="français"
              name="français"
              onChange={(e) => handleLangueChange("Français", e.target.checked)}

            />

            <label htmlFor="français">Français</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="anglais"
              name="anglais"
              onChange={(e) => handleLangueChange("Anglais", e.target.checked)}

            />
            <label htmlFor="anglais">Anglais</label>
          </div>
              <label>Types de clients:</label>
              <div className="checkbox">
            <input
              type="checkbox"
              id="personne"
              name="personne"
              onChange={(e) => handleTypeClientChange("Personne", e.target.checked)}

            />
            <label htmlFor="personne">Personne</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="organisation"
              name="organisation"
              onChange={(e) => handleTypeClientChange("Organisation", e.target.checked)}

            />
            <label htmlFor="organisation">Organisation</label>
          </div>
              <label>
                Tarif préférentiel (réduction de 10% pour les clients de la
                plateforme):
              </label>
              <div>
            <div className="checkbox">
              <input
                type="radio"
                id="organisation-oui"
                name="tarif"
                onChange={() => handleTarifChange(true)}         

  />
              <label htmlFor="organisation-oui">oui</label>
            </div>

            <div className="checkbox">
              <input
                type="radio"
                id="organisation-non"
                name="tarif"
                onChange={() => handleTarifChange(false)}         

                          />
              <label htmlFor="organisation-non">non</label>
            </div>
          </div>
              <label>Photo</label>
              <input type="file" placeholder=""  name="imagee" onChange={handleFileChange}/>
              <label>Lien du site:</label>
              <input type="text" placeholder="" ref={siteRef}/>
              <label>Logo</label>
              <input type="file" placeholder=" " name="logo" onChange={handleLogoChange} />
              <label>Réseaux sociaux :</label>
              <input type="text" placeholder="" ref={facebook}/>
              

              <input type="text" placeholder=""  ref={Youtube} />
              <input type="text" placeholder=""  ref={linkedin}/>
              <label>
                Un fichier PDF contenant toute pièce justifiant l’expérience en
                coaching et toutes autres compétences (diplômes, certificats,
                formations):
              </label>
              <input type="file" placeholder=" "  name="fichierPDF" onChange={handlePdfChange} />
              <input type="submit" className="sabmit" />
            </form>
          </div>

    </div> 
    </div> 
  

     </>
   
  );
};

export default Formulaire;

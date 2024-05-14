import React, { useEffect, useRef, useState } from "react";
import "./css/edit.css";
import { useDispatch, useSelector } from "react-redux";
import { getdomaine } from "../../Redux/Slice/DomainSlice";
import { UpdateCoach, getCoach } from "../../Redux/Slice/CoachSlice";
import { useNavigate, useParams } from "react-router-dom";

const Edit = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const { id } = useParams();

  const { domaines } = useSelector((state) => state.domaine);
  const { coachdata } = useSelector((state) => state.coach);
  const Nom = useRef();
  const Email = useRef();
  const Numero = useRef();
  const Site = useRef();
  const Facebook = useRef();
  const LinkedIn = useRef();
  const Youtube = useRef();
  const Bio = useRef();
  const [selectedDomaines, setSelectedDomaines] = useState(
    coachdata.DomainesIntervention || [] // Assurer une valeur par défaut []
  );

  const [selectedLangue, setselectedLangue] = useState(coachdata.Langues || []);
  const [selectedMethode, setselectedMethode] = useState(
    coachdata.MethodesDeCoaching || []
  );
  const [selectedTypesClient, setSelectedTypesClient] = useState(
    coachdata.TypesDeClients || []
  );
  const [tarifPreferentiel, setTarifPreferentiel] = useState(
    coachdata.TarifPreferentiel || false)
  const [imageCoach, setImage] = useState(null);
  const [gouvernorat, setGouvernorat] = useState(coachdata.Governorat || "");

  useEffect(() => {
    dispatch(getCoach());
    dispatch(getdomaine());
    
  }, [dispatch]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    // Ajoutez le fichier à l'objet FormData
    formData.append("imagee", imageCoach);
    formData.append("NomPrenom", Nom.current.value);
    formData.append("Email", Email.current.value);
    formData.append("NumTel", Numero.current.value);
    formData.append("Site", Site.current.value);
    formData.append("Facebook", Facebook.current.value);
    formData.append("LinkedIn", LinkedIn.current.value);
    formData.append("Youtube", Youtube.current.value);
    formData.append("Bio", Bio.current.value);
    formData.append("DomainesIntervention", selectedDomaines.join(","));
    formData.append("MethodesDeCoaching", selectedMethode.join(","));
    formData.append("Langues", selectedLangue.join(","));
    formData.append("TypesDeClients", selectedTypesClient.join(","));
    formData.append("TarifPreferentiel", tarifPreferentiel ? "true" : "false");
    formData.append("Governorat", gouvernorat);

    dispatch(UpdateCoach({ id, formData }));
    alert("Profil modifié");

    navigator("/coach/profil");
  };

  const handleDomaineChange = (domaine, checked) => {
    if (checked) {
      setSelectedDomaines((prevSelected) => [...prevSelected, domaine]);
    } else {
      setSelectedDomaines((prevSelected) =>
        prevSelected.filter((selected) => selected !== domaine)
      );
    }
  };
  const handleMethodeChange = (methode, checked) => {
    if (checked) {
      setselectedMethode((prevSelected) => [...prevSelected, methode]);
    } else {
      setselectedMethode((prevSelected) =>
        prevSelected.filter((selected) => selected !== methode)
      );
    }
  };
  const handleLangueChange = (Langue, checked) => {
    if (checked) {
      setselectedLangue((prevSelected) => [...prevSelected, Langue]);
    } else {
      setselectedLangue((prevSelected) =>
        prevSelected.filter((selected) => selected !== Langue)
      );
    }
  };
  const handleTypeClientChange = (typeClient, checked) => {
    if (checked) {
      setSelectedTypesClient((prevSelected) => [...prevSelected, typeClient]);
    } else {
      setSelectedTypesClient((prevSelected) =>
        prevSelected.filter((selected) => selected !== typeClient)
      );
    }
  };
  
  const handleTarifChange = (value) => {
    setTarifPreferentiel(value);
  };
  const handleGouvernoratChange = (e) => {
    setGouvernorat(e.target.value);
  };
  return (
    <div className="container">
      <div className="Profil">
        <form onSubmit={handleSubmit}>
          <label htmlFor="Nom">Nom et Prénom</label>
          <br />
          <textarea
            type="text"
            id="nom"
            name="Nom"
            defaultValue={coachdata.NomPrenom}
            ref={Nom}
          />
          <br />

          <label htmlFor="Email">Email</label>
          <br />
          <textarea
            type="text"
            id="Email"
            name="Email"
            defaultValue={coachdata.Email}
            ref={Email}
          />
          <br />

          <label htmlFor="Numéro">Numéro</label>
          <br />
          <textarea
            type="text"
            id="Numéro"
            name="Numéro"
            defaultValue={coachdata.NumTel}
            ref={Numero}
          />
          <br />

          <div className="domaineIntervention">
            <label>Domaines d'intervention</label>
            <br />
            {Array.isArray(domaines) &&
              domaines.map((domaine, index) => (
                <div key={index} className="domaine checkbox">
                  <div>
                    <input
                      type="checkbox"
                      id={`domaine-${index}`}
                      name={`domaine-${index}`}
                      defaultChecked={
                        coachdata.DomainesIntervention &&
                        coachdata.DomainesIntervention.includes(
                          domaine.NomDomaine
                        )
                      }
                      onChange={(e) =>
                        handleDomaineChange(
                          domaine.NomDomaine,
                          e.target.checked
                        )
                      }
                    />
                  </div>
                  <label htmlFor={`domaine-${index}`}>
                    {domaine.NomDomaine}
                  </label>
                </div>
              ))}
          </div>

          <label htmlFor="Gouvernorat">Gouvernorat</label>
          <br />
          <select
            id="gouvernorat"
            value={gouvernorat}
            onChange={handleGouvernoratChange}
                        className="Gouvernorat"
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
              <option key={index} value={gouvernorat}>
                {gouvernorat} 
              </option>
            ))}
          </select>

          <label htmlFor="Méthodes de coaching:">Méthodes de coaching:</label>
          <br />
          <div className="checkbox">
            <div>
              <input
                type="checkbox"
                id="face-a-face"
                name="face-a-face"
                defaultChecked={
                  coachdata.MethodesDeCoaching &&
                  coachdata.MethodesDeCoaching.includes("Face à face")
                }
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
                defaultChecked={
                  coachdata.MethodesDeCoaching &&
                  coachdata.MethodesDeCoaching.includes("En ligne")
                }
                onChange={(e) =>
                  handleMethodeChange("En ligne", e.target.checked)
                }
              />
            </div>
            <label htmlFor="en-ligne">En ligne</label>
          </div>

          <label htmlFor="Langues:">Langues:</label>
          <br />
          <div className="checkbox">
            <input
              type="checkbox"
              id="arabe"
              name="arabe"
              defaultChecked={
                coachdata.Langues && coachdata.Langues.includes("Arabe")
              }
              onChange={(e) => handleLangueChange("Arabe", e.target.checked)}
            />

            <label htmlFor="arabe">Arabe</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="français"
              name="français"
              defaultChecked={
                coachdata.Langues && coachdata.Langues.includes("Français")
              }
              onChange={(e) => handleLangueChange("Français", e.target.checked)}
            />

            <label htmlFor="français">Français</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="anglais"
              name="anglais"
              defaultChecked={
                coachdata.Langues && coachdata.Langues.includes("Anglais")
              }
              onChange={(e) => handleLangueChange("Anglais", e.target.checked)}
            />
            <label htmlFor="anglais">Anglais</label>
          </div>

          <label htmlFor="Types de clients:">Types de clients:</label>
          <br />
          <div className="checkbox">
            <input
              type="checkbox"
              id="personne"
              name="personne"
              defaultChecked={coachdata.TypesDeClients && coachdata.TypesDeClients.includes("Personne")}
              onChange={(e) => handleTypeClientChange("Personne", e.target.checked)}
            />
            <label htmlFor="personne">Personne</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="organisation"
              name="organisation"
              defaultChecked={coachdata.TypesDeClients && coachdata.TypesDeClients.includes("Organisation")}
              onChange={(e) => handleTypeClientChange("Organisation", e.target.checked)}
            />
            <label htmlFor="organisation">Organisation</label>
          </div>

          <label htmlFor="Tarif:">
            Tarif préférentiel (réduction de 10% pour les clients de la
            plateforme):
          </label>
          <br />

          <div>
            <div className="checkbox">
              <input
                type="radio"
                id="organisation-oui"
                name="tarif"
                checked={tarifPreferentiel === true}
                onChange={() => handleTarifChange(true)}          />
              <label htmlFor="organisation-oui">oui</label>
            </div>

            <div className="checkbox">
              <input
                type="radio"
                id="organisation-non"
                name="tarif"
                checked={tarifPreferentiel === false}
                onChange={() => handleTarifChange(false)}
                          />
              <label htmlFor="organisation-non">non</label>
            </div>
          </div>

          <label htmlFor="Site">Site</label>
          <br />
          <textarea
            type="text"
            id="Site"
            name="Site"
            defaultValue={coachdata.Site}
            ref={Site}
          />
          <br />

          <label htmlFor="Facebook">Facebook</label>
          <br />
          <textarea
            type="text"
            id="Facebook"
            name="Facebook"
            defaultValue={coachdata.Facebook}
            ref={Facebook}
          />
          <br />

          <label htmlFor="LinkedIn">LinkedIn</label>
          <br />
          <textarea
            type="text"
            id="LinkedIn"
            name="LinkedIn"
            defaultValue={coachdata.LinkedIn}
            ref={LinkedIn}
          />
          <br />

          <label htmlFor="Youtube">You Tube</label>
          <br />
          <textarea
            type="text"
            id="Youtube"
            name="Youtube"
            defaultValue={coachdata.Youtube}
            ref={Youtube}
          />
          <br />

          <label htmlFor="Brève Bio">Brève Bio</label>
          <br />
          <textarea
            type="text"
            id="Brève Bio"
            name="Brève Bio"
            defaultValue={coachdata.Bio}
            ref={Bio}
          />
          <br />
          <label htmlFor="otherFileInput:">Photo:</label>
          <div className="updateimage">
            <img
              src={`http://localhost:8000/${coachdata.Photo}`}
              style={{ width: "150px", height: "150px" }}
              name="imagee"
            />
            <input type="file" name="imagee" onChange={handleFileChange} />
          </div>

          <div className="Update">
            <button type="submit" className="modifier">Modifier</button>
            <h3>Annuler</h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;

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
  const { coachdata, isLoading, error } = useSelector((state) => state.coach);
  const Nom = useRef();
  const Email = useRef();
  const Numero = useRef();
  const Site = useRef();
  const Facebook = useRef();
  const LinkedIn = useRef();
  const Youtube = useRef();
  const Bio = useRef();
  const Image=useRef()
  const [selectedDomaines, setSelectedDomaines] = useState(
    coachdata.DomainesIntervention || [] // Assurer une valeur par défaut []
  );

  const [selectedMethode, setselectedMethode] = useState(
    coachdata.MethodesDeCoaching || [] 
  );
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(getCoach());
    dispatch(getdomaine());
  }, [dispatch]);

  const handleUpdate = async (event) => {
    event.preventDefault();
     const formData = new FormData();
    formData.append('Photo', Image.current.files[0]);
    const updatedData = {
      // _id: id,
      NomPrenom: Nom.current.value,
      Email: Email.current.value,
      NumTel: Numero.current.value,
      Site: Site.current.value,
      Facebook: Facebook.current.value,
      LinkedIn: LinkedIn.current.value,
      Youtube: Youtube.current.value,
      Bio: Bio.current.value,
      DomainesIntervention: selectedDomaines.join(","),
      MethodesDeCoaching: selectedMethode.join(","),
// Photo:selectedImage
    };
    try {
      await dispatch(UpdateCoach({_id: id,Photo:selectedImage}));
console.log(selectedImage.name)
      navigator("/coach/profil");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du coach :", error);
    }
   
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
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
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
  return (
    <div className="container">
      <div className="Profil">
        <form>
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
            {domaines &&
              domaines.map((domaine, index) => (
                <div key={index} className="domaine checkbox">
                  <div>
                    <input
                      type="checkbox"
                      id={`domaine-${index}`}
                      name={`domaine-${index}`}
                      defaultChecked={
                        selectedDomaines &&
                        selectedDomaines.includes(domaine.NomDomaine)
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
            defaultValue={coachdata.Governorat}
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
                selectedMethode &&
                selectedMethode.includes("Face à face")
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
                selectedMethode &&
                selectedMethode.includes("En ligne")
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
              defaultChecked={
                coachdata.TypesDeClients &&
                coachdata.TypesDeClients.includes("Personne")
              }
            />
            <label htmlFor="personne">Personne</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="organisation"
              name="organisation"
              defaultChecked={
                coachdata.TypesDeClients &&
                coachdata.TypesDeClients.includes("Organisation")
              }
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
                type="checkbox"
                id="organisation-oui"
                name="tarif"
                defaultChecked={coachdata.TarifPreferentiel === true}
              />
              <label htmlFor="organisation-oui">oui</label>
            </div>

            <div className="checkbox">
              <input
                type="checkbox"
                id="organisation-non"
                name="tarif"
                defaultChecked={coachdata.TarifPreferentiel === false}
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
          <label htmlFor="Photo:">Photo:</label>
          <div className="updateimage">
          <img src={`http://localhost:8000/${coachdata.Photo}`} alt="Coach" />
          <input
              type="file"
              id="Photo"
              name="Photo"
              accept="image/*"
              style={{ border: "transparent" }}
              onChange={handleImageChange} // Gérez le changement de l'image ici
              ref={Image}
            />
          </div>

          <div className="Update">
            <button type="submit" onClick={handleUpdate}>
              Modifier
            </button>
            <h3>Annuler</h3>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;



import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-dropdown-select";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { addCoach, getCoachVisivble } from "../../Redux/Slice/CoachSlice";
import { getdomaine } from "../../Redux/Slice/DomainSlice";
import image from "../../images/big_image_2.jpg";
import { getImageUrl } from "../..";
import "./css/formulaire.css";
import { useNavigate } from "react-router-dom";
import { FaYoutube, FaLinkedin, FaFacebook } from "react-icons/fa";

const Formulaire = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const { coachVisible, error } = useSelector((state) => state.coach);
  const { domaines } = useSelector((state) => state.domaine);
  const [selectedDomaines, setSelectedDomaines] = useState([]);
  const [compte, setCompte] = useState(0);
  const [gouvernorat, setGouvernorat] = useState("");
  const [selectedMethodes, setSelectedMethodes] = useState([]);
  const [selectedLangues, setSelectedLangues] = useState([]);
  const [selectedTypesClients, setSelectedTypesClients] = useState([]);
  const [tarifPreferentiel, setTarifPreferentiel] = useState();
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

  const customContentRenderer = () => (
    <label>
      <p style={{
        color: "#fff",
        background: "#ADD8E6",
        fontSize: "15px",
        marginTop: "18px",
        marginLeft: "600px",
      }}>
        {compte}
      </p>
    </label>
  );

  const isALLselected = domaines.length > 0 && selectedDomaines.length === domaines.length;

  const handleDomaineChange = (selectedValues) => {
    if (selectedValues.includes("allDomaine")) {
      setSelectedDomaines(
        isALLselected
          ? []
          : domaines.map((domaine) => ({
              value: domaine._id,
              label: domaine.domaines,
            }))
      );
    } else {
      setSelectedDomaines(selectedValues);
    }
  };

  const handleGouvernoratChange = (e) => setGouvernorat(e.target.value);

  const handleMethodeChange = (methode, checked) => {
    setSelectedMethodes((prevSelected) =>
      checked
        ? [...prevSelected, methode]
        : prevSelected.filter((selected) => selected !== methode)
    );
  };

  const handleLangueChange = (langue, checked) => {
    setSelectedLangues((prevSelected) =>
      checked
        ? [...prevSelected, langue]
        : prevSelected.filter((selected) => selected !== langue)
    );
  };

  const handleTypeClientChange = (typeClient, checked) => {
    setSelectedTypesClients((prevSelected) =>
      checked
        ? [...prevSelected, typeClient]
        : prevSelected.filter((selected) => selected !== typeClient)
    );
  };

  const handleTarifChange = (value) => setTarifPreferentiel(value);

  const handleFileChange = (e) => setImage(e.target.files[0]);

  const handleLogoChange = (e) => setLogo(e.target.files[0]);

  const handlePdfChange = (e) => setPdf(e.target.files[0]);

  const handleAddCoach = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("nom", nomPrenomRef.current.value);
    formData.append("AutreDomaine", autresDomainesRef.current.value);
    formData.append("num", telephoneRef.current.value);
    formData.append("email", adresseMailRef.current.value);
    formData.append("bio", bioRef.current.value);
    formData.append("site", siteRef.current.value);
    formData.append("fb", facebook.current.value);
    formData.append("yt", Youtube.current.value);
    formData.append("In", linkedin.current.value);
    formData.append("gouv", gouvernorat);
    formData.append("domain", selectedDomaines.map((domaine) => domaine.label));
    formData.append("method", selectedMethodes.join(","));
    formData.append("langue", selectedLangues.join(","));
    formData.append("type_client", selectedTypesClients.join(","));
    formData.append("pwd", passwordRef.current.value);
    formData.append("ConfirmPassword", confirmPasswordRef.current.value);
    formData.append("tarif", tarifPreferentiel);
    formData.append("imagee", imageCoach);
    formData.append("logo", LogoCoach);
    formData.append("piece", PdfCoach);

    try {
      const resultAction = await dispatch(addCoach(formData)).unwrap();
      if (resultAction.msg === 'successfully') {
        toast.success("Coach ajouté avec succès !");
      } else {
        toast.error(resultAction.error.msg  || 'Erreur lors de l\'ajout du coach.');
      }
    } catch (error) {
      toast.error(error || 'Erreur lors de l\'ajout du coach.');
    }
    navigate('/EspaceCoach')
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
        <div >
          <h3 className="Coach_Titre ">Espace Coach</h3>
        </div>
      </div>
      <div className="Formulaire">
        <div className="Formulaire-container">
          <div className="formulaire-left">
            {latestCoach.map((CoachVisible, index) => (
              <div key={index} className="formulaire-Coach">
                <img
           src={getImageUrl(CoachVisible.image)}
                  alt="coach"
                  className="formulaire-left-img"
                />
                <h3 className="nomCOACH" >{CoachVisible.nom}</h3>
                <h3 className="COACH">Coach</h3>

                <div className="social-icons">
                  {CoachVisible.yt && (
                    <a href={CoachVisible.yt} target="_blank" rel="noopener noreferrer">
                      <FaYoutube className="iconCOACH" />
                    </a>
                  )}
                  {CoachVisible.In && (
                    <a href={CoachVisible.In} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin className="iconCOACH" />
                    </a>
                  )}
                  {CoachVisible.fb && (
                    <a href={CoachVisible.fb} target="_blank" rel="noopener noreferrer">
                      <FaFacebook className="iconCOACH" />
                    </a>
                  )}
                                  </div>






                <h3 className="bioCOACHtitre">Brève bio</h3>
                <p className="bioCOACH">{CoachVisible.bio}</p>
              </div>
            ))}
          </div>

          <div className="formulaire-right">
            <h3 className="formulairCOACH">
              Remplissez le formulaire ci-joint et faites partie de notre
              communauté de coachs.
            </h3>
            <form onSubmit={handleAddCoach}>
              <label className="TITREcoach">Nom et prénom:</label>
              <input type="text" ref={nomPrenomRef} className="inputCoach" />
              <label  className="TITREcoach">Domaines d’intervention:</label>
              <Select
                              className="domaine"

                options={
                  domaines && [
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
                                      label: domaine.domaines,
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
                                      (selected) =>
                                        selected.value !== domaine._id
                                    )
                                  : [
                                      ...selectedDomaines,
                                      {
                                        value: domaine._id,
                                        label: domaine.domaines,
                                      },
                                    ]
                              )
                            }
                            className="CHECK"
                          />
                          <span style={{ marginLeft: "8px", color: "black" }}>
                            {domaine.domaines}
                          </span>
                        </label>
                      ),
                    })),
                  ]
                }
                multi
                color="none"
                contentRenderer={customContentRenderer}
                style={{ width: "100%" }}
              />

              <label  className="TITREcoach">Autres domaines:</label>
              <input
                type="text"
                placeholder=""
                ref={autresDomainesRef}
                className="inputCoach"
              />
              <label  className="TITREcoach">Gouvernorats</label>
              <select
                id="gouvernorat"
                className="gouvernorat"
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
                  <option key={index}>{gouvernorat}</option>
                ))}
              </select>
              <label  className="TITREcoach">Numéro de téléphone:</label>
              <input
                type="text"
                placeholder=""
                ref={telephoneRef}
                className="inputCoach"
              />
              <label  className="TITREcoach">Adresse mail:</label>
              <input
                type="text"
                placeholder=""
                ref={adresseMailRef}
                className="inputCoach"
              />
              <label  className="TITREcoach">Mot de passe:</label>
              <input
                type="password"
                placeholder=""
                ref={passwordRef}
                className="inputCoach"
              />
              <label  className="TITREcoach">Confirmer Mot de passe:</label>
              <input
                type="password"
                placeholder=""
                ref={confirmPasswordRef}
                className="inputCoach"
              />
              <label  className="TITREcoach">Brève Bio (maximum 5 lignes):</label>
              <textarea
                placeholder=""
                style={{ height: "300px" }}
                ref={bioRef}
                className="inputCoach"
              />
              <label  className="TITREcoach">Méthodes de coaching:</label>
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
                <label  htmlFor="en-ligne">En ligne</label>
              </div>

              <label  className="TITREcoach">Langues</label>
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="arabe"
                  name="arabe"
                  onChange={(e) =>
                    handleLangueChange("Arabe", e.target.checked)
                  }
                />

                <label htmlFor="arabe">Arabe</label>
              </div>
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="français"
                  name="français"
                  onChange={(e) =>
                    handleLangueChange("Français", e.target.checked)
                  }
                />

                <label htmlFor="français">Français</label>
              </div>
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="anglais"
                  name="anglais"
                  onChange={(e) =>
                    handleLangueChange("Anglais", e.target.checked)
                  }
                />
                <label htmlFor="anglais">Anglais</label>
              </div>
              <label  className="TITREcoach">Types de clients:</label>
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="personne"
                  name="personne"
                  onChange={(e) =>
                    handleTypeClientChange("Personne", e.target.checked)
                  }
                />
                <label htmlFor="personne">Personne</label>
              </div>
              <div className="checkbox">
                <input
                  type="checkbox"
                  id="organisation"
                  name="organisation"
                  onChange={(e) =>
                    handleTypeClientChange("Organisation", e.target.checked)
                  }
                />
                <label htmlFor="organisation">Organisation</label>
              </div>
              <label  className="TITREcoach">
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
              <label  className="TITREcoach">Photo</label>
              <input
                type="file"
                placeholder=""
                name="imagee"
                onChange={handleFileChange}
                className="filecoach"
              />
              <label  className="TITREcoach">Lien du site:</label>
              <input
                type="text"
                placeholder=""
                ref={siteRef}
                className="inputCoach"
              />
              <label  className="TITREcoach">Logo</label>
              <input
                type="file"
                placeholder=" "
                name="logo"
                onChange={handleLogoChange}
                className="filecoach"
              />
              <label  className="TITREcoach">Réseaux sociaux :</label>
              <br />
              <label  className="TITREcoach">Facebook:</label>

              <input
                type="text"
                placeholder=""
                ref={facebook}
                className="inputCoach"
              />
              <label  className="TITREcoach">Youtube:</label>

              <input
                type="text"
                placeholder=""
                ref={Youtube}
                className="inputCoach"
              />

              <label  className="TITREcoach">Linkedin:</label>

              <input
                type="text"
                placeholder=""
                ref={linkedin}
                className="inputCoach"
              />
              <label  className="TITREcoach">
                Un fichier PDF contenant toute pièce justifiant l’expérience en
                coaching et toutes autres compétences (diplômes, certificats,
                formations):
              </label>
              <input
                type="file"
                placeholder=" "
                name="fichierPDF"
                onChange={handlePdfChange}
                className="filecoach"
              />
              <input type="submit" className="AddCoach" />
              <ToastContainer />

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Formulaire;

import React, { useEffect, useRef, useState } from 'react';
import './css/coachedit.css';
import { UpdateCoachVisibleAdmin, getCoachVisivble } from '../../../Redux/Slice/CoachSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getdomaine } from '../../../Redux/Slice/DomainSlice';

const EditCoach = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { coachVisible } = useSelector((state) => state.coach);
  const { domaines } = useSelector((state) => state.domaine);

  useEffect(() => {
    dispatch(getCoachVisivble());
    dispatch(getdomaine());
  }, [dispatch]);

  const [formData, setFormData] = useState({});
  const [selectedDomaines, setSelectedDomaines] = useState([]);
  const [gouvernorat, setGouvernorat] = useState("");
  const [selectedMethode, setSelectedMethode] = useState([]);
  const [selectedLangue, setSelectedLangue] = useState([]);
  const [selectedTypesClient, setSelectedTypesClient] = useState([]);
  const [tarifPreferentiel, setTarifPreferentiel] = useState(false);

  useEffect(() => {
    if (coachVisible && id) {
      const coachEdit = coachVisible.find(coach => coach._id === id);
      if (coachEdit) {
        setFormData(coachEdit);
        setSelectedDomaines(coachEdit.domain || []);
        setGouvernorat(coachEdit.gouv || "");
        setSelectedMethode(coachEdit.method || []);
        setSelectedLangue(coachEdit.langue || []);
        setSelectedTypesClient(coachEdit.type_client || []);
        setTarifPreferentiel(coachEdit.tarif || false);
      }
    }
  }, [coachVisible, id]);
console.log(selectedDomaines)
  const Nom = useRef(null);
  const Email = useRef(null);
  const Num = useRef(null);
  const Site = useRef(null);
  const Facebook = useRef(null);
  const Youtube = useRef(null);
  const Linkedin = useRef(null);
  const Bio = useRef(null);

  const handleDomaineChange = (domaine, checked) => {
    setSelectedDomaines(prevSelected =>
      checked ? [...prevSelected, domaine] : prevSelected.filter(selected => selected !== domaine)
    );
  };

  const handleGouvernoratChange = (e) => {
    setGouvernorat(e.target.value);
  };

  const handleMethodeChange = (methode, checked) => {
    setSelectedMethode(prevSelected =>
      checked ? [...prevSelected, methode] : prevSelected.filter(selected => selected !== methode)
    );
  };

  const handleLangueChange = (langue, checked) => {
    setSelectedLangue(prevSelected =>
      checked ? [...prevSelected, langue] : prevSelected.filter(selected => selected !== langue)
    );
  };

  const handleTypeClientChange = (typeClient, checked) => {
    setSelectedTypesClient(prevSelected =>
      checked ? [...prevSelected, typeClient] : prevSelected.filter(selected => selected !== typeClient)
    );
  };

  const handleTarifChange = (value) => {
    setTarifPreferentiel(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('nom', Nom.current.value);
    formData.append('email', Email.current.value);
    formData.append('num', Num.current.value);
    formData.append('site', Site.current.value);
    formData.append('fb', Facebook.current.value);
    formData.append('yt', Youtube.current.value);
    formData.append('In', Linkedin.current.value);
    formData.append('bio', Bio.current.value);
    formData.append('domain', selectedDomaines.join(',')); // Joining the array for proper string representation
    formData.append('gouv', gouvernorat);
    formData.append('method', selectedMethode.join(','));  // Joining the array for proper string representation
    formData.append('langue', selectedLangue.join(','));   // Joining the array for proper string representation
    formData.append('type_client', selectedTypesClient.join(',')); // Joining the array for proper string representation
    formData.append('tarif', tarifPreferentiel);
  
    dispatch(UpdateCoachVisibleAdmin({ id, data: formData }));
    alert("Nom modifié");
    navigate("/admin/Coachs/visible");
  };

  return (
    <div className='CoachEdit'>
      <div className='CoachEditContainer'>
        <form onSubmit={handleSubmit} className='CoachContainer'>
          <label>Nom Et Prénom</label>
          <textarea defaultValue={formData.nom} ref={Nom} style={{ width: '100%' }}></textarea>

          <label>Email</label>
          <textarea defaultValue={formData.email} ref={Email} style={{ width: '100%' }}></textarea>

          <label>Numéro</label>
          <textarea defaultValue={formData.num} ref={Num} style={{ width: '100%' }}></textarea>

          <label>Domaines d’intervention:</label>
          {Array.isArray(domaines) && domaines.map((domaine, index) => (
            <div key={index} className="domaine checkbox">
              <div>
                <input
                  type="checkbox"
                  id={`domaine-${index}`}
                  name={`domaine-${index}`}
                  checked={selectedDomaines.includes(domaine.domaines)}
                  onChange={(e) => handleDomaineChange(domaine.domaines, e.target.checked)}
                />
              </div>
              <label htmlFor={`domaine-${index}`}>{domaine.domaines}</label>
            </div>
          ))}

          <label>Gouvernorats:</label>
          <select
            id="gouvernorat"
            value={gouvernorat}
            onChange={handleGouvernoratChange}
            className="Gouvernorat"
          >
            {[
              "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Béja", "Jendouba", "Kef", "Siliana", "Kairouan", "Kasserine", "Sidi Bouzid", "Sousse", "Monastir", "Mahdia", "Sfax", "Kébili", "Gabès", "Medenine", "Tataouine", "Tozeur", "Gafsa"
            ].map((gouvernorat, index) => (
              <option key={index} value={gouvernorat}>{gouvernorat}</option>
            ))}
          </select>

          <label>Méthodes de coaching:</label>
          <div className="checkbox">
            <div>
              <input
                type="checkbox"
                id="face-a-face"
                name="face-a-face"
                checked={selectedMethode.includes("Face à face")}
                onChange={(e) => handleMethodeChange("Face à face", e.target.checked)}
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
                checked={selectedMethode.includes("En ligne")}
                onChange={(e) => handleMethodeChange("En ligne", e.target.checked)}
              />
            </div>
            <label htmlFor="en-ligne">En ligne</label>
          </div>

          <label>Langues:</label>
          <div className="checkbox">
            <input
              type="checkbox"
              id="arabe"
              name="arabe"
              checked={selectedLangue.includes("Arabe")}
              onChange={(e) => handleLangueChange("Arabe", e.target.checked)}
            />
            <label htmlFor="arabe">Arabe</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="français"
              name="français"
              checked={selectedLangue.includes("Français")}
              onChange={(e) => handleLangueChange("Français", e.target.checked)}
            />
            <label htmlFor="français">Français</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="anglais"
              name="anglais"
              checked={selectedLangue.includes("Anglais")}
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
              checked={selectedTypesClient.includes("Personne")}
              onChange={(e) => handleTypeClientChange("Personne", e.target.checked)}
            />
            <label htmlFor="personne">Personne</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="organisation"
              name="organisation"
              checked={selectedTypesClient.includes("Organisation")}
              onChange={(e) => handleTypeClientChange("Organisation", e.target.checked)}
            />
            <label htmlFor="organisation">Organisation</label>
          </div>

          <label>Tarif préférentiel (réduction de 10% pour les clients de la plateforme):</label>
          <div>
            <div className="checkbox">
              <input
                type="radio"
                id="organisation-oui"
                name="tarif"
                checked={tarifPreferentiel === true}
                onChange={() => handleTarifChange(true)}
              />
              <label htmlFor="organisation-oui">Oui</label>
            </div>
            <div className="checkbox">
              <input
                type="radio"
                id="organisation-non"
                name="tarif"
                checked={tarifPreferentiel === false}
                onChange={() => handleTarifChange(false)}
              />
              <label htmlFor="organisation-non">Non</label>
            </div>
          </div>

          <label>Site</label>
          <textarea defaultValue={formData.site} ref={Site} style={{ width: '100%' }}></textarea>

          <label>Facebook</label>
          <textarea defaultValue={formData.fb} ref={Facebook} style={{ width: '100%' }}></textarea>

          <label>Linkedin</label>
          <textarea defaultValue={formData.In} ref={Linkedin} style={{ width: '100%' }}></textarea>

          <label>YouTube</label>
          <textarea defaultValue={formData.yt} ref={Youtube} style={{ width: '100%' }}></textarea>

          <label>Brève Bio</label>
          <textarea defaultValue={formData.bio} ref={Bio} style={{ width: '100%' }}></textarea>

          <label>Image</label>
          <img
            src={`http://localhost:8000/${formData.image}`}
            style={{ width: "150px", height: "150px" }}
            alt="Coach"
          />

<div style={{ display: 'block',margin:'10px auto' }}>
            <button type="submit" style={{marginRight:'10px',color:'white',backgroundColor:'blue', border:'none'}}>Modifier</button>
            <button type="button" style={{color:'blue',backgroundColor:'white', border:'solid 1px blue'}} onClick={() => navigate("/admin/Coachs/visible")}>Annuler</button>
          </div>
        </form>
       
      </div>
    </div>
  );
}

export default EditCoach;
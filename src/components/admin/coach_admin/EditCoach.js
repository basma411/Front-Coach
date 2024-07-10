import React, { useEffect, useRef, useState } from 'react';
import './css/coachedit.css';
import { UpdateCoachVisibleAdmin, getCoachVisivble } from '../../../Redux/Slice/CoachSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getdomaine } from '../../../Redux/Slice/DomainSlice';
import { getImageUrl } from '../../..';

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
        <form onSubmit={handleSubmit} >
          <label className='LabelCoachEdit'>Nom Et Prénom</label>
          <textarea defaultValue={formData.nom} ref={Nom} className='textCochEdit'></textarea>

          <label  className='LabelCoachEdit'>email</label>
          <textarea defaultValue={formData.email} ref={Email} className='textCochEdit'></textarea>

          <label  className='LabelCoachEdit'>Numéro</label>
          <textarea defaultValue={formData.num} ref={Num} className='textCochEdit'></textarea>

          <label>Domaines d’intervention:</label>
          {Array.isArray(domaines) && domaines.map((domaine, index) => (
            <div key={index} className=" checkbox">
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

         <div style={{ display: 'flex',flexDirection:'column' }}>
         <label className='LabelCoachEdit'>Gouvernorats:</label>
          <select
            id="gouvernorat"
            value={gouvernorat}
            onChange={handleGouvernoratChange}
            className="GouverEdit"
          >
            {[
              "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Béja", "Jendouba", "Kef", "Siliana", "Kairouan", "Kasserine", "Sidi Bouzid", "Sousse", "Monastir", "Mahdia", "Sfax", "Kébili", "Gabès", "Medenine", "Tataouine", "Tozeur", "Gafsa"
            ].map((gouvernorat, index) => (
              <option key={index} value={gouvernorat}>{gouvernorat}</option>
            ))}
          </select>

         </div>
          <label  className='LabelCoachEdit'>Méthodes de coaching:</label>
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

          <label className='LabelCoachEdit'>Langues:</label>
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

          <label className='LabelCoachEdit'>Types de clients:</label>
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

          <label className='LabelCoachEdit'>Tarif préférentiel (réduction de 10% pour les clients de la plateforme):</label>
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

          <label className='LabelCoachEdit'>Site</label>
          <textarea defaultValue={formData.site} ref={Site} className='textCochEdit'></textarea>

          <label className='LabelCoachEdit'>Facebook</label>
          <textarea defaultValue={formData.fb} ref={Facebook}className='textCochEdit'></textarea>

          <label className='LabelCoachEdit'>Linkedin</label>
          <textarea defaultValue={formData.In} ref={Linkedin}className='textCochEdit'></textarea>

          <label className='LabelCoachEdit'>YouTube</label>
          <textarea defaultValue={formData.yt} ref={Youtube}className='textCochEdit'></textarea>

          <label className='LabelCoachEdit' >Brève Bio</label>
          <textarea defaultValue={formData.bio} ref={Bio} className='textCochEdit'style={{height:'100px'}}></textarea>

        <div style={{display:'flex',flexDirection:'column'}}>

        <label className='LabelCoachEdit'>Photo</label>
          <img
   src={getImageUrl(formData.image)}
   style={{ width: "150px", height: "150px" }}
            alt="Coach"
          />
        </div>

<div className='EDITCOACH'>
            <button type="submit" className='ButtonEditCoach'>Modifier</button>
            <button type="button" className='ButtonCoachAnnuler'>Annuler</button>
          </div>
        </form>
       
      </div>
    </div>
  );
}

export default EditCoach;

import React, { useEffect, useRef, useState } from 'react'
import './css/coachedit.css'
import { UpdateCoachVisibleAdmin, getCoach, getCoachVisivble } from '../../../Redux/Slice/CoachSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getdomaine } from '../../../Redux/Slice/DomainSlice';
const EditCoach = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { coachVisible } = useSelector((state) => state.coach);
    const { domaines } = useSelector((state) => state.domaine);

    const [formData, setFormData] = useState({});
    const Nom = useRef(null);
    const Email = useRef(null);
    const Num = useRef(null);
    const Site = useRef(null);
    const Facebook = useRef(null);
    const Youtube = useRef(null);
const Linkedin=useRef(null)
const Bio=useRef(null)

    useEffect(() => {

             dispatch(getCoachVisivble());
             dispatch(getdomaine());

     
    }, [dispatch]);

    useEffect(() => {
        if (coachVisible && id) {
            const coachEdit = coachVisible.find(coach => coach._id === id);
            if (coachEdit) {
                setFormData(coachEdit);
            }
        }
    }, [coachVisible, id]);
    const [selectedDomaines, setSelectedDomaines] = useState(
        formData.domain || [] 
      );
      const [gouvernorat, setGouvernorat] = useState(formData.gouv || "");
      const [selectedMethode, setselectedMethode] = useState(
        formData.method || []
      );
      const [selectedLangue, setselectedLangue] = useState(formData.langue || []);
      const [selectedTypesClient, setSelectedTypesClient] = useState(
        formData.type_client || []
      );
      const [tarifPreferentiel, setTarifPreferentiel] = useState(
        formData.tarif || false)
    const handleDomaineChange = (domaine, checked) => {
        if (checked) {
          setSelectedDomaines((prevSelected) => [...prevSelected, domaine]);
        } else {
          setSelectedDomaines((prevSelected) =>
            prevSelected.filter((selected) => selected !== domaine)
          );
        }
      };
      const handleGouvernoratChange = (e) => {
        setGouvernorat(e.target.value);
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
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = { nom: Nom.current.value,
          email: Email.current.value ,
          num: Num.current.value ,
          num: Num.current.value ,
          site: Site.current.value ,
          fb: Facebook.current.value ,
          yt: Youtube.current.value ,
In:Linkedin.current.value,
bio:Bio.current.value,
domain:selectedDomaines.join(',')


         };

        dispatch(UpdateCoachVisibleAdmin({ id, data }));
        alert("Nom modifié");
        navigate("/admin/Coachs/visible");
    };
  return (
<>
<div className='CoachEdit'>
<div className='CoachEditContainer'>
  <form onSubmit={handleSubmit}>
<label>Nom Et Prénom</label>
<textarea defaultValue={formData.nom} ref={Nom}></textarea>
<label>email</label>
<textarea defaultValue={formData.email} ref={Email}></textarea>

<label>Numéro</label>
<textarea defaultValue={formData.num} ref={Num}></textarea>

<label>Domaines d’intervention:
</label>
{Array.isArray(domaines) &&
              domaines.map((domaine, index) => (
                <div key={index} className="domaine checkbox">
                  <div>
                    <input
                      type="checkbox"
                      id={`domaine-${index}`}
                      name={`domaine-${index}`}
                      defaultChecked={
                        formData.domain &&
                        formData.domain.includes(
                          domaine.domaines
                        )
                      }
                      onChange={(e) =>
                        handleDomaineChange(
                          domaine.domaines,
                          e.target.checked
                        )
                      }
                    />
                  </div>
                  <label htmlFor={`domaine-${index}`}>
                    {domaine.domaines}
                  </label>
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
<label>Méthodes de coaching:
</label>
<div className="checkbox">
            <div>
              <input
                type="checkbox"
                id="face-a-face"
                name="face-a-face"
                defaultChecked={
                    coachVisible.method &&
                    coachVisible.method.includes("Face à face")
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
                    coachVisible.method &&
                    coachVisible.method.includes("En ligne")
                }
                onChange={(e) =>
                  handleMethodeChange("En ligne", e.target.checked)
                }
              />
            </div>
            <label htmlFor="en-ligne">En ligne</label>
          </div>
<label>Langues
</label>
<div className="checkbox">
            <input
              type="checkbox"
              id="arabe"
              name="arabe"
              defaultChecked={
                coachVisible.langue && coachVisible.langue.includes("Arabe")
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
                coachVisible.langue && coachVisible.langue.includes("Français")
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
                coachVisible.langue && coachVisible.langue.includes("Anglais")
              }
              onChange={(e) => handleLangueChange("Anglais", e.target.checked)}
            />
            <label htmlFor="anglais">Anglais</label>
          </div>

<label>Types de clients:
</label>
<div className="checkbox">
            <input
              type="checkbox"
              id="personne"
              name="personne"
              defaultChecked={coachVisible.type_client && coachVisible.type_client.includes("Personne")}
              onChange={(e) => handleTypeClientChange("Personne", e.target.checked)}
            />
            <label htmlFor="personne">Personne</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              id="organisation"
              name="organisation"
              defaultChecked={coachVisible.type_client && coachVisible.type_client.includes("Organisation")}
              onChange={(e) => handleTypeClientChange("Organisation", e.target.checked)}
            />
            <label htmlFor="organisation">Organisation</label>
          </div>
<label>Tarif préférentiel (réduction de 10% pour les clients de la platforme):

</label>
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
<label>Site</label>
<textarea defaultValue={formData.site} ref={Site}></textarea>

<label>Facebook</label>
<textarea defaultValue={formData.fb} ref={Facebook}></textarea>

<label>Linkedin</label>
<textarea defaultValue={formData.In} ref={Linkedin}></textarea>

<label>You Tube</label>
<textarea defaultValue={formData.yt} ref={Youtube}></textarea>


<label>Bréve Bio</label>
<textarea defaultValue={formData.bio} ref={Bio}></textarea>


<label>Image</label>
<img
              src={`http://localhost:8000/${formData.image}`}
              style={{ width: "150px", height: "150px" }}
              name="imagee"
            />
    <div style={{display:'block'}}>
    <button>modifier</button>
            <button type='submit'>annuler</button>
    </div>
    </form>

</div>
</div>
</>
  )
}

export default EditCoach
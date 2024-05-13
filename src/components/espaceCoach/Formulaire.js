import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-dropdown-select";
import { getdomaine } from "../../Redux/Slice/DomainSlice";
import { useForm } from "react-hook-form";
import { getCoachVisivble } from "../../Redux/Slice/CoachSlice";
import "./css/formulaire.css"
import image from "../../images/big_image_2.jpg"
const Formulaire = () => {
  const dispatch = useDispatch();
  const { coachVisible } = useSelector((state) => state.coach);

  const { domaines } = useSelector((state) => state.domaine);
  const [selectedDomaines, setSelectedDomaines] = useState([]);
  const [compte, setCompte] = useState(0);

  useEffect(() => {
    dispatch(getCoachVisivble());
    dispatch(getdomaine());
  }, [dispatch]);

  useEffect(() => {
    setCompte(selectedDomaines.length);
  }, [selectedDomaines]);
  const latestCoach = coachVisible.slice(-3);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const customContentRenderer = () => {
    return (
      <label>
             <p style={{color:'#fff',background:"blue",fontSize:'25px',padding:'2px',marginLeft:'600px'}}> {compte}</p>

      </label>
    );
  };
  const isALLselected =
  domaines.length > 0 &&
  selectedDomaines.length === domaines.length;
  console.log(isALLselected)
  const handleDomaineChange = (selectedValues) => {
    if (selectedValues.includes("allDomaine")) {
      setSelectedDomaines(isALLselected ? [] : domaines.map(domaine => ({ value: domaine._id, label: domaine.NomDomaine })));
    } else {
      setSelectedDomaines(selectedValues);
    }
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
            <form onSubmit={handleSubmit(onSubmit)}  >
              <label>Nom et prénom:</label>
              <input type="text" placeholder="" {...register} />
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
  // styles={{
  //   // Style pour le conteneur des options
  //   option: (provided, state) => ({
  //     ...provided,
  //     color: "black",
  //     width: "100%",
  //     fontSize:"16px" 
  //   }),
  // }}
/>

              <label>Autres domaines:</label>
              <input
                type="text"
                placeholder=""
                {...register("Autres domaines:", {})}
              />
              <label>Gouvernorats</label>
              <select
            id="gouvernorat"
        
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
              <label>Numéro de téléphone:</label>
              <input
                type="text"
                placeholder=""
                {...register("Numéro de téléphone:", {})}
              />
              <label>Adresse mail:</label>
              <input type="text" placeholder="" />
              <label>Mot de passe:</label>
              <input type="password" placeholder="" />
              <label>Confirmer Mot de passe:</label>
              <input type="password" placeholder="" />
              <label>Brève Bio (maximum 5 lignes):</label>
              <input type="text" placeholder=""  style={{height:'300px'}} />
              <label>Méthodes de coaching:</label>
              <input type="checkbox" placeholder="" value="Face à face"
/>
              <input type="checkbox" placeholder="" value="En ligne
" />
              <label>Langues</label>
              <input type="checkbox" placeholder="" />
              <input type="checkbox" placeholder="" />
              <input type="checkbox" placeholder="" />
              <label>Types de clients:</label>
              <input type="checkbox" placeholder="" />
              <input type="checkbox" placeholder="" />
              <label>
                Tarif préférentiel (réduction de 10% pour les clients de la
                plateforme):
              </label>
              <input type="radio" value="oui " name="" />
              <input type="radio" value="oui " />
              <label>Photo</label>
              <input type="file" placeholder="" />
              <label>Lien du site:</label>
              <input type="text" placeholder="" />
              <label>Logo</label>
              <input type="file" placeholder=" " />
              <label>Réseaux sociaux :</label>
              <input type="text" placeholder="" />
              <input type="text" placeholder="" />
              <input type="text" placeholder="" />
              <label>
                Un fichier PDF contenant toute pièce justifiant l’expérience en
                coaching et toutes autres compétences (diplômes, certificats,
                formations):
              </label>
              <input type="file" placeholder=" " />
              <input type="submit" />
            </form>
          </div>

    </div> 
    </div> 
  

     </>
   
  );
};

export default Formulaire;

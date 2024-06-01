import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./css/viewcoach.css";
import { getCoachVisivble } from "../../../Redux/Slice/CoachSlice";

const ViewCoachVisible = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const { coachVisible } = useSelector((state) => state.coach);

  useEffect(() => {
    dispatch(getCoachVisivble());
  }, [dispatch]);

  useEffect(() => {
    if (coachVisible && id) {
      const CoachView = coachVisible.find((coach) => coach._id === id);
      if (CoachView) {
        setFormData(CoachView);
      }
    }
  }, [coachVisible, id]);

  return (
    <div className="ViewCoach">
         <h1           style={{ width:'30%',color: "gray",display:'block', margin:'0 auto' }}
>Voir Enregistrement
</h1>
      <div className="viewCoachContainer">
        <div
          style={{
            borderBottom: "solid 1px rgb(194, 192, 192)",
            width: "100%",
            padding: "5px",
          }}
        >
          <label>Nom et Prénom</label>
          <p className="styletexte">{formData.nom}</p>
        </div>

        <div
          style={{
            width: "100%",
            padding: "5px",
            borderBottom: "solid 1px rgb(194, 192, 192)",
          }}
        >
          <label>Numéro Téléphone</label>
          <p className="styletexteCoach">{formData.num}</p>
        </div>

        <div
          style={{
            width: "100%",
            padding: "5px",
            borderBottom: "solid 1px rgb(194, 192, 192)",
          }}
        >
          <label>Domaines D'intervention</label>
          <div className="styletexteCoach">
            {formData.domain?.map((domain, index) => (
              <p key={index} className="styletexteCoach">
                * {domain}{" "}
              </p>
            ))}
            {formData.AutreDomaine && (
              <p className="styletexteCoach">* {formData.AutreDomaine}</p>
            )}
          </div>
        </div>
        <div
          style={{
            width: "100%",
            padding: "5px",
            borderBottom: "solid 1px rgb(194, 192, 192)",
          }}
        >
          <label>Adresse Email</label>
          <p className="styletexte">{formData.email}</p>
        </div>
        <div style={{ width: "100%", padding: "5px" ,
        borderBottom: "solid 1px rgb(194, 192, 192)"
}}>
          <label> Bréve Bio</label>
          <p className="styletexteCoach"  >{formData.bio}</p>
        </div>

        <label>Méthode de Coaching
</label>
          <div className="styletexteCoach"  style={{
            width: "100%",
            padding: "5px",
            borderBottom: "solid 1px rgb(194, 192, 192)",
          }}>
            {formData.method?.map((methode, index) => (
              <p key={index} className="styletexteCoach">
                * {methode}{" "}
              </p>
            ))}
        
          </div>
        

          <label>Langue
</label>
          <div className="styletexteCoach"  style={{
            width: "100%",
            padding: "5px",
            borderBottom: "solid 1px rgb(194, 192, 192)",
          }}>
            {formData.langue?.map((Langue, index) => (
              <p key={index} className="styletexteCoach">
                * {Langue}{" "}
              </p>
            ))}
        
          </div>


          <label>Type_Client

</label>
          <div className="styletexteCoach"  style={{
            width: "100%",
            padding: "5px",
            borderBottom: "solid 1px rgb(194, 192, 192)",
          }}>
            {formData.type_client?.map((TC, index) => (
              <p key={index} className="styletexteCoach">
                * {TC}{" "}
              </p>
            ))}
        
          </div>


          <div
          style={{
            borderBottom: "solid 1px rgb(194, 192, 192)",
            width: "100%",
            padding: "5px",
          }}
        >
          <label>Photo</label>
<img           src={`http://localhost:8000/${formData.image}`} style={{display:'block', margin:'auto',width:'100px'}}
/>
      </div>

  <div
          style={{
            borderBottom: "solid 1px rgb(194, 192, 192)",
            width: "100%",
            padding: "5px",
          }}
        >
          <label>Site</label>
          <p className="styletexte">{formData.site}</p>
        </div>



        <div
          style={{
            borderBottom: "solid 1px rgb(194, 192, 192)",
            width: "100%",
            padding: "5px",
          }}
        >
          <label>Facebook</label>
          <p className="styletexte">{formData.fb}</p>
        </div>

        <div
          style={{
            borderBottom: "solid 1px rgb(194, 192, 192)",
            width: "100%",
            padding: "5px",
          }}
        >
          <label>Linkedin</label>
          <p className="styletexte">{formData.In}</p>
        </div>

        <div
          style={{
            borderBottom: "solid 1px rgb(194, 192, 192)",
            width: "100%",
            padding: "5px",
          }}
        >
          <label>You Tube
</label>
          <p className="styletexte">{formData.yt}</p>
        </div>
        <div
          style={{
            borderBottom: "solid 1px rgb(194, 192, 192)",
            width: "100%",
            padding: "5px",
          }}
        >
          <label>Piéce Jointe
</label>
          <p className="styletexte">{formData.piece}</p>
        </div>


        <div
          style={{
            borderBottom: "solid 1px rgb(194, 192, 192)",
            width: "100%",
            padding: "5px",
          }}
        >
          <label>Gouvernerats
</label>
          <p className="styletexte">{formData.gouv}</p>
        </div>
        <div
          style={{
            width: "100%",
            padding: "5px",
          }}
        >
          <label>Tarif
</label>
          <p className="styletexte">{formData.tarif?"oui":"non"}</p>
        </div>
     
      </div>
      <button
          style={{ backgroundColor: "blue", color: "white",display:'block', margin:' 10px auto' }}
          onClick={() => navigate("/admin/Coachs/visible")}
        >
          Retour
        </button>
    </div>
  );
};

export default ViewCoachVisible;

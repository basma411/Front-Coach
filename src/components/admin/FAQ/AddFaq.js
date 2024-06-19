import React, { useState } from "react";
import "./css/addfaq.css";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import { addFaq } from "../../../Redux/Slice/FaqSlice";
import { useNavigate } from "react-router-dom";

const AddFaq = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [rreponse, setResponse] = useState("");

  const handleClick = () => {
    if (window.confirm("Voulez-vous vraiment ajouter cette FAQ ?")) {
      dispatch(addFaq({ question, rreponse }));
      navigate("/admin/list-faq");
    }
  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
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
          <IoPowerOutline style={{ fontSize: "35px", fontWeight: "400" }} />
          <h2 style={{ fontSize: "30px" }}>
            Bienvenue sur votre espace administration
          </h2>
        </div>
      </div>

      <div className="ConsultAddFaq">
        <div className="ConsultAddFaqContainer">
          <h3 style={{ textAlign: 'center', fontSize: '35px', color: 'black' }}>FAQ</h3>
          <input
            type="text"
            className="QUESTION"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <textarea
            className="RES"
            placeholder="Response"
            value={rreponse}
            onChange={(e) => setResponse(e.target.value)}
          />
          <button onClick={handleClick}>Envoyer</button>
        </div>
      </div>
    </>
  );
};

export default AddFaq;

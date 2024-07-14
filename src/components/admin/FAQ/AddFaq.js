import React, { useState } from "react";
import "./css/addfaq.css";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import { addFaq } from "../../../Redux/Slice/FaqSlice";
import { useNavigate } from "react-router-dom";
import OverlayA from "../OverlayA";

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
     <OverlayA/>

      <div className="ConsultAddFaq">
        <div className="ConsultAddFaqContainer">
          <h3 className="TitreFAQ">FAQ</h3>
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

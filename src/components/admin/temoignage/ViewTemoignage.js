import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetArticle, GetArticleInvi } from "../../../Redux/Slice/ArticleSlice";
import { useNavigate, useParams } from "react-router-dom";
import "./css/viewTemoignege.css";
const ViewTemoignage = () => {
  const navigator = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nom: "",
    texte: "",
    Date: "",
  });
  const { TemoignegeIv } = useSelector((state) => state.temoignage);
  useEffect(() => {
    dispatch(GetArticleInvi());
  }, [dispatch]);
  useEffect(() => {
    if (TemoignegeIv && id) {
      const TemoignegeIvEdit = TemoignegeIv.find((T_In) => T_In._id === id);
      if (TemoignegeIvEdit) {
        setFormData(TemoignegeIvEdit);
      }
    }
  }, [TemoignegeIv, id]);
  const truncateText = (htmlText, maxLength) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const textContent = doc.body.textContent || "";
    return textContent.length > maxLength ? textContent.substring(0, maxLength) + '...' : textContent;
  };
  return (
    <div className="ViewTem">
      <div className="viewContainerTem">
        <div
          style={{
            borderBottom: "solid 1px rgb(194, 192, 192)",
            width: "100%",
            padding: "5px",
          }}
        >
          <label className="labelViewTem">Nom:</label>
          <p className="styletexteTem">{formData.nom}</p>
        </div>

        <div
          style={{
            borderBottom: "solid 1px rgb(194, 192, 192)",
            width: "100%",
            padding: "5px",
          }}
        >
          <label className="labelViewTem">Texte:</label>
          <p className="styletexteTem">

          {truncateText(formData.texte)}

          </p>
        </div>

        <div style={{ width: "100%", padding: "5px" }}>
          <label  className="labelViewTem">Date:</label>
          <p className="styletexteTem">{formData.Date}</p>
        </div>
      </div>
      <button
        onClick={() => navigator("/admin/témoignages/invisible")}
        className="Retour_Tem"
      >
        Annuler
      </button>
    </div>
  );
};

export default ViewTemoignage;

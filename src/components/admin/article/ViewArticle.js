import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetArticle, GetArticleInvi } from "../../../Redux/Slice/ArticleSlice";
import { useNavigate, useParams } from "react-router-dom";
import "./css/viewArticle.css";
const ViewArticle = () => {
  const navigator = useNavigate();

  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    titre: "",
    texte: "",
    lien: "",
    auteur: "",
    photo: "",
  });
  const { ArticlesInv } = useSelector((state) => state.article);
  console.log(ArticlesInv);
  useEffect(() => {
    dispatch(GetArticleInvi());
  }, [dispatch]);
  useEffect(() => {
    if (ArticlesInv && id) {
      const ArticlesEdit = ArticlesInv.find((article) => article._id === id);
      if (ArticlesEdit) {
        setFormData(ArticlesEdit);
      }
    }
  }, [ArticlesInv, id]);
  const truncateText = (htmlText, maxLength) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    const textContent = doc.body.textContent || "";
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + "..."
      : textContent;
  };
  return (
    <div className="View">
      <div className="viewContainer">
        <div
          style={{
            borderBottom: "solid 1px rgb(194, 192, 192)",
            width: "100%",
            padding: "5px",
          }}
        >
          <label className="labelViewArt">Nom</label>
          <p className="styletexteART">{formData.titre}</p>
        </div>

        <div
          style={{
            borderBottom: "solid 1px rgb(194, 192, 192)",
            width: "100%",
            padding: "5px",
          }}
        >
          <label className="labelViewArt">Texte</label>
          <p className="styletexteART"> {truncateText(formData.texte, 49)}</p>
        </div>

        <div style={{ width: "100%", padding: "5px" }}>
          <label className="labelViewArt">Auteur</label>
          <p className="styletexteART">{formData.auteur}</p>
        </div>
      </div>
      <button
        className="AnnuleView"
        onClick={() => navigator("/admin/article/invisible")}
      >
        Retour
      </button>
    </div>
  );
};

export default ViewArticle;

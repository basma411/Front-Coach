import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/ArticleVisible.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

import { GetArticle, delArticle } from "../../../Redux/Slice/ArticleSlice";
import { getImageUrl } from "../../..";
import OverlayA from "../OverlayA";

const ArticleVisible = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Articles } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(GetArticle());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      dispatch(delArticle({ id }));
    }
  };
  const handelAccueil = () => {
    navigate("/admin/Accueil");
  };
  const truncateText = (htmlText, maxLength) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const textContent = doc.body.textContent || "";
    return textContent.length > maxLength ? textContent.substring(0, maxLength) + '...' : textContent;
  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <OverlayA />
      <div className="ConsultArtVisib">
        <div className="ConsultArtVisibContainer">
        <button className="buttonAccueilArct" onClick={handelAccueil}>
            Accueil
          </button>
          <table className="TableArtvisib">
            <thead>
              <tr>
                <th className="TableHeader">titre</th>
                <th className="TableHeader">image</th>
                <th className="TableHeader">texte</th>
                <th className="TableHeader">action</th>
              </tr>
            </thead>
            <tbody>
              {Articles.map((artV, index) => (
                <tr key={index}>
                  <td className="TableData">{artV.titre}</td>
                  <td className="TableData">
                    <img src={getImageUrl(artV.photo)} alt="Article" className="TableDataimg" />
                  </td>
                  <td className="TableData">{truncateText(artV.texte, 49)}</td>
                  <td className="TableData act ">
                    <RiDeleteBin6Line className="IconData" onClick={() => handleDelete(artV._id)} />
                    <Link to={`/admin/article/visible/edit/${artV._id}`}>
                      <CiEdit className="IconData" />
                    </Link>
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ArticleVisible;

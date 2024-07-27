import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/ArticleInvisible.css";
import image from "../../../images/big_image_2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { IoPowerOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import {
  GetArticleInvi,
  PutArticleInv,
  delArticleInv,
} from "../../../Redux/Slice/ArticleSlice";
import { GrView } from "react-icons/gr";
import { getImageUrl } from "../../..";
import OverlayA from "../OverlayA";

const ArticleInvisible = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ArticlesInv } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(GetArticleInvi());
  }, [dispatch]);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      dispatch(delArticleInv({ id }));
    }
  };
  const handleValid = (id) => {
    if (window.confirm("Are you sure you want to accept this article?")) {
      dispatch(PutArticleInv({ id, data: { Visible: true } }));
    }
  };
  const handelAccueil = () => {
    navigate("/admin/Accueil");
  };
  const truncateText = (htmlText, maxLength) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    const textContent = doc.body.textContent || "";
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + "..."
      : textContent;
  };
  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <OverlayA />
      <div className="ConsultArtInvisib">
        <div className="ArtInvContainer">
          <button className="buttonAccueilArct" onClick={handelAccueil}>
            Accueil
          </button>
          <table className="TableArtInvisib">
            <thead>
              <tr>
                <th className="TableHeader">titre</th>
                <th className="TableHeader">image</th>
                <th className="TableHeader">texte</th>
                <th className="TableHeader">action</th>
              </tr>
            </thead>
            <tbody>
              {ArticlesInv.map((artV, index) => (
                <tr key={index}>
                  <td className="TableData">{artV.titre}</td>
                  <td className="TableData">
                    <img
                      src={getImageUrl(artV.photo)}
                      width="100px"
                      alt="Article"
                      className="TableDataimg"
                    />
                  </td>
                  <td className="TableData">
                    {truncateText(artV.texte, 49)}
                  </td>
                  <td className="TableData  ">
                    <Link to={`/admin/article/invisible/view/${artV._id}`}>
                      <GrView className="IconData" />
                    </Link>
                    <FaCheck
                      className="IconData"
                      onClick={() => handleValid(artV._id)}
                    />
                    <RiDeleteBin6Line
                      className="IconData"
                      onClick={() => handleDelete(artV._id)}
                    />
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

export default ArticleInvisible;

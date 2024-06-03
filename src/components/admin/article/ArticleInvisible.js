import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/ArticleInvisible.css";
import image from "../../../images/big_image_2.jpg";
import { Link } from "react-router-dom";
import { IoPowerOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  GetArticleInvi,
  PutArticleInv,
  delArticleInv,
} from "../../../Redux/Slice/ArticleSlice";
import { GrView } from "react-icons/gr";
import { getImageUrl } from "../../..";

const ArticleInvisible = () => {
  const dispatch = useDispatch();
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
        dispatch(PutArticleInv({ id,data: { Visible: true }})  ) 
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
          <IoPowerOutline style={{ fontSize: "35px", fontWeight: "700" }} />
          <h2 style={{ fontSize: "30px" }}>
            Bienvenue sur votre espace administration
          </h2>
        </div>
      </div>

      <div className="ConsultArtInvisib">
        <div className="ConsultArtInvisibContainer">
          <Link to="/admin/Accueil">
            <button className="AccueilArtInvisib">Accueil</button>
          </Link>
          <table
            className="TableArtInvisib"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  titre
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  image
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  texte
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {ArticlesInv.map((artV, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {artV.titre}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <img
   src={getImageUrl(artV.photo)}
                         width="100px"
                      alt="Article"
                    />
                  </td>

                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {artV.texte.substring(0, 49)}...
                  </td>

                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <Link to={`/admin/article/invisible/view/${artV._id}`}>
                      <GrView style={{ fontSize: "25px", color: "black" }} />
                    </Link>
                    <FaCheck
                      style={{
                        fontSize: "25px",
                        color: "black",
                        marginRight: "20px",
                      }}
                      onClick={() => handleValid(artV._id)}
                    />

                
                    <RiDeleteBin6Line
                      style={{
                        fontSize: "25px",
                        color: "black",
                        marginRight: "20px",
                      }}
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

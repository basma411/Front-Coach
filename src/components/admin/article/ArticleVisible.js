import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/ArticleVisible.css";
import image from "../../../images/big_image_2.jpg";
import { Link } from "react-router-dom";
import { IoPowerOutline } from "react-icons/io5";
import { GetPartenaire } from "../../../Redux/Slice/PartenaireSlice";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GetArticle, delArticle } from "../../../Redux/Slice/ArticleSlice";
import { CiEdit } from "react-icons/ci";

const ArticleVisible = () => {
  const dispatch = useDispatch();
  const { Articles } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(GetArticle());
  }, [dispatch]);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      dispatch(delArticle({ id }));
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

      <div className="ConsultArtVisib">
        <div className="ConsultArtVisibContainer">
          <Link to="/admin/Accueil">
            <button className="AccueilArtVisib">Accueil</button>
          </Link>
          <table
            className="TableArtVisib"
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
              {Articles.map((artV, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {artV.titre}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <img
                      src={`http://localhost:8000/${artV.photo}`}
                      width="100px"
                      alt="Article"
                    />
                  </td>

                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                  {artV.texte.replace(/<p>(.*?)&nbsp;<\/p>$/, '$1').replace(/<p>(.*?)<\/p>/, '$1').substring(0, 49)}...
                  </td>

                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <RiDeleteBin6Line
                      style={{
                        fontSize: "25px",
                        color: "black",
                        marginRight: "20px",
                      }}
                      onClick={() => handleDelete(artV._id)}
                    />
                    <Link to={`/admin/article/visible/edit/${artV._id}`}>
                      <CiEdit style={{ fontSize: "25px", color: "black" }} />
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

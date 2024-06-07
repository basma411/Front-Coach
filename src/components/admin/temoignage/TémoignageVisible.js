import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/coachvisible.css";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { GetIcon } from "../../../Redux/Slice/IconSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GetTemoignageV, delTemoignageV } from "../../../Redux/Slice/TemoignegeSlice";
const TémoignageVisible = () => {
  const dispatch = useDispatch();

  const { TemoignegeV } = useSelector((state) => state.temoignage);
  useEffect(() => {
    dispatch(GetTemoignageV());
  }, [dispatch]);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Temoignage?")) {
      dispatch(delTemoignageV({ id }));
    }
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
    <div className="ConsultIcon">
      <div className="ConsultIconContainer">
        <Link to='/admin/Accueil'>
        <button className="AccueilIcon">Accueil</button>
        </Link>
        <table
          className="TableIcon"
          style={{
            borderCollapse: "collapse",
            width: "100%",
            textAlign: "center",
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid gray", padding: "8px" }}>
              nom
              </th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>
              textes
              </th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>
              date
              </th>
              <th style={{ border: "1px solid gray", padding: "8px" }}>
              action
              </th>
            </tr>
          </thead>
          <tbody>
            {TemoignegeV && TemoignegeV.map((T_V, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid gray", padding: "10px" }}>
                  {T_V.nom}
                </td>
                <td style={{ border: "1px solid gray", padding: "10px" }}>
                  {truncateText(T_V.texte, 49)}
                </td>
                <td style={{ border: "1px solid gray", padding: "10px" }}>
{T_V.Date}                </td>

                <td style={{ border: "1px solid gray", padding: "10px" }}>
                <Link to={`/admin/témoignages/invisible/edit/${T_V._id}`}>
                      <CiEdit style={{ fontSize: "25px", color: "black" }} />
                    </Link>
              
                  <RiDeleteBin6Line
                      style={{
                        fontSize: "25px",
                        color: "black",
                        marginRight: "20px",
                      }}
                      onClick={() => handleDelete(T_V._id)}
                    />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
)
}

export default TémoignageVisible
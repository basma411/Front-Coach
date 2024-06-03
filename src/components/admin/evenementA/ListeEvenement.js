import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/ListeEvenement.css";
import image from "../../../images/big_image_2.jpg";
import { Link } from "react-router-dom";
import { IoPowerOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { GetEvenement, deleteEvenement } from "../../../Redux/Slice/EvenementSlice";
import { getImageUrl } from '../../../index.js';
import Test from "./Test.js";
const ListeEvenement = () => {
  const dispatch = useDispatch();
  const { Evenement } = useSelector((state) => state.evenement);

  useEffect(() => {
    dispatch(GetEvenement());
  }, [dispatch]);
console.log(Evenement)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      dispatch(deleteEvenement({ id }));
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
          <IoPowerOutline style={{ fontSize: "35px", fontWeight: "700" }} />
          <h2 style={{ fontSize: "30px" }}>
            Bienvenue sur votre espace administration
          </h2>
        </div>
      </div>

      <div className="ConsultEvenement">
        <div className="ConsultEvenementContainer">
          <Link to="/admin/Accueil">
            <button className="AccueilEvenement">Accueil</button>
          </Link>
          <table
            className="TableEvenement"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Image
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Titre
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Description
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Date
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Modifier
                </th>
              </tr>
            </thead>
            <tbody>
              {Evenement.map((evt, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                  <img
            src={getImageUrl(evt.photo)}
            width="100px"
            height="70px"
            alt="Event"
        />
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {evt.titre}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {truncateText(evt.texte, 49)}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {evt.dates}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <RiDeleteBin6Line
                      style={{
                        fontSize: "25px",
                        color: "black",
                        marginRight: "20px",
                      }}
                      onClick={() => handleDelete(evt._id)}
                    />
                    <Link to={`/admin/Evenements/liste/edit/${evt._id}`}>
                      <CiEdit style={{ fontSize: "25px", color: "black" }} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <Test/> */}
    </>
  );
};

export default ListeEvenement;

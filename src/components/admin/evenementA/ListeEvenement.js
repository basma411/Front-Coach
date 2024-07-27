import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/ListeEvenement.css";
import image from "../../../images/big_image_2.jpg";
import { Link, useNavigate } from "react-router-dom";
import { IoPowerOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { GetEvenement, deleteEvenement } from "../../../Redux/Slice/EvenementSlice";
import { getImageUrl } from '../../../index.js';
import OverlayA from "../OverlayA.js";
const ListeEvenement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
   <OverlayA/>

      <div className="ConsultEvenement">
        <div className="ConsultEvenementContainer">
        <button className="buttonAccueilEvnt" onClick={handelAccueil}>
            Accueil
          </button>
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
                <th className="TableHeaderEvnt">
                  Image
                </th>
                <th className="TableHeaderEvnt">
                  Titre
                </th>
                <th className="TableHeaderEvnt">
                  Description
                </th>
                <th className="TableHeaderEvnt">
                  Date
                </th>
                <th className="TableHeaderEvnt">
                  Modifier
                </th>
              </tr>
            </thead>
            <tbody>
              {Evenement.map((evt, index) => (
                <tr key={index}>
                  <td className="DataEvnt">
                  <img
            src={getImageUrl(evt.photo)}
      className="ListEvntAdm"
            alt="Event"
        />
                  </td>
                  <td className="DataEvnt">
                    {evt.titre}
                  </td>
                  <td className="DataEvnt">
                    {truncateText(evt.texte, 49)}
                  </td>
                  <td className="DataEvnt">
                    {evt.dates}
                  </td>
                  <td className="DataEvnt   actionEvnt">
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

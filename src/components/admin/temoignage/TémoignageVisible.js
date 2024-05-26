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
import { getCoachVisivble } from "../../../Redux/Slice/CoachSlice";
const TémoignageVisible = () => {
    const dispatch = useDispatch();

    const { coachVisible } = useSelector((state) => state.coach);
    useEffect(() => {
      dispatch(getCoachVisivble());
    }, [dispatch]);
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
          {/* <tbody>
            {Icon.map((icon, index) => (
              <tr key={index}>
                <td style={{ border: "1px solid gray", padding: "10px" }}>
                  {icon.Titre}
                </td>
                <td style={{ border: "1px solid gray", padding: "10px" }}>
                  {icon.Texte.substring(0, 50)}
                </td>
                <td style={{ border: "1px solid gray", padding: "10px" }}>
                  <img src={`http://localhost:8000/${icon.image}`} />
                </td>

                <td style={{ border: "1px solid gray", padding: "10px" }}>
                  <Link to={`/admin/icon/edit/${icon._id}`}>
                  <CiEdit style={{ fontSize: "25px",  color:'black'}} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </div>
  </>
)
}

export default TémoignageVisible
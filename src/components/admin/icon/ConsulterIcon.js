import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/consultAcceil.css";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { GetIcon } from "../../../Redux/Slice/IconSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../..";
import OverlayA from "../OverlayA";

const ConsulterIcon = () => {
  const dispatch = useDispatch();

  const { Icon } = useSelector((state) => state.icon);
  useEffect(() => {
    dispatch(GetIcon());
  }, [dispatch]);
  console.log(Icon);
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
                  Titre
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Texte
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Image
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Modifier
                </th>
              </tr>
            </thead>
            <tbody>
              {Icon.map((icon, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                  {truncateText(icon.Titre, 49)}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                  {truncateText(icon.Texte, 49)}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <img    src={getImageUrl(icon.image)}
 />
                  </td>

                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <Link to={`/admin/icon/edit/${icon._id}`}>
                    <CiEdit style={{ fontSize: "25px",  color:'black'}} />
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

export default ConsulterIcon;

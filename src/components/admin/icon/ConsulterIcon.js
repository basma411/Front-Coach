import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/consultAcceil.css";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { GetIcon } from "../../../Redux/Slice/IconSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../..";
import OverlayA from "../OverlayA";

const ConsulterIcon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Icon } = useSelector((state) => state.icon);
  useEffect(() => {
    dispatch(GetIcon());
  }, [dispatch]);
  console.log(Icon);
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
      <div className="ConsultIcon">
        <div className="ConsultIconContainer">
          <button className="AccueilIcon" onClick={handelAccueil}>Accueil</button>
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
                <th className="HeaderIcon">
                  Titre
                </th>
                <th className="HeaderIcon">
                  Texte
                </th>
                <th className="HeaderIcon">
                  Image
                </th>
                <th className="HeaderIcon">
                  Modifier
                </th>
              </tr>
            </thead>
            <tbody>
              {Icon.map((icon, index) => (
                <tr key={index}>
                  <td className="DataIcon">
                  {truncateText(icon.Titre, 49)}
                  </td>
                  <td className="DataIcon">
                  {truncateText(icon.Texte, 49)}
                  </td>
                  <td className="DataIcon">
                    <img    src={getImageUrl(icon.image)} className="ImageIcon"
 />
                  </td>

                  <td className="DataIcon">
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

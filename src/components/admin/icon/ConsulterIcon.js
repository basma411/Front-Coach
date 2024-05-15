import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/consultAcceil.css";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { GetIcon } from "../../../Redux/Slice/IconSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const ConsulterIcon = () => {
  const dispatch = useDispatch();

  const { Icon } = useSelector((state) => state.icon);
  useEffect(() => {
    dispatch(GetIcon());
  }, [dispatch]);
  console.log(Icon);

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
                      <MdOutlineModeEdit style={{ fontSize: "30px" }} />
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

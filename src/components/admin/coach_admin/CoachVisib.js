import React, { useEffect } from "react";
import image from "../../../images/big_image_2.jpg";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import { useNavigate } from "react-router-dom";
import {
  delCoachVisible,
  getCoachVisivble,
} from "../../../Redux/Slice/CoachSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FiSend } from "react-icons/fi";

import "./css/coachVisib.css";
import { getImageUrl } from "../../..";
const CoachVisib = () => {
  const dispatch = useDispatch();
  const { coachVisible } = useSelector((state) => state.coach);

  useEffect(() => {
    dispatch(getCoachVisivble());
  }, [dispatch]);
  const navigator = useNavigate();
  const handleLogout = () => {
    navigator("/admin/login");
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coach?")) {
      dispatch(delCoachVisible({ id }));
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
        <div>
          <h4
            style={{ fontSize: "20px", cursor: "pointer" }}
            onClick={handleLogout}
          >
            Déconnexion
          </h4>

          <h4 style={{ fontSize: "20px", padding: "0px" }}>Menu principal</h4>
        </div>
      </div>

      <div className="ConsultCochVisib">
        <div className="ConsultCochVisibContainer">
          <table
            className="TableCochVisib"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Nom et prénom
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Domaines d’intervention
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Photo
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {coachVisible.map((coachV, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {coachV.nom}
                  </td>
                  <td
                    style={{
                      border: "1px solid gray",
                      padding: "10px",
                      whiteSpace: "pre-line",
                      textAlign: "start",
                    }}
                  >
                    *{coachV.domain.join("\n * ")}
                    {coachV.AutreDomaine && `\n * ${coachV.AutreDomaine}`}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <img
   src={getImageUrl(coachV.image)}
   width="100px"
                      alt="Article"
                    />
                  </td>

                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <Link to={`/admin/Coachs/visible/view/${coachV._id}`}>
                      <GrView
                        style={{
                          fontSize: "25px",
                          color: "black",
                          marginRight: "20px",
                        }}
                      />
                    </Link>
                    <RiDeleteBin6Line
                      style={{
                        fontSize: "25px",
                        color: "black",
                        marginRight: "20px",
                      }}
                      onClick={() => handleDelete(coachV._id)}
                    />

                    <Link to={`/admin/Coachs/visible/edit/${coachV._id}`}>
                      <CiEdit
                        style={{
                          fontSize: "25px",
                          color: "black",
                          marginRight: "20px",
                        }}
                      />
                    </Link>
                    <Link to={`/admin/Contact/Email/${coachV._id}`}>
                      <FiSend style={{ fontSize: "20px", color: "black" }} />
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

export default CoachVisib;

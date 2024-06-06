import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoPowerOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import NavBarAdmin from "../NavBarAdmin";
import BarheaderAdmin from "../BarheaderAdmin";
import { delDomaine, getdomaine } from "../../../Redux/Slice/DomainSlice";
import image from "../../../images/big_image_2.jpg";
import "./css/consulterdomaine.css";

const ConsulterDomaine = () => {
  const dispatch = useDispatch();
  const { domaines } = useSelector((state) => state.domaine);

  useEffect(() => {
    dispatch(getdomaine());
  }, [dispatch]);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Domaine?")) {
      dispatch(delDomaine({ id }));
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
          <IoPowerOutline style={{ fontSize: "35px", fontWeight: "400" }} />
          <h2 style={{ fontSize: "30px" }}>
            Bienvenue sur votre espace administration
          </h2>
        </div>
      </div>
      <div className="ConsultDomaine">
        <div className="ConsultDomaineContainer">
          <Link to="/admin/Accueil">
            <button className="AccueilDomaine">Accueil</button>
          </Link>
          <Link to="/admin/consulter_domaine/ajouter">
            <button className="AccueilDomaine">Ajouter Domaine</button>
          </Link>
          <table
            className="TableDomaine"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Domaines D'interventions
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(domaines) && domaines.length > 0 ? (
                domaines.map((domaine, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid gray", padding: "10px" }}>
                      {domaine.domaines}
                    </td>
                    <td style={{ border: "1px solid gray", padding: "10px" }}>
                      <Link to={`/admin/domaine/edit/${domaine._id}`}>
                        <CiEdit
                          style={{
                            fontSize: "25px",
                            color: "black",
                            marginRight: "40px",
                          }}
                        />
                      </Link>
                      <RiDeleteBin6Line
                        style={{ fontSize: "20px", color: "black" }}
                        onClick={() => handleDelete(domaine._id)}

                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="2"
                    style={{ border: "1px solid gray", padding: "10px" }}
                  >
                    Aucun domaine trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ConsulterDomaine;

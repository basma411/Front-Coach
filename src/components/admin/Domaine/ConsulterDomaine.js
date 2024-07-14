import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import NavBarAdmin from "../NavBarAdmin";
import BarheaderAdmin from "../BarheaderAdmin";
import { delDomaine, getdomaine } from "../../../Redux/Slice/DomainSlice";
import "./css/consulterdomaine.css";
import OverlayA from "../OverlayA";

const ConsulterDomaine = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { domaines } = useSelector((state) => state.domaine);

  useEffect(() => {
    dispatch(getdomaine());
  }, [dispatch]);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Domaine?")) {
      dispatch(delDomaine({ id }));
    }
  };
  const handelAccueil = () => {
    navigate("/admin/Accueil");
  };
  const handelAjouter = () => {
    navigate("/admin/consulter_domaine/ajouter");
  };
  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <OverlayA/>

      <div className="ConsultDomaine">
        <div className="ConsultDomaineContainer">
            <button className="AccueilDomaine" onClick={handelAccueil}>Accueil</button>
            <button className="AccueilDomaine"onClick={handelAjouter}>Ajouter Domaine</button>
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
                <th className="HeaderDomaine">
                  Domaines D'interventions
                </th>
                <th className="HeaderDomaine">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(domaines) && domaines.length > 0 ? (
                domaines.map((domaine, index) => (
                  <tr key={index}>
                    <td className="DateDomaine">
                      {domaine.domaines}
                    </td>
                    <td className="DateDomaine">
                      <Link to={`/admin/consulter_domaine/edit/${domaine._id}`}>
                        <CiEdit
                          style={{
                            fontSize: "25px",
                            color: "black",
                            marginRight: "40px",
                          }}
                        />
                      </Link>
                      <RiDeleteBin6Line
                        style={{ fontSize: "15px", color: "black" }}
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

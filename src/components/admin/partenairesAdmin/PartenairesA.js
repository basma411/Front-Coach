import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/partenairesA.css";
import { Link } from "react-router-dom";
import { GetPartenaire, deletePartenaire } from "../../../Redux/Slice/PartenaireSlice";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getImageUrl } from "../../../index.js";
import OverlayA from "../OverlayA.js";

const PartenairesA = () => {
  const dispatch = useDispatch();

  const { Partenaire } = useSelector((state) => state.partenaire);
  useEffect(() => {
    dispatch(GetPartenaire());
  }, [dispatch]);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this partenaire?")) {
      dispatch(deletePartenaire({ id }));
    }
  };
  return (
<>

<BarheaderAdmin />
      <NavBarAdmin />
     <OverlayA/>
    
      <div className="ConsultPartenaires">
        <div className="ConsultPartenairesContainer">
          <Link to='/admin/Partenaires/ajouter'>
          <button className="AccueilPartenaires">Ajouter parteniare</button>
          </Link>
          <table
            className="TablePartenaires"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                image
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Nom
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                status
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Supprimer
                </th>
              </tr>
            </thead>
            <tbody>
              {Partenaire && Partenaire.map((partenaire, index) => (
                <tr key={index}>
                    <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <img  src={getImageUrl(partenaire.photo)} width="100px" alt="Partenaire" />
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {partenaire.nom}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {partenaire.statut}
                  </td>
                

                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <RiDeleteBin6Line style={{ fontSize: "25px",  color:'black'}}
                                          onClick={() => handleDelete(partenaire._id)}

                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </>  )
}

export default PartenairesA
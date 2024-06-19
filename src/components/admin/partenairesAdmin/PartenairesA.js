import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/partenairesA.css";
import image from "../../../images/big_image_2.jpg";
import { Link } from "react-router-dom";
import { IoPowerOutline } from 'react-icons/io5';
import { GetPartenaire, deletePartenaire } from "../../../Redux/Slice/PartenaireSlice";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { getImageUrl } from "../../../index.js";

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
      <div className="ImagePlatforme" style={{ position: 'relative', textAlign: 'center', height: '300px', backgroundImage: `url(${image})`, backgroundSize: 'cover', overflow: 'hidden' }}>
        <div style={{ paddingTop: '100px' }}>
          <IoPowerOutline style={{ fontSize: '35px', fontWeight: '700' }} />
          <h2 style={{ fontSize: '30px' }}>Bienvenue sur votre espace administration</h2>
        </div>
      </div>
    
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
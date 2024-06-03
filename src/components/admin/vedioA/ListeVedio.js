import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/listevedio.css";
import image from "../../../images/big_image_2.jpg";
import { Link } from "react-router-dom";
import { IoPowerOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { GetEvenement, deleteEvenement } from "../../../Redux/Slice/EvenementSlice";
import { GetVedio, deleteVedio } from "../../../Redux/Slice/VedioSlice";
import { getImageUrl } from "../../..";

const ListeVedio = () => {
  const dispatch = useDispatch();
  const { Vedio } = useSelector((state) => state.vedio);

  useEffect(() => {
    dispatch(GetVedio());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vedio?")) {
      dispatch(deleteVedio({ id }));
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
          <IoPowerOutline style={{ fontSize: "35px", fontWeight: "700" }} />
          <h2 style={{ fontSize: "30px" }}>
            Bienvenue sur votre espace administration
          </h2>
        </div>
      </div>

      <div className="ConsultEvenement">
        <div className="ConsultEvenementContainer">
          <Link to="/admin/Accueil">
            <button className="AccueilEvenement">Accueil</button>
          </Link>
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
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                Titre
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                Image
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                Lien
                </th>
             
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Vedio.map((vedio, index) => (
                <tr key={index}>
                     <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {vedio.titre}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <img
           src={getImageUrl(vedio.images)}
           width="100px"
                      height="70px"

                      alt="Event"
                    />
                  </td>
                 
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {vedio.lien}
                  </td>
                
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <RiDeleteBin6Line
                      style={{
                        fontSize: "25px",
                        color: "black",
                        marginRight: "20px",
                      }}
                      onClick={() => handleDelete(vedio._id)}
                    />
                    <Link to={`/admin/VedioCoching/edit/${vedio._id}`}>
                      <CiEdit style={{ fontSize: "25px", color: "black" }} />
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


export default ListeVedio
import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/listevideo.css";
import image from "../../../images/big_image_2.jpg";
import { Link } from "react-router-dom";
import { IoPowerOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { getImageUrl } from "../../..";
import { Getvideo, deletevideo } from "../../../Redux/Slice/videoSlice";

const Listevideo = () => {
  const dispatch = useDispatch();
  const { video } = useSelector((state) => state.video);

  useEffect(() => {

    dispatch(Getvideo());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this video?")) {
      dispatch(deletevideo({ id }));
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
              {video.map((video, index) => (
                <tr key={index}>
                     <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {video.titre}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <img
           src={getImageUrl(video.images)}
           width="100px"
                      height="70px"

                      alt="Event"
                    />
                  </td>
                 
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {video.lien}
                  </td>
                
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <RiDeleteBin6Line
                      style={{
                        fontSize: "25px",
                        color: "black",
                        marginRight: "20px",
                      }}
                      onClick={() => handleDelete(video._id)}
                    />
                    <Link to={`/admin/videoCoching/edit/${video._id}`}>
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


export default Listevideo
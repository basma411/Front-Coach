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
import OverlayA from "../OverlayA";

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
              {video && video.map((video, index) => (
                <tr key={index}>
                     <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {truncateText(video.titre)}

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
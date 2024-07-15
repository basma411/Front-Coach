import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/TemoignageList.css";
import image from "../../../images/big_image_2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IoPowerOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";

import { GetTemoignageIn, PutTemoignagesInv, delTemoignageIn } from "../../../Redux/Slice/TemoignegeSlice";
import OverlayA from "../OverlayA";
const TémignageInvisible = () => {
    const dispatch = useDispatch();
const navigate=useNavigate()
    const { TemoignegeIv } = useSelector((state) => state.temoignage);
    useEffect(() => {
      dispatch(GetTemoignageIn());
    }, [dispatch]);
    const handleDelete = (id) => {
      if (window.confirm("Are you sure you want to delete this Temoignage?")) {
        dispatch(delTemoignageIn({ id }));
      }
    };
    const handleValid = (id) => {
      if (window.confirm("Are you sure you want to accept this Temoignage?")) {
          dispatch(PutTemoignagesInv({ id,data: { Visible: true }})  ) 
      }
    };
    const truncateText = (htmlText, maxLength) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const textContent = doc.body.textContent || "";
      return textContent.length > maxLength ? textContent.substring(0, maxLength) + '...' : textContent;
    };
    const handelAccueil = () => {
      navigate("/admin/Accueil");
    };
  return (

    <>
    <BarheaderAdmin />
    <NavBarAdmin />
    <OverlayA/>

    <div className="ConsultTem">
      <div className="ConsultTemContainer">
        <button className="AcceuilTem" onClick={handelAccueil}>Accueil</button>
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
              <th className="HeaderTem">
              nom
              </th>
              <th className="HeaderTem">
              textes
              </th>
              <th className="HeaderTem">
              date
              </th>
              <th className="HeaderTem">
              action
              </th>
            </tr>
          </thead>
        <tbody>
            {TemoignegeIv && TemoignegeIv.map((T_iV, index) => (
              <tr key={index}>
                <td className="DataTem">
                  {T_iV.nom}
                </td>
                <td className="DataTem">
                  {truncateText(T_iV.texte, 49)}

                </td>
                <td className="DataTem">
{T_iV.Date}                </td>

                <td className="DataTemIcon">
                <Link to={`/admin/témoignages/invisible/view/${T_iV._id}`}>
                      <GrView style={{ fontSize: "15px", color: "black" }} />
                    </Link>
                <FaCheck
                      style={{
                        fontSize: "15px",
                        color: "black",
                      }}
                      onClick={() => handleValid(T_iV._id)}
                    />
                  <RiDeleteBin6Line
                      style={{
                        fontSize: "15px",
                        color: "black",
                      }}
                      onClick={() => handleDelete(T_iV._id)}
                    />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
)
}

export default TémignageInvisible
import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/TemoignageList.css";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GetTemoignageV, delTemoignageV } from "../../../Redux/Slice/TemoignegeSlice";
import OverlayA from "../OverlayA";
const TémoignageVisible = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const { TemoignegeV } = useSelector((state) => state.temoignage);
  useEffect(() => {
    dispatch(GetTemoignageV());
  }, [dispatch]);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Temoignage?")) {
      dispatch(delTemoignageV({ id }));
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
            {TemoignegeV && TemoignegeV.map((T_V, index) => (
              <tr key={index}>
                <td className="DataTem">
                  {T_V.nom}
                </td>
                <td className="DataTem">
                  {truncateText(T_V.texte, 49)}
                </td>
                <td className="DataTem">
{T_V.Date}                </td>

                <td className="DataTem">
                <Link to={`/admin/témoignages/invisible/edit/${T_V._id}`}>
                      <CiEdit style={{ fontSize: "15px", color: "black",marginRight:"8px" }} />
                    </Link>
              
                  <RiDeleteBin6Line
                      style={{
                        fontSize: "15px",
                        color: "black",
                        marginRight: "20px",
                      }}
                      onClick={() => handleDelete(T_V._id)}
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

export default TémoignageVisible
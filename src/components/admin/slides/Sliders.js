import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { GetSlides, deleteSlider } from "../../../Redux/Slice/SlidesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

import "./CSS/EditerSlide.css";
import { getImageUrl } from "../../../index.js";
import OverlayA from "../OverlayA.js";
const Sliders = () => {
  const dispatch = useDispatch();

  const { Slide } = useSelector((state) => state.slide);
  useEffect(() => {
    dispatch(GetSlides());
  }, [dispatch]);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this slider?")) {
      dispatch(deleteSlider({ id }));
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


      <div className="ConsultSlide">
        <div className="ConsultSlideContainer">
          <Link to="/admin/Accueil">
            <button className="AccueilSlide">Accueil</button>
          </Link>
          <Link to="/admin/ajouter_slider">
            <button className="AccueilSlide">Ajouter Slider</button>
          </Link>
          <table
            className="TableSlide"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Photo:
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  titre1
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  titre2
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  supprimer
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Modifier
                </th>
              </tr>
            </thead>
            <tbody>
              {Slide.map((slide, index) => (
                <tr key={index}>
                  <td
                    style={{
                      border: "1px solid gray",
                      padding: "10px",
                      width: "100px",
                    }}
                  >
                    <img
src={getImageUrl(slide.photo)} style={{width:'70px' ,height:'70px'}}                     className="imgSlide"
                    />
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                  {truncateText(slide.titre1)}

                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                  {truncateText(slide.titre2)}
                  </td>

                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <RiDeleteBin6Line
                      style={{ fontSize: "20px", color: "black" }}
                      onClick={() => handleDelete(slide._id)}
                    />
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <Link to={`/admin/edit_slider/${slide._id}`}>
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

export default Sliders;

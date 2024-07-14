import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import { GetSlides, deleteSlider } from "../../../Redux/Slice/SlidesSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

import "./CSS/EditerSlide.css";
import { getImageUrl } from "../../../index.js";
import OverlayA from "../OverlayA.js";
const Sliders = () => {
  const dispatch = useDispatch();
const navigate= useNavigate()
  const { Slide } = useSelector((state) => state.slide);
  useEffect(() => {
    dispatch(GetSlides());
  }, [dispatch]);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this slider?")) {
      dispatch(deleteSlider({ id }));
    }
  };
  const handelAcceuil= () => {
    navigate("/admin/Accueil")};
    const handelAddSlicer = () => {
      navigate("/admin/ajouter_slider")};
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
            <button className="AccueilSlide" onClick={handelAcceuil}>Accueil</button>
            <button className="AccueilSlide" onClick={handelAddSlicer}>Ajouter Slider</button>
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
                <th className="HeaderSlider">
                  Photo:
                </th>
                <th className="HeaderSlider">
                  titre1
                </th>
                <th className="HeaderSlider">
                  titre2
                </th>
                <th className="HeaderSlider">
                  supprimer
                </th>
                <th className="HeaderSlider">
                  Modifier
                </th>
              </tr>
            </thead>
            <tbody>
              {Slide.map((slide, index) => (
                <tr key={index}>
                  <td
                 className="DataSlider"
                  >
                    <img
src={getImageUrl(slide.photo)} style={{width:'70px' ,height:'70px'}}                     className="imgSlide"
                    />
                  </td>
                  <td                  className="DataSlider"
                  >
                  {truncateText(slide.titre1)}

                  </td>
                  <td                  className="DataSlider"
                  >
                  {truncateText(slide.titre2)}
                  </td>

                  <td                  className="DataSlider"
                  >
                    <RiDeleteBin6Line
                      style={{ fontSize: "20px", color: "black" }}
                      onClick={() => handleDelete(slide._id)}
                    />
                  </td>
                  <td                  className="DataSlider"
                  >
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

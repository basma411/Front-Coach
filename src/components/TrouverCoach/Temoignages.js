import React, { useEffect } from "react";
import image from "../../images/big_image_2.jpg";
import "./css/temoignage.css";
import { GetTemoignageV } from "../../Redux/Slice/TemoignegeSlice";
import { useDispatch, useSelector } from "react-redux";
import Newsletter from "../coach/Newsletter";
import Footer from "../coach/Footer";
const Temoignages = () => {
  const { TemoignegeV } = useSelector((state) => state.temoignage);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetTemoignageV());
    console.log(TemoignegeV);
  }, [dispatch]);
  return (
    <>
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
        <div>
          <h3 className="TemTitre">Témoignages</h3>
        </div>
      </div>

      <div style={{ height: "400px" }}></div>

      <Newsletter />
      <Footer />
    </>
  );
};

export default Temoignages;

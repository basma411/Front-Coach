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
  useEffect(() => {
    const handleScroll = () => {
      const elem = document.querySelector('.section-hero');
      const { top } = elem.getBoundingClientRect();
      console.log(top)
      if (elem) {
        const { top } = elem.getBoundingClientRect();
        // Calculate the background position based on the element's position and scroll
        const backgroundPositionY = -(top-40-82 )* 0.6;
        elem.style.backgroundPosition = `50% ${backgroundPositionY}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className="PlatformePartageTem  section-hero" data-stellar-background-ratio="0.5"
        style={{
      
          backgroundImage: `url(${image})`,
       
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

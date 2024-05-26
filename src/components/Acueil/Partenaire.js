import React, { useEffect, useRef } from "react";
import "./css/partenaire.css";
import { GetPartenaire } from "../../Redux/Slice/PartenaireSlice";
import { useDispatch, useSelector } from "react-redux";
import image from '../../images/logo.jpg'

const Partenaire = () => {
  const dispatch = useDispatch();
  const { Partenaire } = useSelector((state) => state.partenaire);
  const marqueeContentRef = useRef(null);

  useEffect(() => {
    dispatch(GetPartenaire());
  }, [dispatch]);

  useEffect(() => {
    if (Partenaire && marqueeContentRef.current) {
      adjustMarqueeElements();
    }
  }, [Partenaire]); // Exécuter adjustMarqueeElements lorsque Partenaire change

  const adjustMarqueeElements = () => {
    const root = document.documentElement;
    const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
    const marqueeContent = marqueeContentRef.current;

    root.style.setProperty("--marquee-elements", marqueeContent.children.length);

    for (let i = 0; i < marqueeElementsDisplayed && i < marqueeContent.children.length; i++) {
      marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
    }
  };

  return (
    <div className="Partenaire">
      <div className="form-groupe">
        <h2>Nos partenaires</h2>
        <div className="marquee">
          <ul className="marquee-content" ref={marqueeContentRef}>
            {Partenaire &&
              Partenaire.map((partenaire, index) => (
                <li key={index} className="marquee-item">
                  <img
                    src={`http://localhost:8000/${partenaire.photo}`}
                    alt={`Partenaire ${index + 1}`}
                    height={"200px"}
                    className="marquee-img"
                  />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Partenaire;

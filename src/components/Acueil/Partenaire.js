import React, { useEffect } from "react";
import "./css/partenaire.css";
import { GetPartenaire } from "../../Redux/Slice/PartenaireSlice";
import { useDispatch, useSelector } from "react-redux";

const Partenaire = () => {
  const dispatch = useDispatch();
  const { Partenaire } = useSelector((state) => state.partenaire);

  useEffect(() => {
    dispatch(GetPartenaire());
  }, [dispatch]);

  return (
    <div className="Partenaire">
      <div className="form-groupe">
        <h2>Nos partenaires</h2>
        <div className="marquee">
          {Partenaire && Partenaire.map((partenaire, index) => (
            <img
              key={index}
              src={`http://localhost:8000/${partenaire.Photo}`}
              alt={`Partenaire ${index + 1}`}
              height={'200px'}
              className="marquee-img"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partenaire;

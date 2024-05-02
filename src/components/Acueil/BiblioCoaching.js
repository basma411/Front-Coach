import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBiblio } from "../../Redux/Slice/BiblioSlice";
import "./css/biblio.css"; // Importez le fichier CSS externe

const BiblioCoaching = () => {
  const dispatch = useDispatch();

  const { Biblios } = useSelector((state) => state.biblio);
  useEffect(() => {
    dispatch(GetBiblio());
  }, [dispatch]);

  return (
    <div className="Container ">
<div>
<h2 >BiblioCoaching</h2>

  
  </div>        
      <div className="site-section"> 
        {Biblios &&
          Biblios.map((Biblio, index) => (
            <div key={index} >
            <img    src={`http://localhost:8000/${Biblio.image}`}
                    alt={`Partenaire ${index + 1}`} width={'370PX'} height={'427px'}/>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BiblioCoaching;

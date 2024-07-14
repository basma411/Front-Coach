import React, { useEffect } from 'react'
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { MdOutlineModeEdit } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import BarheaderAdmin from '../BarheaderAdmin';
import NavBarAdmin from '../NavBarAdmin';
import { GetBiblio } from '../../../Redux/Slice/BiblioSlice';

import './css/consulterbiblio.css'
import { getImageUrl } from '../../..';
import OverlayA from '../OverlayA';
const ConsulterBiblio = () => {
  const dispatch = useDispatch();
const navigate = useNavigate()
  const { Biblios } = useSelector((state) => state.biblio);
  useEffect(() => {
    dispatch(GetBiblio());
  }, [dispatch]);
  console.log(Biblios);
  const handelAccueil = () => {
    navigate("/admin/Accueil");
  };
  return (

<>
<BarheaderAdmin />
      <NavBarAdmin />
      <OverlayA/>



      <div className="ConsultBiblio">
        <div className="ConsultBiblioContainer">
          <button className="AccueilBiblio" onClick={handelAccueil}>Accueil</button>
          <table
            className="TableBiblio"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th className="HeaderSlider">
                  Image
                </th>
                <th className="HeaderSlider">
                Description
                </th>
                <th className="HeaderSlider">
                auteurs
                </th>
                <th className="HeaderSlider">
                  Année
                </th>
                <th className="HeaderSlider">
                  Modifier
                </th>
              </tr>
            </thead>
            <tbody>
              {Biblios && Biblios.map((Biblio, index) => (
                <tr key={index}>
                    <td className="DataSlider">
                    <img    src={getImageUrl(Biblio.photo_c)} className='ImagSlide'/>
                  </td>
                  <td className="DataSlider">
                    {Biblio.descrip.substring(0, 50)}
                  </td>
                  <td className="DataSlider">
                    {Biblio.auteur1}
                  </td>
                
                  <td className="DataSlider">
                    {Biblio.annee}
                  </td>

                  <td className="DataSlider">
                    <Link to={`/admin/consulter_biblio/Edit/${Biblio._id}`}>
                      <MdOutlineModeEdit style={{ fontSize: "30px",  color:'black'}} />
                    </Link>
                   
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

export default ConsulterBiblio
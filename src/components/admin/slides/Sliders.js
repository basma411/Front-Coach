import React, { useEffect } from 'react'
import BarheaderAdmin from '../BarheaderAdmin'
import NavBarAdmin from '../NavBarAdmin'
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from 'react-icons/io5';
import { GetSlides } from '../../../Redux/Slice/SlidesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";

import './CSS/EditerSlide.css'
const Sliders = () => {
    const dispatch = useDispatch();

    const { Slide } = useSelector((state) => state.slide);
    useEffect(() => {
      dispatch(GetSlides());
    }, [dispatch]);
    console.log(Slide);
  return (
<>
<BarheaderAdmin />
      <NavBarAdmin />
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
        <div style={{ paddingTop: "100px" }}>
          <IoPowerOutline style={{ fontSize: "35px", fontWeight: "400" }} />
          <h2 style={{ fontSize: "30px" }}>
            Bienvenue sur votre espace administration
          </h2>
        </div>
      </div>

      <div className="ConsultSlide">
        <div className="ConsultSlideContainer">
          <Link to='/admin/Accueil'>
          <button className="AccueilSlide">Accueil</button>
          
          </Link>
          <Link to='/admin/ajouter_slider'>
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
                     <td style={{ border: "1px solid gray", padding: "10px" ,width:'100px'}}>
                    <img src={`http://localhost:8000/${slide.photo}`} className='imgSlide' />
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {slide.titre1}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {slide.titre2}
                  </td>
                 

                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                      <RiDeleteBin6Line  style={{ fontSize: "20px",  color:'black'}} />
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <Link to={`/admin/slide/edit/${slide._id}`}>
                      <CiEdit  style={{ fontSize: "25px",  color:'black'}} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
</>  )
}

export default Sliders
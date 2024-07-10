import React, { useEffect } from 'react'
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";
import { MdOutlineModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import BarheaderAdmin from '../BarheaderAdmin';
import NavBarAdmin from '../NavBarAdmin';
import { GetBiblio } from '../../../Redux/Slice/BiblioSlice';

import './css/consulterbiblio.css'
import { getImageUrl } from '../../..';
import OverlayA from '../OverlayA';
const ConsulterBiblio = () => {
  const dispatch = useDispatch();

  const { Biblios } = useSelector((state) => state.biblio);
  useEffect(() => {
    dispatch(GetBiblio());
  }, [dispatch]);
  console.log(Biblios);
  return (

<>
<BarheaderAdmin />
      <NavBarAdmin />
      <OverlayA/>



      <div className="ConsultBiblio">
        <div className="ConsultBiblioContainer">
          <Link to='/admin/Accueil'>
          <button className="AccueilBiblio">Accueil</button>
          </Link>
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
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Image
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                Description
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                auteurs
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Année
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Modifier
                </th>
              </tr>
            </thead>
            <tbody>
              {Biblios && Biblios.map((Biblio, index) => (
                <tr key={index}>
                    <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <img    src={getImageUrl(Biblio.photo_c)}
  height={"100px"}/>
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {Biblio.descrip.substring(0, 50)}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {Biblio.auteur1}
                  </td>
                
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {Biblio.annee}
                  </td>

                  <td style={{ border: "1px solid gray", padding: "10px" }}>
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
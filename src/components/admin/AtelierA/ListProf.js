import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetList } from '../../../Redux/Slice/ListSlice';
import { useParams } from 'react-router-dom';
import BarheaderAdmin from '../BarheaderAdmin';
import { Link, useNavigate } from "react-router-dom";
import image from "../../../images/big_image_2.jpg";
import NavBarAdmin from '../NavBarAdmin';
import "./css/List.css";
import Deconnection from '../Deconnection';

const ListProf = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Get 'id' from URL parameters
  const navigator=useNavigate()
  const handleLogout = () => {
 navigator("/admin/login")
  };
  useEffect(() => {
    dispatch(GetList({ id, entreprise: "Entreprise" })); // Pass id and entreprise as an object
  }, [dispatch, id]);

  const { Lists } = useSelector((state) => state.list);

  return (
    <>

<BarheaderAdmin />
      <NavBarAdmin />
      <Deconnection/>

  
      <div className="ConsultArtInvisib">
        <div className="ConsultArtInvisibContainer">
          <Link to="/admin/Accueil">
            <button className="AccueilArtInvisib">Accueil</button>
          </Link>
          <Link to="/admin/Accueil">
            <button className="AccueilArtInvisib">Emailing</button>
          </Link>
          <table
            className="TableArtInvisib"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                nom
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                Prénom
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                Téléphone
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                Email:
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                Entreprise:
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                Poste
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                Question
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                Action
                </th>
              </tr>
            </thead>
             <tbody>
              {Lists && Lists.map((list, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {list.nom}
                  </td>
                

                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {list.prenom}
                  </td>

                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                                       {list.tel}

                  

                
                   
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {list.mail}
                  </td>
                      <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {list.entreprise}
                  </td>
                
                      <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {list.poste}
                  </td>
                
                      <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {list.proposition}
                  </td>
                
                      <td style={{ border: "1px solid gray", padding: "10px" }}>
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

export default ListProf;

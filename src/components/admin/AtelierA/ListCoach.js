import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetList } from '../../../Redux/Slice/ListSlice';
import { useParams } from 'react-router-dom';
import BarheaderAdmin from '../BarheaderAdmin';
import { Link, useNavigate } from "react-router-dom";
import image from "../../../images/big_image_2.jpg";
import NavBarAdmin from '../NavBarAdmin';

const ListCoach = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Get 'id' from URL parameters
  const navigator=useNavigate()
  const handleLogout = () => {
 navigator("/admin/login")
  };
  useEffect(() => {
    dispatch(GetList({ id, entreprise: "Coach" })); // Pass id and entreprise as an object
  }, [dispatch, id]);

  const { Lists } = useSelector((state) => state.list);

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
          <div>
      
      <h4 style={{ fontSize: "20px", cursor: "pointer" }} onClick={handleLogout}>
        Déconnexion
      </h4>
      
                <h4 style={{ fontSize: "20px" , padding:"0px"}}>
                Menu principal
      
                </h4>
              </div>
      </div>
  
      <div className="ConsultList">
        <div className="ListContainer">
          <Link to="/admin/Accueil">
            <button className="AccueilList">Accueil</button>
          </Link>
          <Link to="/admin/Accueil">
            <button className="AccueilList">Emailing</button>
          </Link>
          <table
            className="TableList"
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
                Coach:
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



export default ListCoach
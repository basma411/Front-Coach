import React, { useEffect } from 'react'
import image from "../../../images/big_image_2.jpg";
import BarheaderAdmin from '../BarheaderAdmin';
import NavBarAdmin from '../NavBarAdmin';
import { useNavigate } from 'react-router-dom';
import { UpdateCoach, UpdateCoachAdmin, delCoachInvisible, getCoachInVisivble } from '../../../Redux/Slice/CoachSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { FaCheck } from "react-icons/fa6";
const CoachInvisib = () => {
  const dispatch = useDispatch();
  const { coacheInvisible } = useSelector((state) => state.coach);

  useEffect(() => {
    dispatch(getCoachInVisivble());
  }, [dispatch]);
  const navigator = useNavigate();
  const handleLogout = () => {
    navigator("/admin/login");
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coach?")) {
    dispatch(delCoachInvisible({ id }));
    }
  }; 

  const handleValid = (id) => {
    if (window.confirm("Are you sure you want to accept this coach?")) {
        dispatch(UpdateCoachAdmin({ id,data: { activ: true }})
        ) 
    }
  };
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

      <div className="ConsultCochVisib">
        <div className="ConsultCochVisibContainer">
          <table
            className="TableCochVisib"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Nom et prénom
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Domaines d’intervention
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Photo
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {coacheInvisible.map((coachI, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {coachI.nom}
                  </td>
                  <td
                    style={{
                      border: "1px solid gray",
                      padding: "10px",
                      whiteSpace: "pre-line",
                      textAlign: "start",
                    }}
                  >
                    *{coachI.domain.join("\n * ")} 
                    
                    {coachI.AutreDomaine && `\n * ${coachI.AutreDomaine}`}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <img
                      src={`http://localhost:8000/${coachI.image}`}
                      width="100px"
                      alt="Article"
                    />
                  </td>

                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                  
 <Link to={`/admin/coach/invisible/${coachI._id}`}>
                      <GrView style={{ fontSize: "25px", color: "black" }} />
                    </Link>
                    <FaCheck
                      style={{
                        fontSize: "25px",
                        color: "black",
                        marginRight: "20px",
                      }}
                      onClick={() => handleValid(coachI._id)}
                    />

                
                    <RiDeleteBin6Line
                      style={{
                        fontSize: "25px",
                        color: "black",
                        marginRight: "20px",
                      }}
                      onClick={() => handleDelete(coachI._id)}
                    />
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
export default CoachInvisib
import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/consultinterface.css";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { GetIcon } from "../../../Redux/Slice/IconSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import { fetchInterface } from "../../../Redux/Slice/InterfaceSlice";
const ConsulterInterface = () => {
    const dispatch = useDispatch();

    const { interfaceData } = useSelector((state) => state.interface);
    useEffect(() => {
      dispatch(fetchInterface());
    }, [dispatch]);
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
      {interfaceData && interfaceData.length > 0 && (
     
 <div className="ConsultIcon">
 <div className="ConsultIconContainer">
   <Link to='/admin/Accueil'>
   <button className="AccueilIcon">Accueil</button>
   </Link>
   <table
     className="TableIcon"
     style={{
       borderCollapse: "collapse",
       width: "100%",
       textAlign: "center",
     }}
   >
     <thead>
       <tr>
         <th style={{ border: "1px solid gray", padding: "8px" }}>
         titre
         </th>
         <th style={{ border: "1px solid gray", padding: "8px" }}>
         textes
         </th>
         <th style={{ border: "1px solid gray", padding: "8px" }}>
         image
         </th>
         <th style={{ border: "1px solid gray", padding: "8px" }}>
         privilège
         </th>
         <th style={{ border: "1px solid gray", padding: "8px" }}>
         page
         </th>
         <th style={{ border: "1px solid gray", padding: "8px" }}>
         modificateur
         </th>
       </tr>
     </thead>
     <tbody>
         <tr >
           <td style={{ border: "1px solid gray", padding: "10px" }}>
             {interfaceData[0].titre}
           </td>
           <td style={{ border: "1px solid gray", padding: "10px" }}>
             {interfaceData[0].texte.substring(0, 50)}...
           </td>
           <td style={{ border: "1px solid gray", padding: "10px" }}>
           <img src={`http://localhost:8000/${interfaceData[0].image}`} width={'100px'} />

           </td>
           <td style={{ border: "1px solid gray", padding: "10px" }}>
          1
           </td>
           
            <td style={{ border: "1px solid gray", padding: "10px" }}>
            TrouverCoach
           </td>
           <td style={{ border: "1px solid gray", padding: "10px" }}>
             <Link to={`/admin/inteface/edit/${interfaceData[0]._id}`}>
             <CiEdit style={{ fontSize: "25px",  color:'black'}} />
             </Link>
           </td>
         </tr>
       )
     </tbody>
   </table>
 </div>
</div>

      )}
</>
)
}

export default ConsulterInterface
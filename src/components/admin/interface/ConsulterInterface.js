import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/consultinterface.css";

import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { fetchInterface } from "../../../Redux/Slice/InterfaceSlice";
import { getImageUrl } from "../../..";
import OverlayA from "../OverlayA";
const ConsulterInterface = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { interfaceData } = useSelector((state) => state.interface);
    useEffect(() => {
      dispatch(fetchInterface());
    }, [dispatch]);
    const truncateText = (htmlText, maxLength) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const textContent = doc.body.textContent || "";
      return textContent.length > maxLength ? textContent.substring(0, maxLength) + '...' : textContent;
    };
    const handelAccueil = () => {
      navigate("/admin/Accueil");
    };
  return (

<>
<BarheaderAdmin />
      <NavBarAdmin />
      <OverlayA/>

      {interfaceData && interfaceData.length > 0 && (
     
 <div className="ConsultInter">
 <div className="ConsultInterContainer">
   <button className="AccueilInter" onClick={handelAccueil}>Accueil</button>
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
         <th className="HeaderInter">
         titre
         </th>
         <th className="HeaderInter">
         textes
         </th>
         <th className="HeaderInter">
         image
         </th>
         <th className="HeaderInter">
         privilège
         </th>
         <th className="HeaderInter">
         page
         </th>
         <th className="HeaderInter">
         modificateur
         </th>
       </tr>
     </thead>
     <tbody>
         <tr >
           <td className="DataInter">
             {truncateText(interfaceData[0].titre)}
           </td>
           <td className="DataInter">
             {truncateText(interfaceData[0].texte, 50)}
           </td>
           <td className="DataInter">
           <img            src={getImageUrl(interfaceData[0].image)}
 width={'70px'} />

           </td>
           <td className="DataInter">
          1
           </td>
           
            <td className="DataInter">
            TrouverCoach
           </td>
           <td className="DataInter">
             <Link to={`/admin/consulter_interface/edit/${interfaceData[0]._id}`}>
             <CiEdit style={{ fontSize: "25px",  color:'black'}} />
             </Link>
           </td>
         </tr>
       
     </tbody>
   </table>
 </div>
</div>

      )}
</>
)
}

export default ConsulterInterface
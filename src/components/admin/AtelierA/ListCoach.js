import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { delAtelier, GetList } from '../../../Redux/Slice/ListSlice';
import { useParams } from 'react-router-dom';
import BarheaderAdmin from '../BarheaderAdmin';
import { Link, useNavigate } from "react-router-dom";
import NavBarAdmin from '../NavBarAdmin';
import Deconnection from '../Deconnection';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
const ListCoach = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Get 'id' from URL parameters
  const navigate=useNavigate()
  const { Lists } = useSelector((state) => state.list);

  useEffect(() => {
    dispatch(GetList({ id, entreprise: "Coach" })); 
  }, [dispatch, id]);

  const handelAccueil = () => {
    navigate("/admin/Accueil");
  };
  const handelEmailing = () => {
    navigate("/admin/atelier-A/List/email");
  };
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      dispatch(delAtelier({ id }));
      dispatch(GetList({ id, entreprise: "Coach" })); 

    }
  };
  return (
    <>

<BarheaderAdmin />
      <NavBarAdmin />
 <Deconnection/>
  
   
 <div className="ConsultList">
        <div className="ListContainer">
    <div className='LISTbuttonContainer'>
    <button className="btnAccueilPROF " onClick={handelAccueil}>Accueil</button>
    <button className="btnEmailingProf" onClick={handelEmailing}>Emailing</button>
    </div>
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
                <th className='headerList'>
                nom
                </th>
                <th className='headerList'>
                Prénom
                </th>
                <th className='headerList'>
                Téléphone
                </th>
                <th className='headerList'>
                Email:
                </th>
                <th className='headerList'>
                Coach:
                </th>
                <th className='headerList'>
                Poste
                </th>
                <th className='headerList'>
                Question
                </th>
                <th className='headerList'>
                Action
                </th>
              </tr>
            </thead>
             <tbody>
              {Lists && Lists.map((list, index) => (
                <tr key={index}>
                  <td className='DataList'>
                    {list.nom}
                  </td>
                

                  <td className='DataList'>
                    {list.prenom}
                  </td>

                  <td className='DataList'>
                                       {list.tel}

                  

                
                   
                  </td>
                  <td className='DataList'>
                    {list.mail}
                  </td>
                      <td className='DataList'>
                    {list.entreprise}
                  </td>
                
                      <td className='DataList'>
                    {list.poste}
                  </td>
                
                      <td className='DataList'>
                    {list.proposition}
                  </td>
                  <td className='DataList'>
                      <Link to={`/admin/article/invisible/view/${list._id}`}>
                      <GrView className="IconData" />
                    </Link>
                 
                    <RiDeleteBin6Line
                      className="IconData"
                      onClick={() => handleDelete(list._id)}
                    />
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
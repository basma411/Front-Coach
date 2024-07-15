import React, { useEffect } from 'react';
import BarheaderAdmin from '../BarheaderAdmin';
import NavBarAdmin from '../NavBarAdmin';
import './css/coachVisib.css'; // Import the external CSS file
import { useNavigate } from 'react-router-dom';
import { UpdateCoachAdmin, delCoachInvisible, getCoachInVisivble } from '../../../Redux/Slice/CoachSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { GrView } from "react-icons/gr";
import { FaCheck } from "react-icons/fa6";
import { getImageUrl } from '../../..';
import Deconnection from '../Deconnection';

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

  const handleDeletee = (id) => {
    if (window.confirm("Are you sure you want to delete this coach?")) {
      dispatch(delCoachInvisible({ id }));
    }
  }; 

  const handleValid = (id) => {
    if (window.confirm("Are you sure you want to accept this coach?")) {
      dispatch(UpdateCoachAdmin({ id, data: { activ: true } }));
    }
  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <Deconnection />

      <div className="ConsultCoch">
        <div className="ConsultCochcontainer">
          <table className="TableCoch">
            <thead>
              <tr>
                <th className="TableHeaderC">Nom et prénom</th>
                <th className="TableHeaderC">Domaines d’intervention</th>
                <th className="TableHeaderC">Photo</th>
                <th className="TableHeaderC">Action</th>
              </tr>
            </thead>
            <tbody>
              {coacheInvisible.map((coachI, index) => (
                <tr key={index}>
                  <td className="TableDataC">{coachI.nom}</td>
                  <td className="TableDataC TableDataText">
                    *{coachI.domain.join("\n * ")}
                    {coachI.AutreDomaine && `\n * ${coachI.AutreDomaine}`}
                  </td>
                  <td className="TableDataC">
                    <img src={getImageUrl(coachI.image)} alt="Coach" className="TableDataimgC" />
                  </td>
                  <td className="TableDataC">
                    <Link to={`/admin/Coachs/invisible/view/${coachI._id}`}>
                      <GrView className="IconData" />
                    </Link>
                    <FaCheck className="IconData" onClick={() => handleValid(coachI._id)} />
                    <RiDeleteBin6Line className="IconData" onClick={() => handleDeletee(coachI._id)} />
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

export default CoachInvisib;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoPowerOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from "react-redux";
import { getCoachVisivble, selectCoach, deselectCoach, clearSelectedCoaches } from "../../../Redux/Slice/CoachSlice.js";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import image from "../../../images/big_image_2.jpg";
import "./css/basecoach.css";
import OverlayA from "../OverlayA.js";

const BaseCoach = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coachVisible = [], selectedCoaches = [] } = useSelector((state) => state.coach);

  useEffect(() => {
    dispatch(getCoachVisivble());
    dispatch(clearSelectedCoaches());
  }, [dispatch]);

  const handleCheckAll = () => {
    coachVisible.forEach((coach) => {
      dispatch(selectCoach(coach._id));
    });
  };

  const handleUncheckAll = () => {
    dispatch(clearSelectedCoaches());
  };

  const handleCheckboxChange = (id) => {
    if (selectedCoaches.includes(id)) {
      dispatch(deselectCoach(id));
    } else {
      dispatch(selectCoach(id));
    }
  };

  const handleEmailButtonClick = () => {
    console.log(selectedCoaches)
    navigate('/admin/EmailingCoach');
  };

  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
      <OverlayA/>

      <div className="ConsultBD">
        <div className="ConsultBDContainer">
          <button className="AccueilBD" onClick={handleEmailButtonClick}>
            Emailing Coachs
          </button>
          <table className="TableBD" style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}>
            <thead>
              <tr>
                <th className="TableHeaderDate">Nom et prénom</th>
                <th className="TableHeaderDate">Email</th>
                <th className="TableHeaderDate">Tél</th>
                <th className="TableHeaderDate">
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                    <label style={{display:'flex'}}>
                      <input type="radio" name="selectOptions" onClick={handleCheckAll} />
                      Tout cocher
                    </label>
                    <label style={{display:'flex'}}>
                      <input type="radio" name="selectOptions" onClick={handleUncheckAll} />
                      Tout décocher
                    </label>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {coachVisible && coachVisible.map((coach, index) => (
                <tr key={index}>
                  <td className="Data">{coach.nom}</td>
                  <td className="Data">{coach.email}</td>
                  <td className="Data">{coach.num}</td>
                  <td className="Data">
                    <input
                      type="checkbox"
                      checked={selectedCoaches.includes(coach._id)}
                      onChange={() => handleCheckboxChange(coach._id)}
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

export default BaseCoach;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoPowerOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from "react-redux";
import { getCoachVisivble, selectCoach, deselectCoach, clearSelectedCoaches } from "../../../Redux/Slice/CoachSlice.js";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import image from "../../../images/big_image_2.jpg";
import "./css/basecoach.css";

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
      <div className="ImagePlatforme" style={{ position: 'relative', textAlign: 'center', height: '300px', backgroundImage: `url(${image})`, backgroundSize: 'cover', overflow: 'hidden' }}>
        <div style={{ paddingTop: '100px' }}>
          <IoPowerOutline style={{ fontSize: '35px', fontWeight: '700' }} />
          <h2 style={{ fontSize: '30px' }}>Bienvenue sur votre espace administration</h2>
        </div>
      </div>
      <div className="ConsultBD">
        <div className="ConsultBDContainer">
          <button className="AccueilBD" onClick={handleEmailButtonClick}>
            Emailing Coachs
          </button>
          <table className="TableBD" style={{ borderCollapse: "collapse", width: "100%", textAlign: "center" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid gray", padding: "8px" }}>Nom et prénom</th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>Email</th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>Tél</th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <label>
                      <input type="radio" name="selectOptions" onClick={handleCheckAll} />
                      Tout cocher
                    </label>
                    <label>
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
                  <td style={{ border: "1px solid gray", padding: "10px" }}>{coach.nom}</td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>{coach.email}</td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>{coach.num}</td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
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

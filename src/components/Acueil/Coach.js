import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./css/coach.css";
import { GiPositionMarker } from "react-icons/gi";
import image from '../../images/big_image_2.jpg';
import { getCoach } from "../../Redux/Slice/CoachSlice"; // Import the action

const Coach = () => {
  const { coachfiltre } = useSelector((state) => state.coach); // Access the filtered coaches from Redux state

  const dispatch = useDispatch();
  useEffect(() => {
    // Dispatch the action to fetch filtered coaches
    dispatch(getCoach());
  }, [dispatch]);

  return (
    <>
      <div
        className="ImagePlatformecherche"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div>
          <h2 className="cherchetitre">Trouver un coach</h2>
        </div>
      </div>
      <div className="ContainerFilter">
        <div className="episodes">
          <div className="ContainerCoach">
            <div className="coachFiltre">
              {coachfiltre && coachfiltre.length === 0 ? (
                <div className="CenterText">Aucun résultat..!</div>
              ) : (
                coachfiltre &&
                coachfiltre.map((coach, index) => (
                  <div key={coach.id}>
                    <div className="Coach">
                      <div>
                        <h3 className="nomCoach">{coach.nom}</h3>
                        <h4 className="nomCoachLieu">
                          {coach.gouv}
                          <GiPositionMarker style={{ color: '#000',marginLeft:"5px" }} />
                        </h4>
                      </div>
                      <img
                        src={`http://localhost:8000/${coach.image}`}
                        alt={`icon ${index + 1}`}
                        width={"100px"}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coach;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./css/coach.css";
import { GiPositionMarker } from "react-icons/gi";
import image from '../../images/big_image_2.jpg'
import { getCoach } from "../../Redux/Slice/CoachSlice";

const Coach = () => {
  const { coachfiltre } = useSelector((state) => state.coach);

  const dispatch = useDispatch();
  useEffect(() => {
        // dispatch(getCoach());

  }, [dispatch]);

  return (
    <>
      {" "}
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
          <h2>Trouver un coach
</h2>
        </div>
      </div>
      <div className="ContainerFilter">
        <div className="episodes">
          <div className="ContainerCoach">
            <div className="coachFiltre">
              {coachfiltre && coachfiltre.map((coach, index) => (
                <div>
                  <div key={coach.id} className="Coach">
                    <div className="nomCoach">
                      <h3> {coach.NomPrenom}</h3>
                      <h4>
                        {" "}
                        {coach.Governorat}
                        <GiPositionMarker />
                      </h4>
                    </div>
                    <img
                      src={`http://localhost:8000/${coach.Photo}`}
                      alt={`icon ${index + 1}`}
                      width={"100px"}
                    />
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coach;

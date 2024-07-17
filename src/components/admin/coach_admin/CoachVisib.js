import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/coachVisib.css"; // Importez le fichier CSS externe
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../images/logo.jpg";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { FiSend } from "react-icons/fi";
import { delCoachVisible, getCoachVisivble } from "../../../Redux/Slice/CoachSlice";
import { getImageUrl } from "../../..";
import Deconnection from "../Deconnection";
import { sendEmail } from "../../../Redux/Slice/emailSlice"; // Assurez-vous que l'importation est correcte

const CoachVisib = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coachVisible } = useSelector((state) => state.coach);

  useEffect(() => {
    dispatch(getCoachVisivble());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this coach?")) {
      dispatch(delCoachVisible({ id }));
    }
  };

  const handlesend = (email) => {
    const templateParams = {
      email: email,
      subject: "Votre Sujet du Message",
      message: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; color: #000; margin: 0 auto; padding: 20px;">
          <h5>Bonjour,</h5>
          
          <p style=" color: #000">Nous vous remercions pour votre inscription sur la plateforme : <a href="http://localhost:3000" style="color: blue; ">MonCoach.tn</a></p>
          
          <p>Veuillez trouver ci-joint le lien vers votre profil : <a href="http://localhost:3000" style="color: blue; ">Lien vers le profil</a></p>
          
          <p>Merci pour votre confiance !</p>
          
          <p>Ensemble pour une communauté plus grande</p>
          
        <img src=${logo} alt="MonCoach.tn" />
        </div>
      `,
    };
  
    dispatch(sendEmail(templateParams))
      .then(() => {
        alert("Email envoyé avec succès !");
        navigate("/admin/Coachs/visible");
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        alert("Failed to send email: " + error.message);
        navigate("/admin/Coachs/visible");
      });
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
              {coachVisible.map((coachV, index) => (
                <tr key={index}>
                  <td className="TableDataC">{coachV.nom}</td>
                  <td className="TableDataC TableDataText">
                    *{coachV.domain.join("\n * ")}
                    {coachV.AutreDomaine && `\n * ${coachV.AutreDomaine}`}
                  </td>
                  <td className="TableDataC">
                    <img src={getImageUrl(coachV.image)} alt="Article" className="TableDataimgC" />
                  </td>
                  <td className="TableDataC">
                    <Link to={`/admin/Coachs/visible/view/${coachV._id}`}>
                      <GrView className="IconData" />
                    </Link>
                    <RiDeleteBin6Line
                      className="IconData"
                      onClick={() => handleDelete(coachV._id)}
                    />
                    <Link to={`/admin/Coachs/visible/edit/${coachV._id}`}>
                      <CiEdit className="IconData" />
                    </Link>
                    <FiSend className="IconSend" onClick={() => handlesend(coachV.email)} />
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

export default CoachVisib;

import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/listFAQ.css";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFaq } from "../../../Redux/Slice/FaqSlice";

const ListFaq = () => {
  const dispatch = useDispatch();

  const { Faqs } = useSelector((state) => state.faq);
  useEffect(() => {
    dispatch(getFaq());
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
      <div className="ConsultListFaq">
        <div className="ListFaqContainer">
          <Link to='/admin/Accueil'>
          <button className="AccueilListFaq">Accueil</button>
          </Link>
          <table
            className="TableListFaq"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                Question
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                Réponse
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                date
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                action
                </th>
              </tr>
            </thead>
             <tbody>
              {Faqs && Faqs.map((Faq, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
{Faq.question}                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
{Faq.rreponse}                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
{Faq.dates} 
                  </td>

                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                   
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



export default ListFaq
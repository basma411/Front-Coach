import React, { useEffect } from "react";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/listFAQ.css";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getFaq } from "../../../Redux/Slice/FaqSlice";
import OverlayA from "../OverlayA";

const ListFaq = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { Faqs } = useSelector((state) => state.faq);
  useEffect(() => {
    dispatch(getFaq());
  }, [dispatch]);
  const handelAccueil = () => {
    navigate("/admin/Accueil");
  };
  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
    <OverlayA/>
      <div className="ConsultListFaq">
        <div className="ListFaqContainer">
          <button className="AccueilListFaq" onClick={handelAccueil}>Accueil</button>
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
                <th className="TableHeaderfaq">
                Question
                </th>
                <th className="TableHeaderfaq">
                Réponse
                </th>
                <th className="TableHeaderfaq">
                date
                </th>
                <th className="TableHeaderfaq">
                action
                </th>
              </tr>
            </thead>
             <tbody>
              {Faqs && Faqs.map((Faq, index) => (
                <tr key={index}>
                  <td  className="DATAfaq">
{Faq.question}                  </td>
                  <td className="DATAfaq">
{Faq.rreponse}                  </td>
                  <td className="DATAfaq">
{Faq.dates} 
                  </td>

                  <td className="DATAfaq" >
                   
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
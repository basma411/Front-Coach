import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoPowerOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/newsletterA.css";
import image from "../../../images/big_image_2.jpg";
import { GetNewletter, DeleteNewletter } from "../../../Redux/Slice/NewsLetterSlice";

const NewsletterA = () => {
  const dispatch = useDispatch();
  const { NewsLetter } = useSelector((state) => state.newsletter);

  useEffect(() => {
    dispatch(GetNewletter());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this newsletter?")) {
      dispatch(DeleteNewletter({ id }));
    }
  };

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
          <IoPowerOutline style={{ fontSize: "35px", fontWeight: "700" }} />
          <h2 style={{ fontSize: "30px" }}>
            Bienvenue sur votre espace administration
          </h2>
        </div>
      </div>
      <div className="ConsultNewsLetter">
        <div className="ConsultNewsLetterContainer">
          <Link to="/admin/Newsletter/emailing">
            <button className="AccueilNewsLetter">Emailing Newsletter</button>
          </Link>
          <table
            className="TableNewsLetter"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Email
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {NewsLetter.map((newsletter, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid gray" }}>
                    {newsletter.email}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <RiDeleteBin6Line
                      style={{ fontSize: "25px", color: "black" }}
                      onClick={() => handleDelete(newsletter._id)}
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

export default NewsletterA;

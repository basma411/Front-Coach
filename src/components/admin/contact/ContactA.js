import React, { useEffect } from "react";

import "./css/contactA.css";
import image from "../../../images/big_image_2.jpg";
import { IoPowerOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import { DeleteContact, GetContact } from "../../../Redux/Slice/ContactSlice";
import { FiSend } from "react-icons/fi";

const ContactA = () => {
  const dispatch = useDispatch();

  const { Contacts } = useSelector((state) => state.contact);
  useEffect(() => {
    dispatch(GetContact());
  }, [dispatch]);
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
    dispatch(DeleteContact({ id }));
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
          <IoPowerOutline style={{ fontSize: "35px", fontWeight: "400" }} />
          <h2 style={{ fontSize: "30px" }}>
            Bienvenue sur votre espace administration
          </h2>
        </div>
      </div>

      <div className="ConsultContact">
        <div className="ConsultContactContainer">
          <table
            className="TableContact"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Nom et Prénom
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Téléphone
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Email
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Data
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Message
                </th>
                <th style={{ border: "1px solid gray", padding: "8px" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Contacts.map((contact, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {contact.nom_prenom}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {contact.tel}
                  </td>

                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {contact.email}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {contact.dates}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    {contact.mssg.substring(0, 100)}
                  </td>
                  <td style={{ border: "1px solid gray", padding: "10px" }}>
                    <div className="IconContact">
                      <Link to={`/admin/Contact/Email/${contact._id}`}>
                        <FiSend style={{ fontSize: "20px", color: "black" }} />
                      </Link>
                      <RiDeleteBin6Line
                        style={{ fontSize: "20px", color: "black" }}
                      onClick={() => handleDelete(contact._id)}
                      />
                    </div>
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

export default ContactA;

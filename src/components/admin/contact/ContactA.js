import React, { useEffect } from "react";

import "./css/contactA.css";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import { DeleteContact, GetContact } from "../../../Redux/Slice/ContactSlice";
import { FiSend } from "react-icons/fi";
import OverlayA from "../OverlayA";

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
     <OverlayA/>

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
                <th  className="TableHeaderContact">
                  Nom et Prénom
                </th>
                <th className="TableHeaderContact">
                  Téléphone
                </th>
                <th className="TableHeaderContact">
                  Email
                </th>
                <th  className="TableHeaderContact">
                  Data
                </th>
                <th  className="TableHeaderContact">
                  Message
                </th>
                <th  className="TableHeaderContact">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Contacts.map((contact, index) => (
                <tr key={index}>
                  <td  className="DataContact">
                    {contact.nom_prenom}
                  </td>
                  <td className="DataContact">
                    {contact.tel}
                  </td>

                  <td className="DataContact">
                    {contact.email}
                  </td>
                  <td className="DataContact">
                    {contact.dates}
                  </td>
                  <td className="DataContact">
                    {contact.mssg.substring(0, 100)}
                  </td>
                  <td className="DataContact">
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

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import BarheaderAdmin from "../BarheaderAdmin";
import NavBarAdmin from "../NavBarAdmin";
import "./css/newsletterA.css";
import { GetNewletter, DeleteNewletter } from "../../../Redux/Slice/NewsLetterSlice";
import OverlayA from "../OverlayA";

const NewsletterA = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { NewsLetter } = useSelector((state) => state.newsletter);

  useEffect(() => {
    dispatch(GetNewletter());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this newsletter?")) {
      dispatch(DeleteNewletter({ id }));
    }
  };
const handeEmail=()=>{
  navigate("/admin/Newsletter/emailing")
}
  return (
    <>
      <BarheaderAdmin />
      <NavBarAdmin />
    <OverlayA/>
      <div className="ConsultNewsLetter">
        <div className="ConsultNewsLetterContainer">
            <button className="EmailingNewsLetter" onClick={()=>handeEmail()}>Emailing Newsletter</button>
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
                <th className="TableHeaderNews">
                  Email
                </th>
                <th className="TableHeaderNews">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {NewsLetter.map((newsletter, index) => (
                <tr key={index}>
                  <td className="DateNews">
                    {newsletter.email}
                  </td>
                  <td  className="DateNews">
                    <RiDeleteBin6Line
                      style={{ fontSize: "18px", color: "black" }}
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

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MdPerson } from "react-icons/md";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { getImageUrl } from "../../index.js";
import logo from "../../images/logo.jpg";
import { GetArticle } from "../../Redux/Slice/ArticleSlice.js";

const PartageArticle = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const art = useSelector((state) =>
    state.article.Articles.find((artic) => artic._id === id)
  );

  useEffect(() => {
    if (!art) {
      dispatch(GetArticle(id)); // Fetch article by ID if not already available in state
    }
  }, [dispatch, id, art]);

  // Default values if art is undefined
  const shareUrl = art ? `https://8ade-41-225-78-122.ngrok-free.app/articles/${art._id}` : "";
  const ogImage = art ? getImageUrl(art.photo) : "";
  const ogTitle = art ? art.titre : "";
  const ogDescription = art ? art.texte : "";

  return (
    <div>
      {art ? (
        <div className="ArticleContai">
          <img src={logo} alt="Article" style={{ width: "180px" }} />
          <hr />
          <img
            src={ogImage}
            alt="Article"
            style={{ display: "block", margin: "0 auto", width: "200px" }}
          />
          <h3 className="ART-titre">{ogTitle}</h3>
          <div
            className="Art-Descrip"
            dangerouslySetInnerHTML={{ __html: ogDescription }}
          />
          <div className="Artc-inf">
            <div className="Artc-author">
              <div style={{ paddingLeft: "30px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <MdPerson className="artic-author-icon" />
                  <h5 className="articl-auteur">{art.auteur}</h5>
                </div>
                <div
                  className="partageArticle"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "20px",
                  }}
                >
                  <div>
                    <FacebookShareButton
                      url={shareUrl}
                      quote={ogTitle}
                      hashtag="#evenement"
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#0965FE",
                          paddingRight: "5px",
                        }}
                      >
                        <FacebookIcon size={20} />
                        <h3 className="info-item">Partage</h3>
                      </div>
                    </FacebookShareButton>
                  </div>
                  <div>
                    <LinkedinShareButton url={shareUrl}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "#0077B5",
                          paddingRight: "5px",
                        }}
                      >
                        <LinkedinIcon size={20} />
                        <h3 className="info-item">Partage</h3>
                      </div>
                    </LinkedinShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Loading...</div> // Show a loading message or spinner while data is being fetched
      )}
    </div>
  );
};

export default PartageArticle;

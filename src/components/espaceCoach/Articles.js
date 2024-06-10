import React, { useEffect, useState } from "react";
import image from "../../images/big_image_2.jpg";
import { useDispatch, useSelector } from "react-redux";
import { GetArticle } from "../../Redux/Slice/ArticleSlice";
import { MdPerson } from "react-icons/md";
import Card from "react-bootstrap/Card";
import "./css/article.css"; 
import Newsletter from "../coach/Newsletter";
import Footer from "../coach/Footer";
import { getImageUrl } from "../..";

const Articles = () => {
  const dispatch = useDispatch();
  const { Articles } = useSelector((state) => state.article); 
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(GetArticle());
  }, [dispatch]);
console.log("article",Articles)
  const pageSize = 6; // Nombre d'articles par page

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, Articles.length); 

  return (
    <>
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
          <h2>Articles</h2>
        </div>
      </div>

      <div className="article-list">
        {Articles.slice(startIndex, endIndex).map((article, index) => (
          <div key={index} className="article-card"> 
            <Card>
              <Card.Img
                variant="top"
                src={getImageUrl(article.photo)}
                />
              <Card.Body>
                <Card.Title className="article-card-title">{article.titre}</Card.Title>
                <Card.Text>
                  <div className="article-card-author"> 
                    <MdPerson className="article-card-author-icon" /> 
                    <h5>{article.auteur}</h5>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {Array.from({ length: Math.ceil(Articles.length / pageSize) }).map(
          (_, index) => (
            <button
              key={index}
              style={{
                width:'20px',
                textAlign:'centre',
                margin: "5px",
                padding: "auto",
                background: index + 1 === currentPage ? "#275491" : "#ddd",
                color: index + 1 === currentPage ? "#fff" : "#000",
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
      <Newsletter/>
      <Footer/>
    </>
  );
};

export default Articles;

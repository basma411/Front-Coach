import React, { useEffect } from 'react'
import image from "../../images/big_image_2.jpg";
import './css/evenement.css'
import { useDispatch, useSelector } from 'react-redux';
import { GetEvenement } from '../../Redux/Slice/EvenementSlice';
import Card from "react-bootstrap/Card";
import { MdPerson } from "react-icons/md";
import { getImageUrl } from '../..';
import Newsletter from '../coach/Newsletter';
import Footer from '../coach/Footer';
import { Link } from 'react-router-dom';

const Evenement = () => {
  const dispatch = useDispatch();

  const { Evenement } = useSelector((state) => state.evenement); 
  useEffect(() => {
    dispatch(GetEvenement());
  }, [dispatch]);
  
  return (
    <>
      <div
        className="ImagePlatformeEvn"
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
          <h2>Évènements</h2>
        </div>
      </div>
      <div className="Evnement">
        <div className="ContainerEvnement">
        <Link to="/Evenement/ajouter">

          <button>Partagez votre évènement</button>
          </Link>
        </div>
        <div className="article-list">
          {Evenement && Evenement.map((Evt, index) => (
            <div key={index} className="article-card"> 
              <Card>
                <Card.Img
                  variant="top"
                  src={getImageUrl(Evt.photo)}
                  width='100px'
                  height="250px"
                />
                <Card.Body>
                  <Card.Title className="article-card-title">{Evt.titre}</Card.Title>
                  <Card.Text>
                    <div className="article-card-author"> 
                      <MdPerson className="article-card-author-icon" /> 
                      <h5>{Evt.dates}</h5>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Newsletter/>
      <Footer/>
    </>
  )
}

export default Evenement;

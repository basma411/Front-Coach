import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { getImageUrl } from "../../index.js";
import logo from "../../images/logo.jpg";
import './css/ListPub.css';
import { GetPublication } from "../../Redux/Slice/PubAtelierSlice.js";

const PartagePub = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const Publi = useSelector((state) =>
    state.pubatelier.pubatelier.find((pub) => pub._id === id)
  );

  useEffect(() => {
    console.log(Publi)
    if (!Publi) {
      dispatch(GetPublication(id)); // Fetch event by ID if not already available in state
    }
  }, [dispatch, id, Publi]);

  const shareUrl = `https://faab-197-1-117-152.ngrok-free.app/atelier/${id}`;

  return (
    <div>
      {
        <div className="BubContai">
          <img src={logo} alt="LOGO" style={{ width: '180px' }} />
          <hr />
          <img src={getImageUrl(Publi.img)} alt="atelier_degustation" style={{ display: "block", margin: "0 auto", width: '300px' }} />
          <h3 className="Bub-titre">{Publi.titre}</h3>
          <div className="Bub-inf">
            <div className='partageBub' style={{ display: "flex", justifyContent: 'center', padding: "20px" }}>
              <div>
                <FacebookShareButton url={shareUrl} quote={Publi.titre} >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0965FE',
                    paddingRight: '5px'
                  }}>
                    <FacebookIcon size={20} />
                    <h3 className='info-item'>Partage</h3>
                  </div>
                </FacebookShareButton>
              </div>
              <div>
                <LinkedinShareButton url={shareUrl}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#0077B5',
                    paddingRight: '5px'
                  }}>
                    <LinkedinIcon size={20} />
                    <h3 className='info-item'>Partage</h3>
                  </div>
                </LinkedinShareButton>
              </div>
            </div>
          </div>
          <hr />
          <div className="Bub-Descrip" dangerouslySetInnerHTML={{ __html: Publi.texte }} />
        </div>
   }
    </div>
  );
}

export default PartagePub;

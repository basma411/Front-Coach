import React from 'react'
import image from '../../images/big_image_2.jpg'

const Atelier_Degustation = () => {
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
          <h2>Les Ateliers Dégustation <br/>Coaching</h2>
        </div>
      </div>
</>
  )
}

export default Atelier_Degustation
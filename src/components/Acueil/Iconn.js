import React, { useEffect } from 'react'
import { GetIcon } from '../../Redux/Slice/IconSlice';
import { useDispatch, useSelector } from 'react-redux';
import './css/icon.css'
const Iconn = () => {
    const dispatch = useDispatch();
    const { Icon } = useSelector((state) => state.icon);
  
    useEffect(() => {
      dispatch(GetIcon());
    }, [dispatch]);
    console.log(Icon)
  return (
    <div className="grid-container">
    {Icon && Icon.map((icon, index) => (
      <div key={index} className="grid-item">
        <div className="subgrid-item">
            <img src={`http://localhost:8000/${icon.image}`}  alt={`icon ${index + 1}`} width={'100px'}/>
            <h2>{icon.Titre}</h2>
  <p>{icon.Texte.substring(0, 100)}...</p>
            <h3>Afficher la suite...</h3>

        </div>
      </div>
    ))}
  </div>
  )
}

export default Iconn
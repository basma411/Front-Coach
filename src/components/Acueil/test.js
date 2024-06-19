import React, { useEffect } from 'react';
import { GetAtelier } from '../../Redux/Slice/AtelierSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getImageUrl } from '../..';

const FormAtelier = () => {
  const dispatch = useDispatch();

  const { ateliers } = useSelector((state) => state.atelier);

  useEffect(() => {
    dispatch(GetAtelier());
  }, [dispatch]);

  // Find the last atelier
  const lastAtelier = ateliers.length > 0 ? ateliers[ateliers.length - 1] : null;

  return (
    <div>
      {lastAtelier ? (
        <div>
        <img           src={getImageUrl(lastAtelier.photo)}
 alt="atelier" width={'100px'}/>

          <p>{`Théme ${lastAtelier.num}`}</p>
          <p> {lastAtelier.titre}</p>
          <p> {lastAtelier.date}</p>
          <p> {lastAtelier.heure}</p>


        </div>
      ) : (
        <p>No ateliers available.</p>
      )}
    </div>
  );
}

export default FormAtelier;

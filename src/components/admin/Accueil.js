import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Accueil = () => {
  const {isAuth}=useSelector((state)=>state.admin)
  const navigator=useNavigate()
  useEffect(() => {
    if (!isAuth) navigator('/admin/login');
  }, [isAuth, navigator]);
  return (
    <div>Accueil</div>
  )
}

export default Accueil
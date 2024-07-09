import React from 'react'
import "./css/menu.css"
import { useNavigate } from 'react-router-dom';
const Menu = () => {
    const navigator=useNavigate()

    const handleLogout = () => {
        navigator("/admin/login")
         };
         const handleCoach = () => {
            navigator("/coach/login")
             };
  return (
    <div className="MenuA {
">
    <div className="containeMenu">
    <h3 className='AdminT'>Admin</h3>
<div style={{display:'flex',flexDirection:'column', width:'50%',margin:'0 auto' ,gap:"5px"}}>
<h3 className='ButtonMenu' onClick={handleCoach}>espace coach</h3>
<h3 className='ButtonMenu' onClick={handleLogout}>Deconnection</h3>
</div>

    </div>
  </div>  )
}

export default Menu
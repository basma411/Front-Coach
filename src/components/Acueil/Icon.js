import React, { useEffect, useState } from 'react';
import { GetIcon } from '../../Redux/Slice/IconSlice';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import './css/icon.css';

const Icon = () => {
    const dispatch = useDispatch();
    const { Icon } = useSelector((state) => state.icon);
    const [openDialog, setOpenDialog] = useState(false); // État pour suivre l'ouverture de la boîte de dialogue
    const [selectedIcon, setSelectedIcon] = useState(null); // État pour stocker l'icône sélectionnée

    useEffect(() => {
        dispatch(GetIcon());
    }, [dispatch]);

    const handleOpenDialog = (icon) => {
        setSelectedIcon(icon); // Stocke l'icône sélectionnée dans l'état
        setOpenDialog(true); // Ouvre la boîte de dialogue
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Ferme la boîte de dialogue
    };

    return (
      <div className='Icon'>
          <div className="grid-container">
            {Icon && Icon.map((icon, index) => (
                <div key={index} className="grid-item">
                    <div className="subgrid-item">
                        <img src={`http://localhost:8000/${icon.image}`} alt={`icon ${index + 1}`} className='ImgIcon' />
                        <h2>{icon.Titre}</h2>
                        <p>{icon.Texte.substring(0, 100)}...</p>
                        <h3 onClick={() => handleOpenDialog(icon)}>Afficher la suite...</h3> {/* Ouvre la boîte de dialogue */}
                    </div>
                </div>
            ))}
            {/* Boîte de dialogue */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
    <div style={{ textAlign: 'center' }}>
        <img src={`http://localhost:8000/${selectedIcon && selectedIcon.image}`} alt={selectedIcon && selectedIcon.Titre} style={{ width: '100px',textAlign:'center' }} />
    </div>
    <DialogTitle style={{ textAlign: 'left',fontSize:'30px',fontWeight:'400' }}>{selectedIcon && selectedIcon.Titre}</DialogTitle>
<DialogTitle style={{ textAlign: 'left',fontSize:'20px',fontWeight:'400',color:'gray' }}>    <p>{selectedIcon && selectedIcon.Texte}</p>
</DialogTitle>
</Dialog>

        </div>
      </div>
    );
}

export default Icon;

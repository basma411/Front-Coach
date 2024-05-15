import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetIcon } from '../../../Redux/Slice/IconSlice';
import { useParams } from 'react-router-dom';

const Edit = () => {
    const dispatch = useDispatch();
    const { id } = useParams(); // Récupère l'ID de l'URL

    const { Icon } = useSelector((state) => state.icon);
    useEffect(() => {
        dispatch(GetIcon());
    }, [dispatch]);

    const [formData, setFormData] = useState({}); // State to hold form data

    // Update form data when Icon changes
    useEffect(() => {
        // Filter the icon data based on the ID
        const iconToEdit = Icon.find(icon => icon._id === id);
        if (iconToEdit) {
            setFormData(iconToEdit); // Initialize form data with Icon values
        }
    }, [Icon, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Update the corresponding field in form data
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Dispatch action to update Icon with formData
        // Example: dispatch(updateIcon(formData));
    };

    return (
        <div className='editIcon'>
            <div className='containerIcon'>
                <form onSubmit={handleSubmit}>
                    <label>Titre</label>
                    <input type='text' name='Titre' defaultValue={formData.Titre || ''} onChange={handleChange} />

                    <label>Texte</label>
                    <input type='text' name='Texte' defaultValue={formData.Texte || ''} onChange={handleChange} />

                    <label>Icone</label>
                    <img src={`http://localhost:8000/${formData.image}`} />
                    <button type='submit'>Modifier</button>
                </form>
            </div>
        </div>
    );
};

export default Edit;

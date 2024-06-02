import React, { useRef, useState, useEffect } from 'react';
import image from '../../../images/big_image_2.jpg';
import { IoPowerOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './css/editEvenement.css';
import { GetEvenement, putEvenement } from '../../../Redux/Slice/EvenementSlice';
import loadingGif from './../../../images/loading.gif';

const EditEvenement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { Evenement } = useSelector((state) => state.evenement);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        titre: '',
        texte: '',
        lien: '',
        lieu: '',
        dates: '',
        photo: ''
    });
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        setEditorLoaded(true);
        dispatch(GetEvenement());
    }, [dispatch]);

    useEffect(() => {
        if (Evenement && id) {
            const EvenementEdit = Evenement.find(EVT => EVT._id === id);
            if (EvenementEdit) {
                setFormData(EvenementEdit);
            }
        }
    }, [Evenement, id]);

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleEditorChange = (event, editor, name) => {
        const data = editor.getData();
        setFormData(prevData => ({
            ...prevData,
            [name]: data,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('titre', formData.titre);
        formDataToSend.append('texte', formData.texte);
        formDataToSend.append('lien', formData.lien);
        formDataToSend.append('lieu', formData.lieu);
        formDataToSend.append('dates', formData.dates);
        
        // Ajoutez l'image seulement si une nouvelle image a été sélectionnée
        if (image) {
            formDataToSend.append('photo', image);
        }

        // Dispatch the action with the formData
        dispatch(putEvenement({ id, data: formDataToSend }));
        navigate('/admin/Evenements/liste');
    };

    if (!editorLoaded) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <img src={loadingGif} alt="Chargement..." />
            </div>
        );
    }

    return (
        <div className='edit-Article'>
            <div className='FormContainer'>
                <form onSubmit={handleSubmit} className='container-Edit-Article '>
                    <div>
                        <label>Titre</label>
                        <input
                            className='TitleArticle'
                            type='text'
                            name='titre'
                            value={formData.titre}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Texte</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={formData.texte || ''}
                            onChange={(event, editor) => handleEditorChange(event, editor, 'texte')}
                            config={{
                                toolbar: ['bold', 'italic', '|', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', '|', 'link', 'unlink'],
                                language: 'en',
                            }}
                        />
                    </div>
                    <div>
                        <label>Lien</label>
                        <input
                            className='LienArticle'
                            type='text'
                            name='lien'
                            value={formData.lien}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Lieu</label>
                        <input
                            className='AuteurArticle'
                            type='text'
                            name='lieu'
                            value={formData.lieu}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Date</label>
                        <input
                            className='AuteurArticle'
                            type='text'
                            name='dates'
                            value={formData.dates}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group-Article">
                        <label>Image</label>
                        <input type="file" name="photo" onChange={handleFileChange} style={{margin:"20px 0", display:'block',}}/>
                        {formData.photo && !image && <img src={`http://localhost:8000/${formData.photo}`} alt="Icone" className='imageEdit-Article' />}
                    </div>
                    <div className='Bouton-Edit-Article'>
                        <button type="submit" className='btn btn-primary edit-modifier-Article'>Modifier</button>
                        <button type="button" className='btn btn-secondary' onClick={() => navigate('/admin/Accueil')}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEvenement;

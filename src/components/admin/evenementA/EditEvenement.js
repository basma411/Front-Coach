import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import './css/editEvenement.css';
import { GetEvenement, putEvenement } from '../../../Redux/Slice/EvenementSlice';
import loadingGif from './../../../images/loading.gif';
import { getImageUrl } from '../../../index.js';

const EditEvenement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const editorRef = useRef(null);

    const { Evenement } = useSelector((state) => state.evenement);
    const [image, setImage] = useState(null);
    const [Texte, settexte] = useState(null)

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
    useEffect(() => {
        if (formData.texte) {
            settexte(formData.texte);
        }
    }, [formData.texte]);
    
    useEffect(() => {
        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleEditorChange = (content, editor, name) => {
        settexte(content);
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
        formDataToSend.append('texte', Texte);
        formDataToSend.append('lien', formData.lien);
        formDataToSend.append('lieu', formData.lieu);
        formDataToSend.append('dates', formData.dates);
        
        if (image) {
            formDataToSend.append('photo', image);
        }

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
        <div className='edit-Evenement'>
            <div className='FormContainerEvenement'>
                <form onSubmit={handleSubmit} className='container-Edit-Evenement'>
                    <div>
                        <label>Titre</label>
                        <input
                            className='TitreEvenement'
                            type='text'
                            name='titre'
                            value={formData.titre}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Texte</label>
                        <Editor
  apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
  onInit={(evt, editor) => {
                                editorRef.current = editor;
                                editor.setContent(formData.texte);
                            }}
                            initialValue={formData.texte} // Assurez-vous que cette ligne est utilisée pour initialiser également
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                ],
                                toolbar: 'undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                setup: (editor) => {
                                    editor.on('change', () => handleEditorChange(editor.getContent()));
                                }
                            }}
                        />
                     
                    </div>
                    <div>
                        <label>Lien</label>
                        <input
                            className='LienEvenement'
                            type='text'
                            name='lien'
                            value={formData.lien}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Lieu</label>
                        <input
                            className='LieuEvenement'
                            type='text'
                            name='lieu'
                            value={formData.lieu}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Date</label>
                        <input
                            className='LienEvenement'
                            type='text'
                            name='dates'
                            value={formData.dates}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group-Article">
                        <label>Image</label>
                        <input type="file" name="photo" onChange={handleFileChange} style={{margin:"20px 0", display:'block',}}/>
                        {formData.photo && !image && <img src={getImageUrl(formData.photo)} alt="Icone" className='imageEdit-Article' />}
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

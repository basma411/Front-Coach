import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './css/editinterface.css';
import { fetchInterface, putInterface } from '../../../Redux/Slice/InterfaceSlice';
import loadingGif from './../../../images/loading.gif';
import { getImageUrl } from '../../../index.js';

const EditInterface = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { interfaceData } = useSelector((state) => state.interface);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        titre: '',
        texte: '',
        page: '',
        lien: '',
        image: ''
    });
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        setEditorLoaded(true);
        dispatch(fetchInterface());
    }, [dispatch]);

    useEffect(() => {
        if (interfaceData && id) {
            const InterEdit = interfaceData.find(inter => inter._id === id);
            if (InterEdit) {
                setFormData(InterEdit);
            }
        }
    }, [interfaceData, id]);

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
        formDataToSend.append('page', formData.page);
        formDataToSend.append('lien', formData.lien);
        
        if (image) {
            formDataToSend.append('image', image);
        }

        dispatch(putInterface({ id, data: formDataToSend }))
            .then(response => {
                console.log('Success:', response);
                navigate('/admin/consulter_interface');
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
                        <CKEditor
                            editor={ClassicEditor}
                            data={formData.titre || ''}
                            onChange={(event, editor) => handleEditorChange(event, editor, 'titre')}
                            config={{
                                toolbar: ['bold', 'italic', '|', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', '|', 'link', 'unlink'],
                                language: 'en',
                                styles: [
                                    {
                                        name: 'Custom Style',
                                        element: 'p',
                                        styles: {
                                            color: '#000'
                                        }
                                    }
                                ]
                            }}
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
                                styles: [
                                    {
                                        name: 'Custom Style',
                                        element: 'p',
                                        styles: {
                                            color: '#000'
                                        }
                                    }
                                ]
                            }}
                        />
                    </div>
                    <div>
                        <label>Page</label>
                        <textarea
                            className='LienEvenement'
                            type='text'
                            name='page'
                            value={formData.page}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Lien</label>
                        <textarea
                            className='LieuEvenement'
                            type='text'
                            name='lien'
                            value={formData.lien}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group-Article">
                        <label>Image</label>
                        <input type="file" name="image" onChange={handleFileChange} style={{ margin: "20px 0", display: 'block' }} />
                        {formData.image && !image && <img src={getImageUrl(formData.image)} alt="Icone" className='imageEdit-Article' />}
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

export default EditInterface;

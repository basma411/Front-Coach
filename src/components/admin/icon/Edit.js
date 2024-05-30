import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetIcon, PutIcon } from '../../../Redux/Slice/IconSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import loadingGif from './../../../images/loading.gif'

import './css/edit.css';

const Edit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { Icon } = useSelector((state) => state.icon);
    const [formData, setFormData] = useState({
        Titre: '',
        Texte: '',
        image: ''
    });
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
   dispatch(GetIcon());
            setEditorLoaded(true);
      
    }, [dispatch]);

    useEffect(() => {
        if (Icon && id) {
            const iconToEdit = Icon.find(icon => icon._id === id);
            if (iconToEdit) {
                setFormData(iconToEdit);
            }
        }
    }, [Icon, id]);

    const handleEditorChange = (event, editor, name) => {
        const data = editor.getData().replace(/<\/?p>|<\/?strong>/g, ' ').trim();
        setFormData(prevData => ({
            ...prevData,
            [name]: data,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id && formData) {
            dispatch(PutIcon({ id, data: formData }));
            navigate('/admin/Accueil');
        }
    };

    if (!editorLoaded) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <img src={loadingGif} alt="Chargement..." />
            </div>
        );
    }

    return (
        <div className='edit-Icon'>
            <div className='container-Edit-Icon'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Titre</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={formData.Titre || ''}
                            onChange={(event, editor) => handleEditorChange(event, editor, 'Titre')}
                            config={{
                                toolbar: ['bold', 'italic', '|', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', '|', 'link', 'unlink', 'language'],
                                language: 'en',
                            }}
                        />
                    </div>

                    <div>
                        <label>Texte</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={formData.Texte || ''}
                            onChange={(event, editor) => handleEditorChange(event, editor, 'Texte')}
                            config={{
                                toolbar: ['bold', 'italic', '|', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', '|', 'link', 'unlink', 'language'],
                                language: 'en',
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Icone</label>
                        {formData.image && <img src={`http://localhost:8000/${formData.image}`} alt="Icone" className='imageEdit' />}
                    </div>

                    <div className='Bouton-Edit'>
                        <button type="submit" className='btn btn-primary edit-modifier'>Modifier</button>
                        <button type="button" className='btn btn-secondary' onClick={() => navigate('/admin/Accueil')}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
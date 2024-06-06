import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './CSS/editslider.css';
import { GetSlides, PutSlider } from '../../../Redux/Slice/SlidesSlice';
import loadingGif from './../../../images/loading.gif';
import { getImageUrl } from '../../..';

const EditSlider = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { Slide } = useSelector((state) => state.slide);
    const [formData, setFormData] = useState({
        titre1: '',
        titre2: '',
        photo: ''
    });
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        setEditorLoaded(true);
        dispatch(GetSlides());
    }, [dispatch]);

    useEffect(() => {
        if (Slide && id) {
            const SlideToEdit = Slide.find(slide => slide._id === id);
            if (SlideToEdit) {
                setFormData({
                    titre1: SlideToEdit.titre1,
                    titre2: SlideToEdit.titre2,
                    photo: SlideToEdit.photo
                });
            }
        }
    }, [Slide, id]);

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
        const { titre1, titre2 } = formData;

        if (id) {
            dispatch(PutSlider({ id, data: { titre1, titre2 } }));
            navigate('/admin/editer_slider');
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
        <div className='edit-Article'>
            <div className='FormContainer'>
                <form onSubmit={handleSubmit} className='container-Edit-Article '>
                    <div>
                        <label>Titre1</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={formData.titre1 || ''}
                            onChange={(event, editor) => handleEditorChange(event, editor, 'titre1')}
                            config={{
                                toolbar: ['bold', 'italic', '|', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', '|', 'link', 'unlink'],
                                language: 'en',
                            }}
                        />
                    </div>
                    <div>
                        <label>Titre2</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={formData.titre2 || ''}
                            onChange={(event, editor) => handleEditorChange(event, editor, 'titre2')}
                            config={{
                                toolbar: ['bold', 'italic', '|', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', '|', 'link', 'unlink'],
                                language: 'en',
                            }}
                        />
                    </div>

                    <div className="form-group-Article">
                        <label>Image</label>
                        {formData.photo && (
                            <img
                                src={getImageUrl(formData.photo)}
                                alt="Icone"
                                className='imageEdit-Article'
                            />
                        )}
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

export default EditSlider;

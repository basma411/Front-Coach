import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import './CSS/editslider.css';
import { GetSlides, PutSlider } from '../../../Redux/Slice/SlidesSlice';
import loadingGif from './../../../images/loading.gif';
import { getImageUrl } from '../../..';

const EditSlider = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const editorRef1 = useRef(null);
    const editorRef2 = useRef(null);

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

    const handleTitre1Change = (content) => {
        setFormData(prevData => ({
            ...prevData,
            titre1: content
        }));
    };

    const handleTitre2Change = (content) => {
        setFormData(prevData => ({
            ...prevData,
            titre2: content
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(PutSlider({ id, data: formData }));
        navigate('/admin/editer_slider');
    };

    useEffect(() => {
        return () => {
            if (editorRef1.current) {
                editorRef1.current.destroy();
                editorRef1.current = null;
            }
            if (editorRef2.current) {
                editorRef2.current.destroy();
                editorRef2.current = null;
            }
        };
    }, []);

    if (!editorLoaded) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <img src={loadingGif} alt="Chargement..." />
            </div>
        );
    }

    return (
        <div className='edit-Slider'>
            <div className='EditContainerSlider'>
                <form onSubmit={handleSubmit}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <label className='LabelEditSlider'>Titre1</label>
                        <Editor
                            apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
                            onInit={(evt, editor) => {
                                editorRef1.current = editor;
                                editor.setContent(formData.titre1);
                            }}
                            initialValue={formData.titre1}
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
                                    editor.on('change', () => handleTitre1Change(editor.getContent()));
                                }
                            }}
                        />
                    </div>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <label className='LabelEditSlider'>Titre2</label>
                        <Editor
                            apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
                            onInit={(evt, editor) => {
                                editorRef2.current = editor;
                                editor.setContent(formData.titre2);
                            }}
                            initialValue={formData.titre2}
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
                                    editor.on('change', () => handleTitre2Change(editor.getContent()));
                                }
                            }}
                        />
                    </div>

                    <div className="form-group-Article">
                        <label className='LabelEditSlider'>Image</label>
                        {formData.photo && (
                            <img
                                src={getImageUrl(formData.photo)}
                                alt="Icone"
                                className='imageEdit-Article'
                            />
                        )}
                    </div>
                    <div className='buttonsContainer'>
                        <button type="submit" className='btnEditSlider'>Modifier</button>
                        <button type="button" className='btnAnnuleSlider' onClick={() => navigate('/admin/Accueil')}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSlider;

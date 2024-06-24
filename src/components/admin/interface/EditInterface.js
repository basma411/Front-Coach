import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import './css/editinterface.css';
import { fetchInterface, putInterface } from '../../../Redux/Slice/InterfaceSlice';
import loadingGif from './../../../images/loading.gif';
import { getImageUrl } from '../../../index.js';
import { Editor } from '@tinymce/tinymce-react';

const EditInterface = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const editorRef1 = useRef();
    const editorRef2 = useRef();

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

    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleEditorChange = (content, editor, name) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: content
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
                        <Editor
                            apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
                            onInit={(evt, editor) => {
                                editorRef1.current = editor;
                                editor.setContent(formData.titre);
                            }}
                            initialValue={formData.titre}
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
                                    editor.on('change', () => handleEditorChange(editor.getContent(), editor, 'titre'));
                                }
                            }}
                        />
                    </div>
                    <div>
                        <label>Texte</label>
                        <Editor
                            apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
                            onInit={(evt, editor) => {
                                editorRef2.current = editor;
                                editor.setContent(formData.texte);
                            }}
                            initialValue={formData.texte}
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
                                    editor.on('change', () => handleEditorChange(editor.getContent(), editor, 'texte'));
                                }
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

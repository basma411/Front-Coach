import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import BarheaderAdmin from '../BarheaderAdmin.js';
import NavBarAdmin from '../NavBarAdmin.js';
import image from '../../../images/big_image_2.jpg';
import { IoPowerOutline } from 'react-icons/io5';
import './css/addatelier.css';
import { AddPublic } from '../../../Redux/Slice/PubAtelierSlice.js';

const AddPublication = () => {
    const [titre, setTitre] = useState('');
    const [texte, setTexte] = useState('');
    const [photo, setPhoto] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const editorRef = useRef(null);
    const { id } = useParams();

    useEffect(() => {
        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);

    const handleTitreChange = (e) => {
        setTitre(e.target.value);
    };

    const handleEditorChange = (content) => {
        setTexte(content);
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('titre', titre);
        formDataToSend.append('texte', texte);
        formDataToSend.append('img', photo);

        dispatch(AddPublic({ id, data: formDataToSend }))
            navigate('/admin/atelier-A')
        
    };

    return (
        <>
            <BarheaderAdmin />
            <NavBarAdmin />
            <div className="ImagePlatforme" style={{ backgroundImage: `url(${image})` }}>
                <div>
                    <IoPowerOutline />
                    <h2>Bienvenue sur votre espace administration</h2>
                </div>
            </div>
            <div className="addAtelier">
                <form onSubmit={handleSubmit} className="addAtelierContainer">
                    <div>
                        <label className='LabelAtelier'>Titre:</label>
                        <input type="text" value={titre} onChange={handleTitreChange} required />
                    </div>
                    <div>
                        <label className='LabelAtelier'>Texte:</label>
                        <Editor
                            apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
                            onInit={(evt, editor) => {
                                editorRef.current = editor;
                                editor.setContent(texte);
                            }}
                            initialValue={texte}
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
                        <label className='LabelAtelier'>Photo:</label>
                        <input type="file" onChange={handlePhotoChange} required />
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <button type="submit">Ajouter</button>
                        <button type="button" onClick={() => navigate("/admin/atelier-A")}>Annuler</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddPublication;

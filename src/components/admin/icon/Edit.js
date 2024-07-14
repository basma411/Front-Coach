import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetIcon, PutIcon } from '../../../Redux/Slice/IconSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import loadingGif from './../../../images/loading.gif';
import './css/edit.css';
import { getImageUrl } from '../../..';

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
        setEditorLoaded(true);
        dispatch(GetIcon());
    }, [dispatch]);

    useEffect(() => {
        if (Icon && id) {
            const iconToEdit = Icon.find(icon => icon._id === id);
            if (iconToEdit) {
                setFormData(iconToEdit);
            }
        }
    }, [Icon, id]);

    const handleEditorChange = (content, editor) => {
        setFormData(prevData => ({
            ...prevData,
            Texte: content
        }));
    };

    const handleTitreChange = (content, editor) => {
        setFormData(prevData => ({
            ...prevData,
            Titre: content
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = { Titre: formData.Titre, Texte: formData.Texte };
        dispatch(PutIcon({ id, data: formDataToSend }));
        navigate('/admin/consulter_icon');
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
                        <label className='LabelEditIcon'>Titre</label>
                        <Editor
                            apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8" // Replace with your TinyMCE API Key
                            initialValue={formData.Titre}
                            init={{
                                height: 500,
                                menubar: true,
                                plugins: [
                                    'advlist autolink  lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                            }}
                            value={formData.Titre}
                            onEditorChange={handleTitreChange}
                        />
                    </div>

                    <div>
                        <label className='LabelEditIcon'>Texte</label>
                        <Editor
                            apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8" // Replace with your TinyMCE API Key
                            initialValue={formData.Texte}
                            init={{
                                height: 500,
                                width:500,
                                menubar: true,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar:
                                    'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                            }}
                            value={formData.Texte}
                            onEditorChange={handleEditorChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className='LabelEditIcon'>Icone</label>
                        {formData.image && <img src={getImageUrl(formData.image)} alt="Icone" className='imageEdit' />}
                    </div>

                    <div className='buttonsContainer'>
                        <button type="submit" className='btnEditIcon'>Modifier</button>
                        <button type="button" className='btnAnnulIcon' onClick={() => navigate('/admin/Accueil')}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;

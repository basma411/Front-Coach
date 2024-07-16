import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import loadingGif from './../../../images/loading.gif';
import './css/editPub.css';
import { getImageUrl } from '../../..';
import { GetPublication, PutPublic } from '../../../Redux/Slice/PubAtelierSlice';

const EditPub = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { pubatelier } = useSelector((state) => state.pubatelier);
    const [formData, setFormData] = useState({
        Titre: '',
        Texte: '',
        img: ''
    });
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        setEditorLoaded(true);
        dispatch(GetPublication(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (pubatelier && id) {
            const pubToEdit = pubatelier.find(pub => pub._id === id);
            if (pubToEdit) {
                setFormData(pubToEdit);
            }
        }
    }, [pubatelier, id]);

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
        const formDataToSend = { titre: formData.Titre, texte: formData.Texte };
        dispatch(PutPublic({ id, data: formDataToSend }))
            .then(() => {
                navigate('/admin/atelier-A');
                console.log(formDataToSend)

            })
            .catch((error) => {
                console.error('Failed to update publication:', error);
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
        <div className='edit-Pub'>
            <div className='container-Edit-Pub'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='LabelEditPub'>Titre</label>
                        <Editor
                            apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
                            initialValue={formData.titre}
                            init={{
                                height: 500,
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
                            value={formData.Titre}
                            onEditorChange={handleTitreChange}
                        />
                    </div>

                    <div>
                        <label className='LabelEditPub'>Texte</label>
                        <Editor
                            apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
                            initialValue={formData.texte}
                            init={{
                                height: 500,
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
                        <label className='LabelEditPub'>Image</label>
                        {formData.img && <img src={getImageUrl(formData.img)} alt="Pub" className='imageEdit' />}
                    </div>

                    <div className='buttonsContainer'>
                        <button type="submit" className='btnEditPub'>Modifier</button>
                        <button type="button" className='btnAnnulPub' onClick={() => navigate('/admin/Accueil')}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPub;

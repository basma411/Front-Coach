import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './css/editvideo.css';
import loadingGif from './../../../images/loading.gif';
import { getImageUrl } from '../../../index.js';
import { Getvideo, putvideo } from '../../../Redux/Slice/videoSlice.js';

const Editvideo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { video } = useSelector((state) => state.video);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState({
        titre: '',
        lien: '',
      
    });
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        setEditorLoaded(true);
        dispatch(Getvideo());
    }, [dispatch]);

    useEffect(() => {
        if (video && id) {
            const videoEdit = video.find(video => video._id === id);
            if (videoEdit) {
                setFormData(videoEdit);
            }
        }
    }, [video, id]);

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
        formDataToSend.append('lien', formData.lien);
     
        
        if (image) {
            formDataToSend.append('images', image);
        }

        dispatch(putvideo({ id, data: formDataToSend }));
        navigate('/admin/videoCoching');
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
    onChange={(event, editor) => handleEditorChange(event, editor, 'texte')}
    config={{
        toolbar: ['bold', 'italic', '|', 'numberedList', 'bulletedList', '|', 'outdent', 'indent', '|', 'link', 'unlink'],
        language: 'en',
        // styles: [
        //     {
        //         name: 'Custom Style',
        //         element: 'p',
        //         styles: {
        //             color: '#000' 
        //         }
        //     }
        // ]
    }}
/>
                        
                    </div>
                    <div>
                        <label>Lien</label>

                        <textarea
                            className='TitreEvenement'
                            type='text'
                            name='lien'
                            value={formData.lien}
                            onChange={handleInputChange}
                        />
                    </div>
                 
                  
                 
                    <div className="form-group-Article">
                        <label>Image</label>
                        <input type="file" name="images" onChange={handleFileChange} style={{margin:"20px 0", display:'block',}}/>
                        {formData.images && !image && <img src={getImageUrl(formData.images)} alt="Icone" className='imageEdit-Article' />}
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


export default Editvideo
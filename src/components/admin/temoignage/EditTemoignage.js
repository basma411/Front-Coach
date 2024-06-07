import { useDispatch, useSelector } from 'react-redux';
import { GetIcon } from '../../../Redux/Slice/IconSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './css/editTemoignage.css';
import { GetArticle, PutArticle } from '../../../Redux/Slice/ArticleSlice';
import { useEffect, useState } from 'react';
import loadingGif from './../../../images/loading.gif'
import { getImageUrl } from '../../..';
import { GetTemoignageV, PutTemoignagesV } from '../../../Redux/Slice/TemoignegeSlice';
const EditTemoignage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { TemoignegeV } = useSelector((state) => state.temoignage);
  
        const [formData, setFormData] = useState({
        nom: '',
        texte: '',
        Date: '',
    });
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        setEditorLoaded(true);

             dispatch(GetTemoignageV());
     
    }, [dispatch]);

    useEffect(() => {
        if (TemoignegeV && id) {
            const TemoignegeVEdit = TemoignegeV.find(T_V => T_V._id === id);
            if (TemoignegeVEdit) {
                setFormData(TemoignegeVEdit);
            }
        }
    }, [TemoignegeV, id]);

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
        if (id && formData) {
            dispatch(PutTemoignagesV({ id, data: formData }));
            navigate('/admin/témoignages/visible');
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
                        <label>Nom</label>
                        <input
                            className='TitleArticle'
                            type='text'
                            name='nom'
                            value={formData.nom}
                            onChange={handleInputChange}
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
                            }}
                        />
                    </div>
                   
                    <div>
                        <label>Date</label>
                        <input
                            className='AuteurArticle'
                            type='text'
                            name='auteur'
                            value={formData.Date}
                            onChange={handleInputChange}
                        />
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


export default EditTemoignage
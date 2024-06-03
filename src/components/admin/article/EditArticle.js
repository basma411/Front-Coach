import { useDispatch, useSelector } from 'react-redux';
import { GetIcon } from '../../../Redux/Slice/IconSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './css/editArticle.css';
import { GetArticle, PutArticle } from '../../../Redux/Slice/ArticleSlice';
import { useEffect, useState } from 'react';
import loadingGif from './../../../images/loading.gif'
import { getImageUrl } from '../../..';
const EditArticle = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { Articles } = useSelector((state) => state.article);
    const [formData, setFormData] = useState({
        titre: '',
        texte: '',
        lien: '',
        auteur: '',
        photo: ''
    });
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        setEditorLoaded(true);

             dispatch(GetArticle());
     
    }, [dispatch]);

    useEffect(() => {
        if (Articles && id) {
            const ArticlesEdit = Articles.find(article => article._id === id);
            if (ArticlesEdit) {
                setFormData(ArticlesEdit);
            }
        }
    }, [Articles, id]);

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
            dispatch(PutArticle({ id, data: formData }));
            navigate('/admin/article/visible');
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
                        <label>Titre</label>
                        <input
                            className='TitleArticle'
                            type='text'
                            name='titre'
                            value={formData.titre}
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
                        <label>Lien</label>
                        <input
                            className='LienArticle'
                            type='text'
                            name='lien'
                            value={formData.lien}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label>Auteur</label>
                        <input
                            className='AuteurArticle'
                            type='text'
                            name='auteur'
                            value={formData.auteur}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group-Article">
                        <label>Image</label>
                        {formData.photo && <img    src={getImageUrl(formData.photo)}
 alt="Icone" className='imageEdit-Article' />}
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

export default EditArticle;
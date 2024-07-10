import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import './css/editArticle.css';
import { GetArticle, PutArticle } from '../../../Redux/Slice/ArticleSlice';
import { useEffect, useState, useRef } from 'react';
import loadingGif from './../../../images/loading.gif';
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
    const editorRef = useRef(null);

    useEffect(() => {
        dispatch(GetArticle());
    }, [dispatch]);

    useEffect(() => {
        if (Articles && id) {
            const articleToEdit = Articles.find(article => article._id === id);
            if (articleToEdit) {
                setFormData(articleToEdit);
            }
        }
    }, [Articles, id]);

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    const handleEditorChange = (content) => {
        setFormData(prevData => ({
            ...prevData,
            texte: content
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
        dispatch(PutArticle({ id, data: formData }));
        navigate('/admin/article/visible');
    };

    useEffect(() => {
        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
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
        <div className='edit-Article'>
            <div className='FormContainer'>
                <form onSubmit={handleSubmit} >
                    <div className='FormContainerItem'>
                        <label className='labelEdit'>Titre</label>
                        <input
                            className='inputView'
                            type='text'
                            name='titre'
                            value={formData.titre}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='FormContainerItem'>
                        <label className='labelEdit'>Texte</label>
                        <Editor
  apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
  onInit={(evt, editor) => {
                                editorRef.current = editor;
                                editor.setContent(formData.texte);
                            }}
                            initialValue={formData.texte} // Assurez-vous que cette ligne est utilisée pour initialiser également
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
                    <div className='FormContainerItem'>
                        <label className='labelEdit'>Lien</label>
                        <input
                            className='inputView'
                            type='text'
                            name='lien'
                            value={formData.lien}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className='FormContainerItem'>
                        <label className='labelEdit'>Auteur</label>
                        <input
                            className='inputView'
                            type='text'
                            name='auteur'
                            value={formData.auteur}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group-Article">
                        <label className='labelEdit'>Image</label>
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

export default EditArticle;

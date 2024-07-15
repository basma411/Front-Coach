import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import './css/editTemoignage.css';
import { useEffect, useRef, useState } from 'react';
import loadingGif from './../../../images/loading.gif'
import { GetTemoignageV, PutTemoignagesV } from '../../../Redux/Slice/TemoignegeSlice';
const EditTemoignage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const editorRef = useRef(null);

    const { TemoignegeV } = useSelector((state) => state.temoignage);
    const [Texte, settexte] = useState()

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
    useEffect(() => {
        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, []);
    const handleEditorChange = (content, editor, name) => {
        settexte(content);
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
        formDataToSend.append('nom', formData.nom);
        formDataToSend.append('texte', Texte); 
    
        dispatch(PutTemoignagesV({ id, data:{nom:formData.nom,texte:Texte} }));
        console.log(Texte)
        navigate('/admin/témoignages/visible');
    };
    
    if (!editorLoaded) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <img src={loadingGif} alt="Chargement..." />
            </div>
        );
    }
    return (
        <div className='edit-Tem'>
            <div className='FormTemContainer'>
              <form onSubmit={handleSubmit} >
                    <div style={{display:"flex",flexDirection:"column"}}>
                        <label className='labelEditTem'>Nom</label>
                        <input
                            className='inputEditTem'
                            type='text'
                            name='nom'
                            value={formData.nom}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div style={{display:"flex",flexDirection:"column"}}>
                        <label className='labelEditTem'>Texte</label>
                        <Editor
    apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
    onInit={(evt, editor) => {
        editorRef.current = editor;
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
            editor.on('change', () => handleEditorChange(editor.getContent()));
        }
    }}
/>


                    </div>
                   
                    <div style={{display:"flex",flexDirection:"column"}}>
                        <label className='labelEditTem'>Date</label>
                        <input
                            className='inputEditTem'
                            type='text'
                            name='auteur'
                            value={formData.Date}
                            onChange={handleInputChange}
                        />
                    </div>
                   
                    <div className='Bouton-Edit-Tem'>
                        <button type="submit" className='btn-EditTem'>Modifier</button>
                        <button type="button" className='btn-AnnulerTem' onClick={() => navigate('/admin/Accueil')}>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default EditTemoignage
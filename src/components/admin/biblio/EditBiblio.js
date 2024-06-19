import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { GetBiblio, PutBiblio } from '../../../Redux/Slice/BiblioSlice';
import loadingGif from './../../../images/loading.gif';
import { getImageUrl } from '../../..';
import './css/editBiblio.css';

const EditBiblio = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { Biblios } = useSelector((state) => state.biblio);

    const auteur1Ref = useRef();
    const auteur2Ref = useRef();
    const anneeRef = useRef();
    const descripRef = useRef();

    const [formData, setFormData] = useState({
        auteur1: '',
        descrip: '',
        annee: '',
        photo_c: ''
    });
    const [editorLoaded, setEditorLoaded] = useState(false);

    useEffect(() => {
        setEditorLoaded(true);
        dispatch(GetBiblio());
    }, [dispatch]);

    useEffect(() => {
        if (Biblios && id) {
            const BibliEdit = Biblios.find(bibl => bibl._id === id);
            if (BibliEdit) {
                setFormData(BibliEdit);
            }
        }
    }, [Biblios, id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedFormData = {
            auteur1: auteur1Ref.current.value,
            auteur2: auteur2Ref.current.value,
            annee: anneeRef.current.value,
            descrip: descripRef.current.value,
        };
        if (id && updatedFormData) {
            dispatch(PutBiblio({ id, data: updatedFormData }));
            navigate('/admin/consulter_biblio');
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
        <div className='FormContainerBiblio'>
            <form onSubmit={handleSubmit} className='edit-Biblio'>
                <label>Description</label>
                <textarea
                    defaultValue={formData.descrip}
                    ref={descripRef}
                />
                <label>auteur1</label>
                <input
                    type='text'
                    defaultValue={formData.auteur1}
                    ref={auteur1Ref}
                />
                <label>auteur2</label>
                <input type='text' ref={auteur2Ref} />
                <label>annee:</label>
                <input
                    type='text'
                    defaultValue={formData.annee}
                    ref={anneeRef}
                />
                <label>Image</label>
                {formData.photo_c && (
                    <img
                        src={getImageUrl(formData.photo_c)}
                        alt="Icone"
                        className='imageEditBiblio'
                    />
                )}
                <div className='Bouton-Edit-Article'>
                    <button type="submit" className='btn btn-primary edit-modifier-Article'>Modifier</button>
                    <button type="button" className='btn btn-secondary' onClick={() => navigate('/admin/Accueil')}>Annuler</button>
                </div>
            </form>
        </div>
    );
};

export default EditBiblio;

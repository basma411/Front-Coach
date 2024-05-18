import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetIcon } from '../../../Redux/Slice/IconSlice';
import { useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useResizeDetector } from 'react-resize-detector'; // Importer useResizeDetector
import './css/edit.css';

const Edit = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { Icon } = useSelector((state) => state.icon);
    useEffect(() => {
        dispatch(GetIcon());
    }, [dispatch]);

    const [formData, setFormData] = useState({});

    useEffect(() => {
        const iconToEdit = Icon.find(icon => icon._id === id);
        if (iconToEdit) {
            setFormData(iconToEdit);
        }
    }, [Icon, id]);

    const handleEditorChange = (event, editor, name) => {
        const data = editor.getData();
        setFormData((prevData) => ({
            ...prevData,
            [name]: data,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const { width, height, ref } = useResizeDetector(); // Utiliser useResizeDetector

    return (
        <div className='editIcon' ref={ref}> {/* Utiliser la référence retournée par useResizeDetector */}
            <div className='containerIcon'>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Titre</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={formData.Titre || ''}
                            onChange={(event, editor) => handleEditorChange(event, editor, 'Titre')}
                            config={{
                                // Configuration supplémentaire peut être placée ici
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Texte</label>
                        <CKEditor
                            editor={ClassicEditor}
                            data={formData.Texte || ''}
                            onChange={(event, editor) => handleEditorChange(event, editor, 'Texte')}
                            config={{
                                // Configuration supplémentaire peut être placée ici
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Icone</label>
                        {formData.image && <img src={`http://localhost:8000/${formData.image}`} alt="Icone" className='EDIT-IMG' />}
                    </div>

                    <div>
                        <button onClick={handleSubmit} className='btn btn-primary'>Modifier</button>
                        <button onClick='btn btn-primary'>Annuler</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;

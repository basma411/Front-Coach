import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CustomCKEditor = ({ data, onChange, name, config }) => {
    return (
        <CKEditor
            editor={ClassicEditor}
            data={data}
            onChange={(event, editor) => onChange(event, editor, name)}
            config={config}
        />
    );
};

export default CustomCKEditor;

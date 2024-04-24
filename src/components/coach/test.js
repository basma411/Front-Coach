// Page côté client
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { UpdateCoach } from "../../Redux/Slice/CoachSlice"; // Assurez-vous d'importer la bonne action
import { useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = e => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      console.log(selectedFile); // Ajout du log pour vérification
      console.log('file selected');
    } else {
      console.log("No file selected.");
    }
  };
  

  const handleSubmit = async e => {
    e.preventDefault();
  
    if (file) {
      const formData = new FormData();
      formData.append("Photo", file);
      dispatch(UpdateCoach({_id: id, Photo: file}));
    } else {
      console.error("No file selected.");
    }
  };
  
  
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="file" name="Photo" onChange={handleFileChange} />
        <button type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Edit;



import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import "./css/editvideo.css";
import loadingGif from "./../../../images/loading.gif";
import { getImageUrl } from "../../../index.js";
import { Getvideo, putvideo } from "../../../Redux/Slice/videoSlice.js";
import { Editor } from "@tinymce/tinymce-react";

const Editvideo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const editorRef = useRef();

  const { video, loading } = useSelector((state) => state.video); // Assuming loading state is handled in Redux
  const [image, setImage] = useState(null);
  const [titre, setTitre] = useState("");

  const [formData, setFormData] = useState({
    titre: "",
    lien: "",
  });
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
    dispatch(Getvideo());
  }, [dispatch]);

  useEffect(() => {
    if (video && id) {
      const videoEdit = video.find((video) => video._id === id);
      if (videoEdit) {
        setFormData(videoEdit);
        setTitre(videoEdit.titre); // Set the initial title state
      }
    }
  }, [video, id]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleEditorChange = (content) => {
    setTitre(content);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titre || !formData.lien) {
      alert("Please fill in all required fields.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("titre", titre);
    formDataToSend.append("lien", formData.lien);

    if (image) {
      formDataToSend.append("images", image);
    }

    dispatch(putvideo({ id, data: formDataToSend }));
    navigate("/admin/videoCoching");
  };

  if (loading || !editorLoaded) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <img src={loadingGif} alt="Chargement..." />
      </div>
    );
  }

  return (
    <div className="edit-Evenement">
      <div className="FormContainerEvenement">
        <form onSubmit={handleSubmit}>
          <div className="ItemVedioEdit">
            <label className="LabelEditVedio">Titre</label>
            <Editor
              apiKey="1994z08ifihaxvil1djjswb8ukpzno8v15iflre6tzcdv7g8"
              onInit={(evt, editor) => {
                editorRef.current = editor;
                editor.setContent(formData.titre);
              }}
              initialValue={formData.titre}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist autolink lists link image charmap preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table code help wordcount",
                ],
                toolbar:
                  "undo redo | bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                setup: (editor) => {
                  editor.on("change", () => handleEditorChange(editor.getContent()));
                },
              }}
            />
          </div>
          <div className="ItemVedioEdit">
            <label className="LabelEditVedio">Lien</label>
            <textarea
              className="inputVideoEdit"
              type="text"
              name="lien"
              value={formData.lien}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group-Video">
            <label className="LabelEditVedio">Image</label>
            <input type="file" name="images" onChange={handleFileChange} />
            {formData.images && !image && (
              <img
                src={getImageUrl(formData.images)}
                alt="Icone"
                className="imageEdit-video"
              />
            )}
          </div>
          <div className="Bouton-Edit-Article">
            <button type="submit" className="btn-EditVideo">
              Modifier
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/Accueil")}
              className="btn-NoEditVideo"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editvideo;

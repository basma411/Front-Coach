import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { GetBiblio, PutBiblio } from "../../../Redux/Slice/BiblioSlice";
import loadingGif from "./../../../images/loading.gif";
import { getImageUrl } from "../../..";
import "./css/editBiblio.css";

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
    auteur1: "",
    descrip: "",
    annee: "",
    photo_c: "",
  });
  const [images, setImage] = useState(null);
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
    dispatch(GetBiblio());
  }, [dispatch]);

  useEffect(() => {
    if (Biblios && id) {
      const BibliEdit = Biblios.find((bibl) => bibl._id === id);
      if (BibliEdit) {
        setFormData(BibliEdit);
      }
    }
  }, [Biblios, id]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();
    updatedFormData.append("auteur1", auteur1Ref.current.value);
    updatedFormData.append("auteur2", auteur2Ref.current.value);
    updatedFormData.append("annee", anneeRef.current.value);
    updatedFormData.append("descrip", descripRef.current.value);
    if (images) {
      updatedFormData.append("photo_c", images);
    }

    if (id) {
      dispatch(PutBiblio({ id, data: updatedFormData }));
      navigate("/admin/consulter_biblio");
    }
  };

  if (!editorLoaded) {
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
    <div className="FormBiblio">
      <div className="FormContainerBiblio">
        <form onSubmit={handleSubmit} className="edit-Biblio">
          <div style={{ display: "flex", flexDirection: 'column' }}>
            <label className="labelBiblio">Description</label>
            <textarea defaultValue={formData.descrip} ref={descripRef} className="textAreaBiblio" />
          </div>
          <div style={{ display: "flex", flexDirection: 'column' }}>
            <label className="labelBiblio">auteur1</label>
            <input type="text" defaultValue={formData.auteur1} ref={auteur1Ref} className="inputBiblio" />
          </div>
          <div style={{ display: "flex", flexDirection: 'column' }}>
            <label className="labelBiblio">auteur2</label>
            <input type="text" ref={auteur2Ref} className="inputBiblio" />
          </div>
          <div style={{ display: "flex", flexDirection: 'column' }}>
            <label className="labelBiblio">annee:</label>
            <input type="text" defaultValue={formData.annee} ref={anneeRef} className="inputBiblio" />
          </div>
          <div style={{ display: "flex", flexDirection: 'column' }}>
            <label className="labelBiblio">Image</label>
            <input type="file" name="photo_c" onChange={handleFileChange} />
            {formData.photo_c && (
              <img
                src={getImageUrl(formData.photo_c)}
                alt="Icone"
                className="imageEditBiblio"
              />
            )}
          </div>
          <div className="buttonsContainer">
            <button
              type="submit"
              className="btnEditBiblio"
            >
              Modifier
            </button>
            <button
              type="button"
              className="btnAnnuleBiblio"
              onClick={() => navigate("/admin/Accueil")}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBiblio;

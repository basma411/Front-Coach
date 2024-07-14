import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { putDomaine } from '../../../Redux/Slice/DomainSlice';
import './css/editdomaine.css';

const EditDomaine = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { domaines } = useSelector((state) => state.domaine);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    domaines: '',
  });

  useEffect(() => {
    if (domaines && id) {
      const domainesEdit = domaines.find(d => d._id === id);
      if (domainesEdit) {
        setFormData(domainesEdit);
      }
    }
  }, [domaines, id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePartenaire = (event) => {
    event.preventDefault();
    dispatch(putDomaine({ id, data: formData }));
    navigate('/admin/consulter_domaine');
  };

  return (
    <div className="DomaineEdit">
      <form className="DomaineEditContainer" onSubmit={handlePartenaire}>
      <div style={{display:'flex',flexDirection:"column"}}>  <label className='LabelEditD'>Bréve Bio</label>
        <textarea
          name="domaines"
          value={formData.domaines}
          onChange={handleInputChange}
          className='textAreaDomaine'
        /></div>
        <div className='EditDomaine'>
          <button type="submit" className='submitDomaine'>
            modifier
          </button>
          <button type="button" className='AnnuleDomaine' onClick={() => navigate('/admin/Accueil')}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDomaine;

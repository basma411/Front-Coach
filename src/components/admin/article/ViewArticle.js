import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetArticle, GetArticleInvi } from '../../../Redux/Slice/ArticleSlice';
import { useNavigate, useParams } from 'react-router-dom';
import './css/viewArticle.css'
const ViewArticle = () => {
    const navigator=useNavigate()

    const dispatch = useDispatch();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        titre: '',
        texte: '',
        lien: '',
        auteur: '',
        photo: ''
    });
    const { ArticlesInv } = useSelector((state) => state.article);
  console.log(ArticlesInv)
    useEffect(() => {
      dispatch(GetArticleInvi());
    }, [dispatch]);
    useEffect(() => {
        if (ArticlesInv && id) {
          const ArticlesEdit = ArticlesInv.find(article => article._id === id);
          if (ArticlesEdit) {
            setFormData(ArticlesEdit);
          }
        }
      }, [ArticlesInv, id]);
  return (
<div className='View'>
<div className='viewContainer'>
<div style={{borderBottom:"solid 1px rgb(194, 192, 192)", width:'100%',padding:'5px'}}>
<label>Titre</label>
<p  className='styletexte'>{formData.titre}</p>
</div>

<div style={{borderBottom:"solid 1px rgb(194, 192, 192)", width:'100%',padding:'5px'}}><label>Texte</label>
<p  className='styletexte'>{formData.texte}</p></div>

<div style={{ width:'100%',padding:'5px'}}><label>Auteur</label>
<p className='styletexte'>{formData.auteur}</p></div>
<button style={{backgroundColor:'blue' ,color:'white'}} onClick={()=>navigator('/admin/article/invisible')}>Annuler</button>

</div>

</div>
)
}

export default ViewArticle
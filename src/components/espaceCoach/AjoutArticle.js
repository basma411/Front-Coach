import React, { useEffect } from 'react';
import image from '../../images/big_image_2.jpg';
import './css/ajouterarticle.css';
import { useDispatch, useSelector } from 'react-redux';
import { GetArticle } from '../../Redux/Slice/ArticleSlice';
import { useForm } from 'react-hook-form';
const AjoutArticle = () => {
  const dispatch = useDispatch();
  const { Articles } = useSelector((state) => state.article);

  useEffect(() => {
    dispatch(GetArticle());
  }, [dispatch]);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  // Getting the last four articles
  const latestArticles = Articles.slice(-4);

  return (
    <>
      <div
        className="ImagePlatforme"
        style={{
          position: "relative",
          textAlign: "center",
          height: "300px",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          overflow: "hidden",
        }}
      >
        <div style={{ paddingTop: "100px" }}>
          <h2>Partagez un article, une offre</h2>
        </div>
      </div>

      <div className="navigation-arrows">
      <div className='left-container'>
          <h3>Articles, offres déjà partagé(e)s</h3>
          {latestArticles.map((article, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <img src={`http://localhost:8000/${article.Photo}`}  alt="Article" />
              <h1>{article.Titre}</h1>
              <h2>{article.Auteur}</h2>
            </div>
          ))}
        </div>
        <div className='right-container'>
  <h1>Pour partager un article, une offre, cet espace est pour vous!</h1>
  <form onSubmit={handleSubmit(onSubmit)}>
    <input type="text" placeholder="Auteur(e)/ Entreprise:" {...register} />
    <input type="text" placeholder="Titre" {...register("Titre", {})} />
    <input type="text" placeholder="Texte" {...register("Texte", {})} />
    <input type="file" placeholder="Photo ou illustration:" {...register("Photo ou illustration:", {})} />
    <input type="text" placeholder="Lien (si votre texte est publié sur un site):" {...register("Lien (si votre texte est publié sur un site):", {})} />
    <input type="submit" />
  </form>
</div>

      </div>
    </>
  );
};

export default AjoutArticle;

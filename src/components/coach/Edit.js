import React from 'react'
import './css/edit.css';
import { useSelector } from 'react-redux';

const Edit = () => {
    const { coachdata } = useSelector((state) => state.coach);

  return (
<div className='container'>
    <div className='Profil'>
    <form >
                    <label htmlFor="Nom">Nom et Prénom</label><br />
                    <textarea type="text" id="nom" name="Nom" defaultValue={coachdata.NomPrenom}/><br />

                    <label htmlFor="Email">Email</label><br />
                    <textarea type="text" id="Email" name="Email"  defaultValue={coachdata.Email} /><br />

                    <label htmlFor="Numéro">Numéro</label><br />
                    <textarea type="text" id="Numéro" name="Numéro" defaultValue={coachdata.NumTel}/><br />

                    <div className='domaineIntervention'>
                        <label>Domaines d'intervention</label><br />
                        {coachdata?.DomainesIntervention && coachdata.DomainesIntervention.map((domaine, index) => (
                            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="checkbox" id={`domaine-${index}`} name={`domaine-${index}`} value={domaine} />
                                <label htmlFor={`domaine-${index}`}>{domaine}</label>
                            </div>
                        ))}
                    </div>
                </form>  
    </div>
</div>


                )
}

export default Edit
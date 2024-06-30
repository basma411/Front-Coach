import React, { useRef } from 'react';
import './css/newsletter.css';
import { addNewsLetter } from '../../Redux/Slice/NewsLetterSlice';
import { useDispatch } from 'react-redux';

const Newsletter = () => {
    const emailRef = useRef();
    const dispatch = useDispatch();
 
    const handleSubmit = (e) => {
        e.preventDefault();
        const Email = emailRef.current.value;
        dispatch(addNewsLetter({ email: Email }));
        emailRef.current.value = '';

    };

    return (
       <div className='newsletter'>
         <div className="newsletterContainer">
            <div>
                <h1 className='newTitle'>Newsletters</h1>
                <p className='newsletterParagh'>Vous voulez joindre notre communauté de coachs et coachés et être informés des nouveautés dans le métier</p>
            </div>
<div>
    
<form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input
                        type="email"
                        placeholder="Entrer votre email"
                        required
                        ref={emailRef}
                        className='NewsleInput'
                    />
                    <button type="submit" className='EnvoyerNewsletter'>Envoyer</button>
                </div>
            </form>
</div>
        </div>
       </div>
    );
};

export default Newsletter;

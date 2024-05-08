import React, { useRef } from 'react';
import './css/newsletter.css';
import { addNewsLetter } from '../../Redux/Slice/NewsLetterSlice';
import { useDispatch } from 'react-redux';

const Newsletter = () => {
    const emailRef = useRef();
    const dispatch = useDispatch();
 
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        dispatch(addNewsLetter({ Email: email }));
        emailRef.current.value = '';

    };

    return (
        <div className="newsletter">
            <div>
                <h2>Newsletters</h2>
                <p>Vous voulez joindre notre communauté de coachs et coachés et être<br/> informés des nouveautés dans le métier</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input
                        type="email"
                        placeholder="Entrer votre email"
                        required
                        ref={emailRef}
                    />
                    <button type="submit">Envoyer</button>
                </div>
            </form>
        </div>
    );
};

export default Newsletter;

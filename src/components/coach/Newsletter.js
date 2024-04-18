import React, { useState } from 'react';
import './css/newsletter.css';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Vous pouvez implémenter ici la logique pour soumettre l'email
        console.log('Email soumis:', email);
        // Réinitialiser le champ email après la soumission
        setEmail('');
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
                        value={email}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Envoyer</button>
                </div>
            </form>
        </div>
    );
};

export default Newsletter;

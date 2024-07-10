import React from 'react';

const MessageTemplate = () => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2>Bonjour,</h2>
            
            <p>Insérez ici le contenu de votre message. Vous pouvez formater le texte comme vous le souhaitez.</p>
            
            <p>Par exemple :</p>
            
            <blockquote>
                <p>Voici un exemple de texte mis en valeur.</p>
            </blockquote>
            
            <p>Vous pouvez aussi ajouter des listes :</p>
            
            <ul>
                <li>Point 1</li>
                <li>Point 2</li>
                <li>Point 3</li>
            </ul>
            
            <p>Et même des liens : <a href="https://votresite.com">Votre Site Web</a>.</p>
            
            <p>N'hésitez pas à personnaliser ce template selon vos besoins.</p>
            
            <p>Merci et bonne journée !</p>
            
            <p>Cordialement,</p>
            <p>Votre Nom</p>
        </div>
    );
}

export default MessageTemplate;

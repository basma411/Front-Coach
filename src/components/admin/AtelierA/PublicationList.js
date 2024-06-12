import React from 'react';

function PublicationList({ publications }) {
  return (
    <div>
      <h3>Liste des Publications</h3>
      <ul>
        {publications.map((publication, index) => (
          <li key={index}>{publication}</li>
        ))}
      </ul>
    </div>
  );
}

export default PublicationList;

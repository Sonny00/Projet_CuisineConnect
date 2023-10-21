import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { string } from 'yup';

function RecetteDetailPage() {
  const { title } = useParams<{ title: string }>(); // Remove the extra parentheses after the string type
  const api = useApi();
  const [recette, setRecette] = useState<any>(null);

  useEffect(() => {
    api
      .getRecette(title) // Utilisez la nouvelle fonction pour récupérer la recette par titre
      .then((response) => {
        setRecette(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération de la recette', error);
      });
  }, [title, api]);

  return (
    <div>
      {recette ? (
        <div>
          <h2>Détails de la Recette</h2>
          <p>Titre: {recette.title}</p>
          <p>Description: {recette.description}</p>
          {/* Affichez d'autres détails de la recette ici */}
        </div>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </div>
  );
}

export default RecetteDetailPage;

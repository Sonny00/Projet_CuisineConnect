import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import Chatbot from '../components/Chatbot';

const PageFavoris = () => {
  const api = useApi();
  const [favoris, setFavoris] = useState([]);

  useEffect(() => {
    api.getFavoriteRecettes()
      .then(response => {
        setFavoris(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des favoris', error);
      });
  }, [api]);

  return (
    <div className="container"><h1> d </h1>   </div>
    
  );
}

export default PageFavoris;

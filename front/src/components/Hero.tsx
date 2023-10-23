import React, { useState, useEffect, FormEvent } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useApi from '../hooks/useApi';
import LoadingScreen from './LoadingScreen';
import './HeroStyle.css';
import { useNavigate } from 'react-router-dom';
import Chatbot from './Chatbot'; // Assurez-vous d'importer votre composant Chatbot

const Hero: React.FC = () => {
  const { getRecetteByTitle } = useApi();
  const [inputData, setInputData] = useState<string>('');
  const [searchResult, setSearchResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const api = useApi();
  const navigate = useNavigate();

  const toggleChatbot = () => {
    setIsChatbotVisible((prev) => !prev);
  };

  useEffect(() => {
    if (searchText) {
      api
        .getRecettes()
        .then((response) => {
          const filteredRecettes = response.data.filter((recette) =>
            recette.title.toLowerCase().includes(searchText.toLowerCase())
          );
          setSearchResults(filteredRecettes);
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des recettes', error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchText]);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await getRecetteByTitle(inputData);

      if (response.data) {
        navigate(`/recette/${response.data.id}`);
      } else {
        setSearchResult('Aucune recette trouvée');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='absolute top-0 left-0 w-full h-full bg-gray-900/30'></div>
      <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center text-center'>
        <h1 className='text-white mb-2' style={{ fontSize: '20px' }}>
          Bienvenue sur CuisineConnect
        </h1>
        <h2 className='text-white mb-4' style={{ fontSize: '13px' }}>
          Quelle recette souhaitez-vous aujourd'hui ?
        </h2>

        <button onClick={toggleChatbot}>Ouvrir le Chatbot</button>

        {isChatbotVisible ? <Chatbot /> : null}

        <form
          onSubmit={handleSearch}
          className='flex border p-1 rounded-md text-black bg-gray-100/90 max-w-[700px] w-[80%] mx-auto'
        >
          <Autocomplete
            id='recette-search'
            freeSolo
            options={searchResults.map((recette) => recette.title)}
            onInputChange={(_, value) => setSearchText(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Recherche d'une recette..."
                className='full-width-textfield'
                style={{ width: '100%', minWidth: '690px' }}
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
              />
            )}
          />
        </form>

        {loading && <LoadingScreen />}
        {searchResult && (
          <div style={{ color: 'white', marginTop: '20px' }}>{searchResult}</div>
        )}
      </div>
    </>
  );
};

export default Hero;

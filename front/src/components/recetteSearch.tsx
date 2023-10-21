import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useApi from '../hooks/useApi';

function RecetteSearchBar() {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const api = useApi();

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

  return (
<>
          <div className='absolute top-0 left-0 w-full h-full bg-gray-900/30'></div>
          <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center text-center'></div>
         <h1 className='text-white mb-2'>Bienvenue sur CuisineConnect</h1>
          <h2 className='text-white mb-4'>Quelle recette souhaitez-vous aujourd'hui ?</h2>
          
      <Autocomplete
        id="recette-search"
        freeSolo
        options={searchResults.map((recette) => recette.title)}
        onInputChange={(_, value) => setSearchText(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Rechercher une recette"
            margin="normal"
            variant="outlined"
          />
        )}
      />
</>
  );
}

export default RecetteSearchBar;
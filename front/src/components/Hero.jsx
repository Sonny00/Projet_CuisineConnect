import React, { useState } from 'react';
import useApi from '../hooks/useApi';
import LoadingScreen from './LoadingScreen'; // Importez votre composant d'écran de chargement

const Hero = () => {
  const { getRecetteSearchAnswer } = useApi();

  const [inputData, setInputData] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [loading, setLoading] = useState(false); // État pour gérer l'écran de chargement

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); 

      const response = await getRecetteSearchAnswer({ message: inputData });

      setSearchResult(response);
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
        <h1 className='text-white mb-2'>Bienvenue sur CuisineConnect</h1>
        <h2 className='text-white mb-4'>Quelle recette souhaitez-vous aujourd'hui ?</h2>
        <form
          onSubmit={handleSearch}
          className='flex border p-1 rounded-md text-black bg-gray-100/90 max-w-[700px] w-[80%] mx-auto'
        >
          <input
            type='text'
            placeholder='Recherche de recettes...'
            className='grow bg-transparent outline-none'
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <button type='submit' className='w-11 btn--form'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
              />
            </svg>
          </button>
        </form>
        {loading && <LoadingScreen />} {/* Affiche l'écran de chargement si loading est vrai */}
        {searchResult && (
          <div className='text-white mt-4'>{searchResult.data}</div>
        )}
      </div>
    </>
  );
};

export default Hero;

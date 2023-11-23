import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

function getRequestHeaders(token = null, withBody = false) {
  return {
    "Content-Type": withBody ? "application/json" : undefined,
    Authorization: token != null ? `Bearer ${token}` : undefined,
  };
}

const apiClient = {
  get: function (url, token = null) {
    return axiosInstance.get(url, {
      headers: getRequestHeaders(token),
    });
  },
  post: function (url, data = null, token = null) {
    return axiosInstance.post(url, data, {
      headers: getRequestHeaders(token, data != null),
    });
  },
  put: function (url, data = null, token = null) {
    return axiosInstance.put(url, data, {
      headers: getRequestHeaders(token, data != null),
    });
  },
  patch: function (url, data = null, token = null) {
    return axiosInstance.patch(url, data, {
      headers: getRequestHeaders(token, data != null),
    });
  },
  delete: function (url, token = null) {
    return axiosInstance.delete(url, {
      headers: getRequestHeaders(token),
    });
  },


};

export default function useApi() {
  const { user } = useAuth();
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, [user]);

  function login(email, password) {
    return apiClient.post("auth/login", { email, password }, token);
  }

  function getLoggedInUser(id, accessToken = null) {
    return apiClient.get(`users/${id}`, accessToken ?? token);
  }

  function getUsers(selectedFilter, searchInput) {
    return apiClient.get(
      `users?skill=${selectedFilter ?? ""}&search=${searchInput ?? ""}`,
      token
    );
  }
  
  function getUsersOnly(selectedFilter, searchInput) {
    return apiClient.get(
      `users/users-only?skill=${selectedFilter ?? ""}&search=${
        searchInput ?? ""
      }`,
      token
    );
  }

  function getUser(id) {
    return apiClient.get(`users/${id}`, token);
  }

  function addUser(user) {
    return apiClient.post("users", { ...user }, token);
  }

  function updatePassword(id, data) {
    return apiClient.patch(`users/updatePassword/${id}`, { ...data }, token);
  }

  function updateUser(id, data) {
    return apiClient.patch(`users/${id}`, { ...data }, token);
  }

  function deleteUser(id) {
    return apiClient.delete(`users/${id}`, token);
  }


  function getRecetteSearchAnswer(data) {
    return apiClient.post("recette-search", data, token);
  }
   function getRecettes() {
    return apiClient.get('recettes', token);
  }

  function getRecette(id) {
    return apiClient.get(`recettes/${id}`, token);
  }


function getRecetteByTitle(title) {
  return apiClient.get(`recettes/title/${title}`, token);
}

function getCommentaires(recetteId) {
  return apiClient.get(`recettes/${recetteId}/commentaires`, token);
}

function postComment(recetteId, text) {
  return apiClient.post(`recettes/${recetteId}/commentaires`, { text }, token);
}

function addFavorite(recetteId) {
  return apiClient.post(`recettes/${recetteId}/favoris`, null, token);
}

function removeFavorite(recetteId) {
  return apiClient.delete(`recettes/${recetteId}/favoris`, token);
}

// function getFavoriteRecettes() {
//   return apiClient.get('recettes/favoris', token);
// }

function addNote(recetteId, rating) {

  apiClient.get(`recettes/${recetteId}/notes`, token)
    .then((response) => {
      if (response.data.length === 0) {
     
        apiClient.post(`recettes/${recetteId}/notes`, { rating }, token)
          .then(() => {

          })
          .catch((error) => {
            console.error('Erreur lors de la création de la note', error);
          });
      } else {
        const noteId = response.data[0].id; 
        apiClient.put(`recettes/${recetteId}/notes/${noteId}`, { rating }, token)
          .then(() => {
          
          })
          .catch((error) => {
            console.error('Erreur lors de la mise à jour de la note', error);
          });
      }
    })
    .catch((error) => {
      console.error('Erreur lors de la vérification de la note', error);
    });
}

function updateNote(noteId, rating) {
  return apiClient.patch(`notes/${noteId}`, { rating }, token);
}

function deleteNote(noteId) {
  return apiClient.delete(`notes/${noteId}`, token);
}

function getNotesByRecetteId(recetteId) {
  return apiClient.get(`recettes/${recetteId}/notes`, token);
}

  
function searchRecettes(prompt) {
  return apiClient.post('/search', { prompt }, token);
}
 
function searchBarRecettes(prompt) {
  return apiClient.post('/recherche-bar/search', { prompt }, token);
  }

function getFavoriteRecettes(userId, token = null) {
  return axiosInstance.get(`/users/${userId}/favoris`, token); 
}

function getPreferences(userId, token = null) {
  return axiosInstance.get(`/users/${userId}/preferences`, {
    headers: getRequestHeaders(token),
  });
}
  
function updatePreferences(userId, preferences) {
    return axiosInstance.patch(`/users/${userId}/preferences`, preferences, {
      headers: getRequestHeaders(token, true),
    });
  }

 
  return {
    login,
    getLoggedInUser,
    getUsers,
    getUsersOnly,
    getUser,
    addUser,
    updateUser,
    updatePassword,
    deleteUser,
    getRecetteSearchAnswer,
    getRecettes,
    getRecette,
    getRecetteByTitle,
    getCommentaires,
    postComment,
    addFavorite,
    removeFavorite,
    getFavoriteRecettes,
    addNote,
    updateNote,
    deleteNote,
    searchRecettes,
    searchBarRecettes,
    getFavoriteRecettes,
    updatePreferences,
    getPreferences,
    getNotesByRecetteId,
  };
}

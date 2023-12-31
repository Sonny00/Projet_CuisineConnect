import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Container,
} from "@mui/material";
import dotenv from "dotenv";
import useAuth from "../hooks/useAuth";

function RecetteDetailPage() {
  const { title } = useParams<{ title: string }>();
  const api = useApi();
  const [recette, setRecette] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [commentaires, setCommentaires] = useState([]);
  const [accompagnements, setAccompagnements] = useState<string | null>(null); // Utilisez un état pour stocker les suggestions d'accompagnement
  const [listeDeCourses, setListeDeCourses] = useState("");
  const listeDeCoursesItems = listeDeCourses.split("\n").filter((item) => item);
  const [notes, setNotes] = useState([]);
  const [recetteSimilaires, setRecetteSimilaires] = useState([]);
  const { getSimilarRecipes } = useApi();
  const { getUserFavorites } = useApi();
  const { user } = useAuth();

  
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {

        const [recetteResponse, commentairesResponse, notesResponse,] =
          await Promise.all([
            api.getRecette(title),
            api.getCommentaires(title),
            api.getNotesByRecetteId(title),
          ]);

        if (mounted) {
          setRecette(recetteResponse.data);
          setCommentaires(commentairesResponse.data);
          setFavorite(recetteResponse.data.favorite);
          setNotes(notesResponse.data);
          

        const userId = user?.id;
        const userFavorites = await api.getUserFavorites(userId);
        const isFavorite = Array.isArray(userFavorites) && userFavorites.some(favRecette => favRecette.id === recetteResponse.data.id);
        setFavorite(isFavorite);


          
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données", error);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [title, api]);

  useEffect(() => {
  
  const loadRecetteDetails = async () => {
    try {
      const recetteResponse = await api.getRecette(title);
      setRecette(recetteResponse.data);
   
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de la recette", error);
    }
  };

  loadRecetteDetails();
}, [title, api]); 

useEffect(() => {
  
  const checkIfFavorite = async () => {
    try {
      const userId = user?.id;
      if (userId) {
        const userFavorites = await api.getUserFavorites(userId);
        const isFavorite = userFavorites.some(favRecette => favRecette.id === recette?.id);
        setFavorite(isFavorite);
      }
    } catch (error) {
      console.error("Erreur lors de la vérification des favoris", error);
    }
  };

  if (recette) {
    checkIfFavorite();
  }
}, [user, recette]); 

  const handleAddComment = () => {
    api
      .postComment(recette.id, comment)
      .then(() => {})
      .catch((error) => {
        console.error("Erreur lors de l'ajout du commentaire", error);
      });

    setComment("");
  };

  const handleSaveRating = () => {
    if (userRating > 0) {
      api
        .addNote(recette.id, userRating)
        .then(() => {})
        .catch((error) => {
          console.error("Erreur lors de l'ajout de la note", error);
        });
    }
  };

  const handleBackToMenu = () => {
    navigate("/");
  };

 const handleToggleFavorite = async () => {
  try {
    const userId = user?.id; 
    const recetteId = recette?.id;

    if (!userId || !recetteId) {
      console.error("ID utilisateur ou recette manquant");
      return;
    }

    if (favorite) {
      await api.removeFavorite(userId, recetteId);
      setFavorite(false);
    } else {
      await api.addFavorite(recetteId); 
      setFavorite(true);
    }



  } catch (error) {
    console.error("Erreur lors de la mise à jour des favoris", error);
  }
};

  
  
  const handleFindSimilarRecipes = async () => {
  try {
    const response = await api.getSimilarRecipes(recette.title);
    
    setRecetteSimilaires(response.data); 
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes similaires", error);
    console.log(typeof recette.title);
  
  }
};


  const handleGenerateAccompagnements = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const recetteTitle = recette.title;
    const prompt = `Générez des suggestions d'accompagnements pour la recette "${recetteTitle}, en Français"`;
    const maxTokens = 50;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/engines/text-davinci-002/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            prompt,
            max_tokens: maxTokens,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const generatedText = data.choices[0].text;
        console.log("Suggestions d'accompagnements générées :", generatedText);
        setAccompagnements(generatedText);
        console.error("Erreur lors de la requête à l'API GPT-3");
      }
    } catch (error) {
      console.error("Erreur lors de la génération des accompagnements", error);
    }
  };

  const handleGenerateListeDeCourse = async () => {
    const apiKey = import.meta.env.VITE_API_KEY;
    const ingredients = recette.ingredients;
    const prompt = `Générez une liste de courses pour la recette "${recette.title}" avec les ingrédients suivants: ${ingredients}`;
    const maxTokens = 100;

    try {
      const response = await fetch(
        "https://api.openai.com/v1/engines/text-davinci-003/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            prompt,
            max_tokens: maxTokens,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const generatedText = data.choices[0].text;
        console.log("Liste de courses générée :", generatedText);
        setListeDeCourses(generatedText); // Mettez à jour l'état ici
      } else {
        console.error("Erreur lors de la requête à l'API GPT-3");
      }
    } catch (error) {
      console.error(
        "Erreur lors de la génération de la liste de courses",
        error
      );
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(listeDeCourses)
      .then(() => alert("Liste de courses copiée dans le presse-papier!"))
      .catch((err) => console.error("Erreur lors de la copie", err));
  };

  const handleShareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      listeDeCourses
    )}`;
    window.open(twitterUrl, "_blank");
  };
  const handleShareByEmail = () => {
    const mailto = `mailto:?subject=Liste de Courses&body=${encodeURIComponent(
      listeDeCourses
    )}`;
    window.open(mailto, "_blank");
  };

  return (
    <>
      <style>
        {`
          
          .comment {
            margin-bottom: 10px; /* Espace entre les commentaires */
            width: 80%; /* Ajustez la largeur selon les besoins */
            /* autres styles si nécessaire */
          }

          .note-container {
          width: 100%;
          height: 20px;
          margin-bottom: 30px; /* Espace entre les notes */
          text-align: center;
        }
        `}
      </style>

      <Container maxWidth="md">
        <Button
          variant="contained"
          onClick={handleBackToMenu}
          style={{
            backgroundColor: "black",
            color: "white",
            marginBottom: "20px",
          }}
        >
          Retour au menu
        </Button>

        {recette ? (
          <Card>
            <CardContent>
              <div style={{ textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                  {recette.title}
                </Typography>
                {notes.map((note, index) => (
                  <div key={index} className="note-container">
                    <Typography>{`Note: ${note.rating} / 5`}</Typography>
                    {/* Vous pouvez ajouter plus de détails ici si nécessaire */}
                  </div>
                ))}
       <Button
  onClick={handleToggleFavorite}
  variant="contained"
  style={{ backgroundColor: "black", color: "white" }}
>
  {favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
</Button>

{" "}
                <Button
                  onClick={() => setShowRatingForm(!showRatingForm)}
                  variant="contained"
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Noter cette recette
                </Button>{" "}
                <Button
                  onClick={() => handleGenerateAccompagnements()}
                  variant="contained"
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Proposition d'accompagnement
                </Button>{" "}
                <Button
                  onClick={() => handleGenerateListeDeCourse()}
                  variant="contained"
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Course
                </Button>
                {""}
              </div>
            </CardContent>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography color="black">{recette.description}</Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Ingrédients
                </Typography>
                <Typography color="black">{recette.ingredients}</Typography>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Liste de Courses
                </Typography>
                <Typography variant="body2">{listeDeCourses}</Typography>
                <ul>
                  {listeDeCoursesItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleCopyToClipboard}>
                  Copier
                </Button>
                <Button size="small" onClick={handleShareOnTwitter}>
                  Twitter
                </Button>
                <Button size="small" onClick={handleShareByEmail}>
                  Email
                </Button>
                {/* Autres boutons de partage */}
              </CardActions>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Instructions
                </Typography>
                <Typography color="black">{recette.instructions}</Typography>
              </CardContent>
            </Card>

            {accompagnements && (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Accompagnements Suggérés
                  </Typography>
                  <Typography color="black">{accompagnements}</Typography>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recommandation
                </Typography>
                <Typography color="black">{recette.ingredients}</Typography>
              </CardContent>
            </Card>
            <Card>
  <CardContent>
    <Typography variant="h6" gutterBottom>
      Recettes Similaires
                </Typography>
         
  <ul style={{ color: 'blue', fontWeight: 'bold' }}>
    {recetteSimilaires.map((similaire, index) => (
      <li key={index}>
        <a href={`/recette/${similaire.id}`} style={{ textDecoration: 'none', color: 'blue' }}>
        {similaire.title}
        </a>
      </li>
    ))}
  </ul>
  
  <Button
  onClick={handleFindSimilarRecipes}
  variant="contained"
  style={{ backgroundColor: "black", color: "white", marginTop : "20px" }}
>
  Afficher les recettes similaires
</Button>
  </CardContent>
</Card>
            {showRatingForm ? (
              <div>
                <p>Donnez une note :</p>
                <div>
                  {Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setUserRating(index + 1)}
                        style={{
                          backgroundColor:
                            userRating >= index + 1 ? "gold" : "transparent",
                        }}
                      >
                        ★
                      </button>
                    ))}
                </div>
                <button onClick={handleSaveRating}>Enregistrer la note</button>
              </div>
            ) : null}

            <CardContent>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                label="Ajouter un commentaire"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </CardContent>
            

            <CardActions>
              <Button
                onClick={handleAddComment}
                variant="contained"
                style={{ backgroundColor: "black", color: "white" }}
              >
                Ajouter un commentaire
              </Button>
            </CardActions>
            <Card className="comments-container">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Commentaires
                </Typography>
                {commentaires.map((commentaire) => (
                  <div key={commentaire.id} className="comment">
                    <Typography>{commentaire.text}</Typography>
                  </div>
                ))}
              </CardContent>
            </Card>
          </Card>
        ) : (
          <p>Chargement en cours...</p>
        )}
      </Container>
    </>
  );
}

export default RecetteDetailPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

function RecetteDetailPage() {
  const { title } = useParams<{ title: string }>();
  const api = useApi();
  const [recette, setRecette] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [showRatingForm, setShowRatingForm] = useState(false);
  const [commentaires, setCommentaires] = useState([]);


  useEffect(() => {
    api
      .getRecette(title)
      .then((response) => {
        setRecette(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de la recette", error);
      });
  
  }, [title, api]);

  // useEffect(() => {
  //   let intervalId;
  
  //   const fetchCommentaires = () => {
  //     if (recette) {
  //       api.getCommentaires(recette.id)
  //         .then((response) => {
  //           setCommentaires(response.data);
  //         })
  //         .catch((error) => {
  //           console.error("Erreur lors de la récupération des commentaires", error);
  //         });
  //     }
  //   };
  
  //   fetchCommentaires();
  //   intervalId = setInterval(fetchCommentaires, 10000);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [recette, api]);

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


  const handleToggleFavorite = () => {
    if (favorite) {
      api
        .removeFavorite(recette.id)
        .then(() => {
          setFavorite(false);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la suppression de la recette des favoris",
            error
          );
        });
    } else {
      api
        .addFavorite(recette.id)
        .then(() => {
          setFavorite(true);
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'ajout de la recette aux favoris",
            error
          );
        });
    }
  };

 

  return (
    <Container maxWidth="md">
      {recette ? (
        <Card>
          <CardContent>
            <div style={{ textAlign: "center" }}>
              <Typography variant="h4" gutterBottom>
                {recette.title}
              </Typography>
              <Button
                onClick={handleToggleFavorite}
                variant="contained"
                style={{
                  backgroundColor: favorite ? "black" : "black",
                  color: "white",
                }}
              >
                {favorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              </Button>{" "}
              <Button
                onClick={() => setShowRatingForm(!showRatingForm)}
                variant="contained"
                style={{ backgroundColor: "black", color: "white" }}
              >
                Noter cette recette
              </Button>
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
              <Typography variant="h6" gutterBottom>
                Instructions
              </Typography>
              <Typography color="black">{recette.instructions}</Typography>
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
          <Card>
          <div>
              <Typography variant="h6" gutterBottom>
                Commentaires
              </Typography>
              {commentaires.map((commentaire) => (
                <div key={commentaire.id}>
                  <Typography>{commentaire.text}</Typography>
                </div>
              ))}
            </div>
            </Card>

        </Card>
        
      ) : (
        <p>Chargement en cours...</p>
      )}
    </Container>
  );
}

export default RecetteDetailPage;

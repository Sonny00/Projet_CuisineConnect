import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../hooks/useApi';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  Container,
} from '@mui/material';

function RecetteDetailPage() {
  const { title } = useParams<{ title: string }>();
  const api = useApi();
  const [recette, setRecette] = useState<any>(null);
  const [comment, setComment] = useState('');
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    api
      .getRecette(title)
      .then((response) => {
        setRecette(response.data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération de la recette', error);
      });
  }, [title, api]);

  const handleAddComment = () => {
    api
      .postComment(recette.id, comment) 
      .then(() => {
        
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout du commentaire', error);
      });

    setComment('');
  };
  const handleToggleFavorite = () => {
    if (favorite) {
      api.removeFavorite(recette.id)
        .then(() => {
          setFavorite(false);
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression de la recette des favoris', error);
        });
    } else {
      api.addFavorite(recette.id)
        .then(() => {
          setFavorite(true);
        })
        .catch((error) => {
          console.error('Erreur lors de l\'ajout de la recette aux favoris', error);
        });
    }
  };

  return (
    <Container maxWidth="md">
      {recette ? (
        <Card>
          <CardContent>
            <div style={{ textAlign: 'center' }}>
              <Typography variant="h4" gutterBottom>
                {recette.title}
              </Typography>
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

          <CardActions>
            <Button
              onClick={handleToggleFavorite}
              variant="contained"
              color={favorite ? 'primary' : 'primary'}
            >
              {favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </Button>
          </CardActions>

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
              color="primary"
            >
              Ajouter un commentaire
            </Button>
          </CardActions>
        </Card>
      ) : (
        <p>Chargement en cours...</p>
      )}
    </Container>
  );
} 

export default RecetteDetailPage;

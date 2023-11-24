import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Container, Button } from "@mui/material";

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recettes } = location.state || {};

  
  const uniqueRecettes = Array.from(new Map(recettes.map(recette => [recette.id, recette])).values());

  const handleNavigate = (recetteId) => {
    navigate(`/recette/${recetteId}`);
  };

  const handleBackToMenu = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Résultats de Recherches
      </Typography>
      <Button 
        variant="contained" 
        onClick={handleBackToMenu}
        style={{ backgroundColor: "black", color: "white", marginBottom: '20px' }}
      >
        Retour au menu
      </Button>
      {uniqueRecettes &&
        uniqueRecettes.map((recette) => (
          <Card key={recette.id} style={{ marginBottom: "20px" }}>
            <CardContent>
              <Typography variant="h5">{recette.title}</Typography>
              <Typography color="black">{recette.description}</Typography>
              <Button
                variant="contained"
                style={{
                  marginTop: "10px",
                  backgroundColor: "black", 
                  color: "white", 
                  "&:hover": {
                    backgroundColor: "black",
                  },
                }}
                onClick={() => handleNavigate(recette.id)}
              >
                Voir les détails
              </Button>
            </CardContent>
          </Card>
        ))}
    </Container>
  );
};

export default SearchResultsPage;

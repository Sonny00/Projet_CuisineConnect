## Fonctionnalités
LUSCAP Sonny, GACEM Torkia Hala

Classe 5IWJ

Lien GitHub : https://github.com/Sonny00/Projet_CuisineConnect


```bash
touch .env # à la racine du projet
```

```bash
DB_USER=root
DB_PASSWORD=root
DB_NAME=db
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@localhost:5432/db?schema=public"
```


```bash
cd backend
touch .env # Créer un fichier .env dans le dossier backend et renseignez votre clé api OpenAI
OPENAI_API_KEY="Votre clé API"

cd front
touch .env # Créer un fichier .env dans le dossier front et renseignez votre clé api OpenAI
OPENAI_API_KEY="Votre clé API"


make start # pour lancer le projet
```
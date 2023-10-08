# Groupe 17

## Fonctionnalités

| fonctionnalité                 | back                                              | front                     |
| ------------------------------ | ------------------------------------------------- | ------------------------- |
| statistiques                   |                                                   | LUSCAP Sonny              |
| CRUD évenement                 | KHAN Mustakim                                     | TALAH Said                |
| CRUD employé                   | KHAN Mustakim / LUSCAP Sonny / EESHVARAN Kagistan | EESHVARAN Kagistan        |
| authentification/authorization | KHAN Mustakim / LUSCAP Sonny                      | LUSCAP Sonny / TALAH Said |
| compétences                    | KHAN Mustakim / GACEM Torkia Hala / LUSCAP Sonny  | GACEM Torkia Hala         |

## Développeurs

EESHVARAN Kagistan **_Raavanan1000_**  
GACEM Torkia Hala **_TORKIAHALA_**  
KHAN Mustakim **_Mustakim-Khan_**  
LUSCAP Sonny **_Sonny00_**  
TALAH Said **_izemaghilas_**

## Installation / Lancement du projet

```bash
make start # pour lancer le projet

# si make n'est pas installer
docker-compose up -d

docker-compose exec nestjs npm install
docker-compose exec react npm install

docker-compose exec -it nestjs npx prisma generate
docker-compose exec -it nestjs npx prisma db push
docker-compose exec -it nestjs npx prisma db seed

docker-compose exec -d nestjs npm run start:dev
docker-compose exec -d react npm start

# si docker n'est pas installer
# back
cd ./backend
npm install
npx prisma generate
npx prisma db push
npx prisma db seed
npm run start:dev
# front
cd ./front
npm install
npm start
```

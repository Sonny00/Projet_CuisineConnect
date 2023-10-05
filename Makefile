# Démarrage du projet 
up:
	docker-compose up -d

# Arret du projet 
down:
	docker-compose down

# lancer le projet
start:
	docker-compose up -d
	docker-compose exec nestjs npm install
	docker-compose exec react npm install
	docker-compose exec -it nestjs npx prisma generate
	docker-compose exec -it nestjs npx prisma db push
	docker-compose exec -it nestjs npx prisma db seed
	docker-compose exec -d nestjs npm run start:dev
	docker-compose exec -d react npm start

# commandes Back
back-install:
	docker-compose exec nestjs npm install
back-start:
	docker-compose exec nestjs npm run start:dev
back-shell:
	docker-compose exec -it nestjs /bin/sh
prisma-client:
	docker-compose exec -it nestjs npx prisma generate
prisma-db:
	docker-compose exec -it nestjs npx prisma db push
prisma-seed:
	docker-compose exec -it nestjs npx prisma db seed

# commandes Front
front-install:
	docker-compose exec react npm install
front-start:
	docker-compose exec react npm start



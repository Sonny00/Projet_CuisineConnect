import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from './jwt/jwt.service';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { RecetteSearchModule } from './recette-search/recette-search.module';
import { RecettesService } from './recette/recette.service';
import { RecettesModule } from './recette/recette.module';
import { CommentaireService } from './commentaire/commentaire.service';
import { CommentaireController } from './commentaire/commentaire.controller';
import { CommentaireModule } from './commentaire/commentaire.module';
import { FavorisModule } from './favoris/favoris.module';
import { FavoriteService } from './favoris/favoris.service';
import { NoteModule } from './notes/notes.module';
import { NoteService } from './notes/notes.service';
import { PreferenceModule } from './preference/preference.module';
import { PreferenceService } from './preference/preference.service';
import { RecetteBarModule } from './recetteBar/recetteBar.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    JwtModule,
    RecetteSearchModule,
    RecettesModule,
    CommentaireModule,
    FavorisModule,
    NoteModule,
    PreferenceModule,
    RecetteBarModule,
  ],
  // controllers: [AppController, AuthController],
  providers: [
    PrismaClient,
    JwtService,
    PrismaService,
    AuthService,
    RecettesService,
    CommentaireService,
    FavoriteService,
    NoteService,
    PreferenceService,
  ],
})
export class AppModule {}

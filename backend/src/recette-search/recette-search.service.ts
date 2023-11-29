import { Injectable } from '@nestjs/common';
import { historyManager } from './model/history-manager';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { answerRecetteInputDTO } from './model/answer-recette-search.dto';
import { answerRecetteOutputDTO } from './model/answer-recette-search.dto';
import * as dotenv from 'dotenv';
import { PromptTemplate } from 'langchain/prompts';

dotenv.config();

const DEFAULT_TEMPERATURE = 1;
const DEFAULT_MODEL = 'gpt-3.5-turbo';

@Injectable()
export class RecetteSearchService {
  private readonly history: historyManager;
  private readonly chat: ChatOpenAI;

  constructor() {
    this.history = new historyManager();
    this.chat = new ChatOpenAI({
      temperature: DEFAULT_TEMPERATURE,
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: DEFAULT_MODEL,
    });
  }

  async getAiModelAnswer(data: answerRecetteInputDTO) {
    this.history.addHumanMessage(data.message);
    const result = await this.chat.predictMessages(this.history.history);

    let aiMessage = result.content;

    aiMessage = this.addMichelinStarChefStyle(aiMessage);

    this.history.addAIMessage(aiMessage);
    return answerRecetteOutputDTO.getInstance(aiMessage);
  }

  async getRecetteSearchAnswer(data: answerRecetteInputDTO) {
    if (!this.isCuisineRelated(data.message)) {
      return answerRecetteOutputDTO.getInstance(
        "Désolé, je ne suis qu'un humble chef étoilé du guide Michelin. Je ne peux répondre qu'aux questions liées à la cuisine."
      );
    }
    return this.getAiModelAnswer(data);
  }

  private isCuisineRelated(message: string): boolean {
    const keywords = [
      'cuisine',
      'recette',
      'cuisiner',
      'plat',
      'ingrédient',
      'gastronomie',
      'cuisson',
      'marmiton',
      'gastronomique',
      'chef',
      'pâtisserie',
      'boulangerie',
      'grillade',
      'frire',
      'sauté',
      'braiser',
      'rôtir',
      'vapeur',
      'sous-vide',
      'mijoter',
      'poêle',
      'four',
      'mixeur',
      'robot culinaire',
      'épice',
      'herbe',
      'assaisonnement',
      'sauce',
      'entrée',
      'dessert',
      'végétarien',
      'vegan',
      'gluten',
      'lactose',
      'bio',
      'organique',
      'sommelier',
      'oenologie',
      'vin',
      'cocktail',
      'barman',
      'fruits de mer',
      'viande',
      'légume',
      'fruit',
      'céréale',
      'pâte',
  'asiatique', 'italienne', 'française', 'mexicaine', 'indienne', 'thai',
  'sushi', 'pizza', 'burger', 'salade', 'soupe', 'tartare',
  'émincer', 'hacher', 'trancher', 'pétrir', 'fouetter', 'battre',
  'poivrer', 'saler', 'épicer', 'mariner', 'caraméliser', 'infuser',
  'buffet', 'catering', 'service de table', 'vaisselle', 'présentation',
  'buffet', 'banquet', 'dégustation', 'accord mets-vins',
  'fromage', 'charcuterie', 'boulanger', 'pâtissier', 'traiteur',
  'alimentation', 'nutrition', 'diététique', 'fermentation', 'conservation',
  'hygiène', 'sécurité alimentaire', 'allergie', 'intolérance'
];

    return keywords.some((keyword) => message.toLowerCase().includes(keyword));
  }

  private addMichelinStarChefStyle(message: string): string {
    const michelinStarChefStyle = `
      En tant que chef étoilé Michelin avec plus de 15 ans d'expérience, je vous recommande d'approcher le plat avec une précision exquise. 
      L'art du risotto réside dans la lenteur de l'ajout du bouillon, en couches fines, en remuant constamment pour créer une texture crémeuse. 
      Les ingrédients doivent être d'une qualité exceptionnelle, choisis avec soin pour une harmonie de saveurs. 
      N'hésitez pas à ajouter une touche personnelle à chaque plat, c'est là que réside la véritable magie culinaire.
      Je réponds à toutes vos questions sur la cuisine, les recettes, les ingrédients, les plats, la gastronomie, etc.
      mais pas à autre en dehors de ce domaine.
    `;

    return `${message}\n\n${michelinStarChefStyle}`;
  }
}

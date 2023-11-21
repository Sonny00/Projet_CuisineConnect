import { Injectable } from '@nestjs/common';
import { historyManager } from './model/history-manager';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { answerRecetteInputDTO } from './model/answer-recette-search.dto';
import { answerRecetteOutputDTO } from './model/answer-recette-search.dto';
import * as dotenv from 'dotenv';

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
        'Je suis spécialisé dans les questions culinaires. Posez-moi une question sur la cuisine !',
      );
    }
    return this.getAiModelAnswer(data);
  }

  private isCuisineRelated(message: string): boolean {
    // Implémentez une logique pour déterminer si la question est liée à la cuisine
    // Par exemple, en recherchant des mots-clés spécifiques liés à la cuisine
    const keywords = [
      'cuisine',
      'recette',
      'cuisiner',
      'plat',
      'ingrédient',
      'gastronomie',
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

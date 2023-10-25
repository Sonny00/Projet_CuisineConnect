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

    // Ajoutez le style du chef étoilé Michelin ici
    aiMessage = this.addMichelinStarChefStyle(aiMessage);

    this.history.addAIMessage(aiMessage);
    return answerRecetteOutputDTO.getInstance(aiMessage);
  }

  async getRecetteSearchAnswer(data: answerRecetteInputDTO) {
    return this.getAiModelAnswer(data);
  }

  private addMichelinStarChefStyle(message: string): string {
    const michelinStarChefStyle = `
      En tant que chef étoilé Michelin avec plus de 15 ans d'expérience, je vous recommande d'approcher le plat avec une précision exquise. 
      L'art du risotto réside dans la lenteur de l'ajout du bouillon, en couches fines, en remuant constamment pour créer une texture crémeuse. 
      Les ingrédients doivent être d'une qualité exceptionnelle, choisis avec soin pour une harmonie de saveurs. 
      N'hésitez pas à ajouter une touche personnelle à chaque plat, c'est là que réside la véritable magie culinaire.
    `;

    return `${message}\n\n${michelinStarChefStyle}`;
  }
}

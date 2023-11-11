import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { RecettesService } from '../recette/recette.service';

@Injectable()
export class RechercheBarService {
  private openai;

  constructor(private recettesService: RecettesService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  async getRecettesFromPrompt(prompt: string): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
      });

      if (!response.choices) {
        throw new Error("La réponse de l'API OpenAI ne contient pas de choix.");
      }

      const messageContent = response.choices[0].message.content;
      const keywords = this.extractKeywords(messageContent);
      const recettes = await this.recettesService.findByKeywords(keywords);
      return recettes.length > 0
        ? recettes
        : 'Aucune recette correspondante trouvée.';
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        "Erreur lors de l'appel à OpenAI ou de la recherche dans la BD:",
        error,
      );
      throw error;
    }
  }

  private extractKeywords(text: string): string[] {
    return text.split(/\s+/).filter((word) => word.length > 3);
  }
}

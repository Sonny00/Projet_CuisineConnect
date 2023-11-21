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
          {
            role: 'system',
            content:
              "Tu es une barre de recherche je vais te demander des instructions avec certains ingrédients tu dois me donner uniquement le nom de la recette ou les recettes qui corresponde à la demande, tu n'as que ces recettes en mémoire et rien d'autre :'Poulet au citron et à l'ail','Spaghetti Carbonara','Salade César','Ratatouille','Tarte aux pommes','Sushi au Saumon','Curry de Poulet','Salade de Quinoa','Tacos au Bœuf','Gâteau au chocolat','Tiramisu','Tarte aux fraises','Salade de fruits','Salade de pommes de terre','Salade de pâtes', Si je pose une question qui n'a pas de lien avec la cuisine de près ou de loin, tu ne réponds pas en expliquant que tu n'est pas habilité pour répondre à des questions qui n'ont pas de lien avec la cuisine, tu as le droit de dire uniquement le nom des recettes que tu as en mémoire rien d'autre, tu ne dois pas faire de phrase tu dois répondre que par les recettes correspondantes que tu as en mémoire",
          },
          { role: 'system', content: prompt },
        ],
      });

      const generatedMessage = response.choices[0].message.content;
      // eslint-disable-next-line
      console.log('Contenu du message généré :', generatedMessage);
      if (!response.choices) {
        throw new Error("La réponse de l'API OpenAI ne contient pas de choix.");
      }
      // Recherchez directement la recette par son titre
      const recette = await this.recettesService.findByTitle(generatedMessage);
      return recette || 'Aucune recette correspondante trouvée.';
    } catch (error) {
      //eslint-disable-next-line
    console.error(
        "Erreur lors de l'appel à OpenAI ou de la recherche dans la BD:",
        error,
      );
      throw error;
    }
  }
  private extractKeywords(text: string): string[] {
    const keywordSet = new Set<string>();

    text.split(/\s+/).forEach((word) => {
      if (word.length > 3 && this.isIngredient(word)) {
        const lowerCaseKeyword = word.toLowerCase();
        keywordSet.add(word);
        console.log(`Mot-clé extrait : ${word}`)
      }
    });

    return Array.from(keywordSet);
  }

  private isIngredient(word: string): boolean {
    const commonIngredients = [
      'poulet',
      'citron',
      'ail',
      'huile',
      'poivre',
      'pomme',
      'chocolat',
      'saumon',
      'quinoa',
      'bœuf',
      'tomate',
      'fraise',
      'Tarte aux Fraises',
      "Poulet au citron et l'ail",
      'Salade César',
      'Ratatouille',
      'Tarte aux pommes',
      'Sushi au saumon',
      'Salade de quinoa',
    ]; // etc.
    return commonIngredients.includes(word.toLowerCase());
  }
}

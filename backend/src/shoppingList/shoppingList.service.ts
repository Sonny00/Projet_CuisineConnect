import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class ShoppingListService {
  constructor(private httpService: HttpService) {}

  async generateShoppingList(ingredients: string[]): Promise<string> {
    const prompt = `Créer une liste de courses à partir de ces ingrédients : ${ingredients.join(', ')}`;
    try {
      const response = await this.httpService
        .post(
          'https://api.openai.com/v1/engines/text-davinci-003/completions',
          {
            prompt: prompt,
            max_tokens: 150,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer VOTRE_CLÉ_API`,
            },
          },
        )
        .toPromise();

      return response.data.choices[0].text.trim();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        'Erreur lors de la génération de la liste de courses',
        error,
      );
      throw new Error("Erreur lors de la communication avec l'API OpenAI");
    }
  }
}

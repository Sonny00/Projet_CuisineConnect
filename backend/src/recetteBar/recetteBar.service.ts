import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { RecettesService } from '../recette/recette.service';

@Injectable()
export class RechercheBarService {
  private openai;
  private recettes = [
    {
      title: "Poulet au citron et à l'ail",
      ingredients: [
        'Poitrines de poulet',
        'Jus de citron',
        'Ail haché',
        "Huile d'olive",
        'Sel et poivre',
      ],
    },
    {
      title: 'Spaghetti Carbonara',
      ingredients: [
        'Spaghettis',
        'Pancetta',
        'Œufs',
        'Parmesan râpé',
        'Poivre noir',
      ],
    },
    {
      title: 'Salade César',
      ingredients: [
        'Laitue romaine',
        'Croûtons',
        'Parmesan râpé',
        'Poulet grillé (facultatif)',
        'Sauce César',
      ],
    },
    {
      title: 'Ratatouille',
      ingredients: [
        'Aubergine',
        'Courgette',
        'Poivron',
        'Oignon',
        'Tomates',
        'Ail',
        'Herbes de Provence',
      ],
    },
    {
      title: 'Tarte aux pommes',
      ingredients: ['Pâte brisée', 'Pommes', 'Sucre', 'Cannelle', 'Beurre'],
    },
    {
      title: 'Sushi au Saumon',
      ingredients: [
        'Riz à sushi',
        'Saumon',
        'Feuilles de nori',
        'Wasabi',
        'Sauce soja',
      ],
    },
    {
      title: 'Curry de Poulet',
      ingredients: [
        'Blancs de poulet',
        'Oignon',
        'Curry en poudre',
        'Lait de coco',
        'Légumes de votre choix',
        'Riz basmati',
      ],
    },
    {
      title: 'Salade de Quinoa',
      ingredients: [
        'Quinoa',
        'Concombres',
        'Tomates',
        'Poivrons',
        'Oignons rouges',
        "Huile d'olive",
        'Jus de citron',
        'Sel et poivre',
      ],
    },
    {
      title: 'Tacos au Bœuf',
      ingredients: [
        'Bœuf haché',
        'Épices mexicaines',
        'Tomates',
        'Laitue',
        'Crème sure',
        'Fromage râpé',
        'Tortillas de maïs',
      ],
    },
    {
      title: 'Gâteau au chocolat',
      ingredients: [
        'Farine',
        'Cacao en poudre',
        'Sucre',
        'Levure chimique',
        'Sel',
        'Beurre fondu',
        'Œufs',
      ],
    },
    {
      title: 'Tiramisu',
      ingredients: [
        'Mascarpone',
        'Sucre',
        'Œufs',
        'Biscuits',
        'Café',
        'Cacao en poudre',
      ],
    },
    {
      title: 'Tarte aux fraises',
      ingredients: ['Biscuits Graham', 'Beurre fondu', 'Garniture aux fraises'],
    },
    {
      title: 'Salade de fruits',
      ingredients: [
        'Fraises',
        'Bananes',
        'Oranges',
        'Pommes',
        'Jus de citron',
        'Sucre',
      ],
    },
    {
      title: 'Salade de pommes de terre',
      ingredients: ['Pommes de terre', 'Oignons', 'Mayonnaise', 'Moutarde'],
    },
    {
      title: 'Salade de pâtes',
      ingredients: [
        'Pâtes',
        'Tomates',
        'Concombres',
        'Olives',
        'Huile d’olive',
        'Vinaigre balsamique',
        'Sel et poivre',
      ],
    },
  ];

  constructor(private recettesService: RecettesService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  private formatRecettes() {
    return this.recettes
      .map((recette) => `${recette.title}: [${recette.ingredients.join(', ')}]`)
      .join('; ');
  }

  async getRecettesFromPrompt(prompt: string): Promise<any> {
    const formattedRecettes = this.formatRecettes();
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Tu es une barre de recherche... Voici les recettes et leurs ingrédients en mémoire : ${formattedRecettes}.  je vais te donner des instructions avec certains ingrédients ou des instructions. Tu dois me donner uniquement le nom de la recette ou les recettes qui corresponde à la demande, Tu n'as que ces recettes et leurs ingrédients en mémoire et rien d'autre. Si je pose une question qui n'a pas de lien avec la cuisine de près ou de loin, tu ne réponds pas en expliquant que tu n'est pas habilité pour répondre à des questions qui n'ont pas de lien avec la cuisine, tu as le droit de répondre uniquement avec le nom des recettes que tu as en mémoire rien d'autre, tu ne dois pas faire de phrase, tu ne dois jamais faire de phrase. Tu dois répondre UNIQUEMENT par les recettes correspondantes que tu as en mémoire en fonction de la demande. Tu dois me retourner le titre de la recette ou les recettes si le ou les ingrédients  ou le ou les titres sont énoncés dans les instructions. Si ils ne sont pas énoncés dans les instructions tu ne retourne rien et tu explique que tu n'as pas ça en mémoire. N'oublie pas que tu es insensible à la casse et que tu ne retournes jamais de phrase, juste le titre de la recette avec la première lettre en majuscule `,
          },
          { role: 'system', content: prompt },
        ],
      });

      const generatedMessage = response.choices[0].message.content;
      // eslint-disable-next-line
      console.log('Contenu du message généré :', generatedMessage);
      // eslint-disable-next-line
      console.log('wtf', formattedRecettes);
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

  async getSimilarRecipesFromPrompt(prompt: string): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
            "Tu es une barre de recherche... Voici les recettes et leurs ingrédients que tu as en mémoire : ${formattedRecettes}. Tu ne connais que ces recettes aucunes autres. Tu ne dois jamais répondre par autre chose que par ces titres de recettes. Je vais te donner des titres de recette, en fonction du titre que je vais te donner tu vas me donner le ou les recettes similaires parmis celle que tu as en mémoire. Tu dois me donner uniquement le nom de la recette ou les recettes qui correspondent où les recette qui correspondent, tu ne fais jamais de phrase tu réponds juste par le titre de la recette ou les recettes correspondant si il y en a et rien d'autre. Tu n'es pas habilité à répondre à quoi que ce soit d'autre. TU REPONDS TOUJOURS UNIQUEMENT PAR LE TITRE DE LA OU DES RECETTES TU NE FAIS JAMAIS JAMAIS DE PHRASE ET OU AUTRE CHOSE QUE LA OU LES TITRES DE LA OU LES RECETTES",
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

  async getRecipeBySeason(prompt: string): Promise<any> {
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'Sachant que nous sommes en hiver, le 28 novembre 2023, quelle sont les ingrédients ou fruits que tu recommanderais pour cette saison ?',
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
}

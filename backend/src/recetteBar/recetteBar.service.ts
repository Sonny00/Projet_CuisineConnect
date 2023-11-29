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
            content: `Tu es une barre de recherche... Voici les recettes et leurs ingrédients que tu as en mémoire : ${formattedRecettes}. Tu ne connais que ces recettes et aucunes autres. Tu ne dois jamais répondre par autre chose que par les titres des recettes que tu as en mémoire.Tu ne dois jamais me retourner la même recette que je te donne. N'oublie surtout pas, tu dois toujours répondre avec des recettes que tu as en mémoire, pas de phrase ou autre chose, toujours les recettes que tu as en mémoire. Je vais te donner un titre de recette et en fonction du titre que je vais te donner. Tu dois retouner le ou les recettes similaires parmis celle que tu as en mémoire vis-à-vis du en fonction de titre que je t'ai donnée Par exemple : Si je te donne 'tarte aux pommes' tu peux me donner toutes les tartes et déssert que tu as en mémoire. Je te le rappel encore, tu dois toujours utiliser les recettes que tu as en mémoire. Quand je parle de recette similaire, je parle de recette qui ont des ingrédients communs ou titres communs ou même catégories ( Exemple de catégorie : 'Déssert' ) Tu dois me retourner uniquement le nom de la recette ou des recettes qui correspondent. Jamais autre chose. Tu ne fais jamais de phrase tu réponds toujours pas le titre d'une recette. Si tu ne trouve pas de recette similaire à la demande par rapport à ce que tu as en mémoire tu ne retournes rien. N'oublie pas que tu as que ces recettes en mémoire et rien d'autre !!!! : ${formattedRecettes}`,
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
    const formattedRecettes = this.formatRecettes();
    try {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Tu es une barre de recherche... Voici les recettes et leurs ingrédients que tu as en mémoire : ${formattedRecettes}. Tu ne connais que ces recettes et aucunes autres. Je vais te donner des recettes tu vas me donner des recettes similaire par rapport à ce que tu as en mémoire. Tu ne dois pas faire de phrase juste me retourner, la ou les recettes similaires que tu as en mémoire`,
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

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
    "title": "Salade César",
    "ingredients": [
      "Laitue romaine",
      "Croûtons",
      "Parmesan râpé",
      "Poulet grillé (facultatif)",
      "Sauce César"
    ]
  },
  {
    "title": "Ratatouille",
    "ingredients": [
      "Aubergine",
      "Courgette",
      "Poivron",
      "Oignon",
      "Tomates",
      "Ail",
      "Herbes de Provence"
    ]
  },
  {
    "title": "Tarte aux pommes",
    "ingredients": [
      "Pâte brisée",
      "Pommes",
      "Sucre",
      "Cannelle",
      "Beurre"
    ]
  },
  {
    "title": "Sushi au Saumon",
    "ingredients": [
      "Riz à sushi",
      "Saumon",
      "Feuilles de nori",
      "Wasabi",
      "Sauce soja"
    ]
  },
  {
    "title": "Curry de Poulet",
    "ingredients": [
      "Blancs de poulet",
      "Oignon",
      "Curry en poudre",
      "Lait de coco",
      "Légumes de votre choix",
      "Riz basmati"
    ]
  },
  {
    "title": "Salade de Quinoa",
    "ingredients": [
      "Quinoa",
      "Concombres",
      "Tomates",
      "Poivrons",
      "Oignons rouges",
      "Huile d'olive",
      "Jus de citron",
      "Sel et poivre"
    ]
  },
  {
    "title": "Tacos au Bœuf",
    "ingredients": [
      "Bœuf haché",
      "Épices mexicaines",
      "Tomates",
      "Laitue",
      "Crème sure",
      "Fromage râpé",
      "Tortillas de maïs"
    ]
  },
  {
    "title": "Gâteau au chocolat",
    "ingredients": [
      "Farine",
      "Cacao en poudre",
      "Sucre",
      "Levure chimique",
      "Sel",
      "Beurre fondu",
      "Œufs"
    ]
  },
  {
    "title": "Tiramisu",
    "ingredients": [
      "Mascarpone",
      "Sucre",
      "Œufs",
      "Biscuits",
      "Café",
      "Cacao en poudre"
    ]
  },
  {
    "title": "Tarte aux fraises",
    "ingredients": [
      "Biscuits Graham",
      "Beurre fondu",
      "Garniture aux fraises"
    ]
  },
  {
    "title": "Salade de fruits",
    "ingredients": [
      "Fraises",
      "Bananes",
      "Oranges",
      "Pommes",
      "Jus de citron",
      "Sucre"
    ]
  },
  {
    "title": "Salade de pommes de terre",
    "ingredients": [
      "Pommes de terre",
      "Oignons",
      "Mayonnaise",
      "Moutarde"
    ]
  },
  {
    "title": "Salade de pâtes",
    "ingredients": [
      "Pâtes",
      "Tomates",
      "Concombres",
      "Olives",
      "Huile d’olive",
      "Vinaigre balsamique",
      "Sel et poivre"
    ]
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
              "Tu dois toujours répondre par le titre d'une recette que tu as en mémoire tu ne dois jamais faire de phrase : 'Poulet au citron et à l'ail','Spaghetti Carbonara','Salade César','Ratatouille','Tarte aux pommes','Sushi au Saumon','Curry de Poulet','Salade de Quinoa','Tacos au Bœuf','Gâteau au chocolat','Tiramisu','Tarte aux fraises','Salade de fruits','Salade de pommes de terre','Salade de pâtes' sont les recettes que tu as en mémoire, Tu ne connais que ces recettes aucunes autres. Tu ne dois jamais répondre par autre chose que par ces titres de recettes. Tu es une barre de recherche je vais te demander en fonction du titre d'une recette les recettes similaires parmis celle que tu as en mémoire, tu peux te baser sur les ingrédients, mais tu dois me donner uniquement le nom de la recette ou des recettes qui correspondent à la demande, tu n'as que ces recettes en mémoire et rien d'autre :'Poulet au citron et à l'ail','Spaghetti Carbonara','Salade César','Ratatouille','Tarte aux pommes','Sushi au Saumon','Curry de Poulet','Salade de Quinoa','Tacos au Bœuf','Gâteau au chocolat','Tiramisu','Tarte aux fraises','Salade de fruits','Salade de pommes de terre','Salade de pâtes', Si je pose une question qui n'a pas de lien avec la cuisine de près ou de loin, tu ne réponds pas en expliquant que tu n'est pas habilité pour répondre à des questions qui n'ont pas de lien avec la cuisine, tu as le droit de répondre uniquement avec le nom des recettes que tu as en mémoire rien d'autre, tu ne dois pas faire de phrase, tu ne dois jamais faire de phrase. Tu dois répondre UNIQUEMENT par les recettes correspondantes que tu as en mémoire en fonction de la demande.",
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

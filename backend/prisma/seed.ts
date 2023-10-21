import { PrismaClient, User, Recette } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const hashedPassword =
  '$2a$12$77NK1cuwhri3H.PV6g8IEu8JC18DTkZyssmKIEBFM5jg1pP8/7xqm'; // Mot de passe : password

async function insertAdmin() {
  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'ADMIN',
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
    },
  });

  // eslint-disable-next-line no-console
  console.log('admin inserted');
}

async function insertUsers() {
  const email1 = 'user@example.com';
  const email2 = 'user1@example.com';
  const email3 = 'user2@example.com';

  const user1 = await prisma.user.create({
    data: {
      email: email1,
      password: hashedPassword,
      role: 'USER',
      firstname: 'Jack',
      lastname: 'Doe',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: email2,
      password: hashedPassword,
      role: 'USER',
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: email3,
      password: hashedPassword,
      role: 'USER',
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
    },
  });
  return [user1, user2, user3];

  // eslint-disable-next-line no-console
  console.log('users inserted');
}
async function insertRecettes() {
  const recette1 = await prisma.recette.create({
    data: {
      title: "Poulet au citron et à l'ail",
      description:
        "Poitrines de poulet Jus de citron Ail haché Huile d'olive Sel et poivre",
      instructions:
        "Faites mariner le poulet dans le jus de citron, l'ail, l'huile d'olive, le sel et le poivre pendant environ 30 minutes.Faites cuire le poulet à la poêle jusqu'à ce qu'il soit bien cuit et doré.",
      ingredients:
        "Poitrines de poulet Jus de citron Ail haché Huile d'olive Sel et poivre",
    },
  });
  const recette2 = await prisma.recette.create({
  data: {
    title: "Spaghetti Carbonara",
    description: "Un plat de pâtes italien classique avec une sauce crémeuse à base d'œufs, de pancetta et de parmesan.",
    instructions: "1. Faites cuire les spaghettis selon les instructions sur l'emballage.\n2. Dans une poêle, faites revenir la pancetta jusqu'à ce qu'elle soit croustillante.\n3. Mélangez les œufs, le parmesan râpé et le poivre dans un bol.\n4. Égouttez les spaghettis cuits, ajoutez-les à la poêle avec la pancetta, puis versez le mélange d'œufs et mélangez bien.",
    ingredients: "ingredients :\n- Spaghettis\n- Pancetta\n- Œufs\n- Parmesan râpé\n- Poivre noir",
  },
});


 const recette3 = await prisma.recette.create({
  data: {
    title: "Salade César",
    description: "Une salade rafraîchissante avec de la laitue, des croûtons, du parmesan et une délicieuse sauce César.",
    instructions: "1. Lavez et déchirez la laitue en morceaux.\n2. Ajoutez des croûtons, du parmesan râpé et du poulet grillé si vous le souhaitez.\n3. Arrosez de sauce César et mélangez.",
    ingredients: "Ingrédients :\n- Laitue romaine\n- Croûtons\n- Parmesan râpé\n- Poulet grillé (facultatif)\n- Sauce César",
  },
});

const recette4 = await prisma.recette.create({
  data: {
    title: "Ratatouille",
    description: "Un plat provençal délicieux composé d'aubergines, de courgettes, de poivrons et de tomates.",
    instructions: "1. Coupez tous les légumes en morceaux.\n2. Faites revenir l'oignon et l'ail dans de l'huile d'olive, puis ajoutez les légumes.\n3. Laissez mijoter jusqu'à ce que les légumes soient tendres, puis saupoudrez d'herbes de Provence.",
    ingredients: "Ingrédients :\n- Aubergine\n- Courgette\n- Poivron\n- Oignon\n- Tomates\n- Ail\n- Herbes de Provence",
  },
});

  
  const recette5 = await prisma.recette.create({
  data: {
    title: "Tarte aux pommes",
    description: "Une délicieuse tarte aux pommes sucrée avec une touche de cannelle.",
    instructions: "1. Préchauffez le four à 180 °C.\n2. Abaissez la pâte dans un moule à tarte.\n3. Épluchez, coupez et disposez les pommes sur la pâte.\n4. Saupoudrez de sucre et de cannelle, puis ajoutez des petits morceaux de beurre.\n5. Faites cuire au four jusqu'à ce que la tarte soit dorée.",
    ingredients: "Ingrédients :\n- Pâte brisée\n- Pommes\n- Sucre\n- Cannelle\n- Beurre",
  },
  });
  
  const recette6 = await prisma.recette.create({
  data: {
    title: "Sushi au Saumon",
    description: "Des sushis frais et délicieux au saumon, parfaits pour les amateurs de cuisine japonaise.",
    instructions: "1. Cuisez le riz à sushi selon les instructions sur l'emballage, puis laissez-le refroidir.\n2. Coupez le saumon en fines tranches.\n3. Étalez une fine couche de riz sur une feuille de nori, ajoutez une tranche de saumon, puis roulez le tout en un sushi.\n4. Coupez les rouleaux en morceaux et servez avec du wasabi et de la sauce soja.",
    ingredients: "Ingrédients :\n- Riz à sushi\n- Saumon\n- Feuilles de nori\n- Wasabi\n- Sauce soja",
  },
  });
  
  const recette7 = await prisma.recette.create({
  data: {
    title: "Curry de Poulet",
    description: "Un curry de poulet épicé et savoureux, parfait pour réchauffer les soirées d'hiver.",
    instructions: "1. Faites revenir l'oignon dans de l'huile d'olive jusqu'à ce qu'il soit doré.\n2. Ajoutez le poulet coupé en morceaux et faites-le cuire jusqu'à ce qu'il soit doré.\n3. Ajoutez le curry en poudre, le lait de coco, les légumes de votre choix et laissez mijoter jusqu'à ce que le tout soit bien cuit.\n4. Servez avec du riz basmati.",
    ingredients: "Ingrédients :\n- Blancs de poulet\n- Oignon\n- Curry en poudre\n- Lait de coco\n- Légumes de votre choix\n- Riz basmati",
  },
});

const recette8 = await prisma.recette.create({
  data: {
    title: "Salade de Quinoa",
    description: "Une salade saine et colorée à base de quinoa, de légumes et d'une vinaigrette légère.",
    instructions: "1. Cuisez le quinoa selon les instructions sur l'emballage, puis laissez-le refroidir.\n2. Coupez des légumes frais tels que des concombres, des tomates, des poivrons et des oignons rouges en petits dés.\n3. Préparez une vinaigrette légère à base d'huile d'olive, de jus de citron, de sel et de poivre.\n4. Mélangez le quinoa, les légumes et la vinaigrette dans un grand saladier.",
    ingredients: "Ingrédients :\n- Quinoa\n- Concombres\n- Tomates\n- Poivrons\n- Oignons rouges\n- Huile d'olive\n- Jus de citron\n- Sel et poivre",
  },
});

  const recette9 = await prisma.recette.create({
  data: {
    title: "Tacos au Bœuf",
    description: "Des tacos délicieusement garnis de bœuf haché, de légumes et de garnitures au choix.",
    instructions: "1. Faites cuire le bœuf haché avec des épices mexicaines jusqu'à ce qu'il soit bien cuit.\n2. Préparez des garnitures telles que des tomates en dés, de la laitue râpée, de la crème sure et du fromage râpé.\n3. Réchauffez les tortillas de maïs, puis garnissez-les de bœuf, de garnitures et de sauce au choix.",
    ingredients: "Ingrédients :\n- Bœuf haché\n- Épices mexicaines\n- Tomates\n- Laitue\n- Crème sure\n- Fromage râpé\n- Tortillas de maïs",
  },
});




  return [recette1, recette2, recette3,recette4,recette5,recette6,recette7,recette8,recette9];
}

async function resetDB() {
  await prisma.user.deleteMany({});

  // eslint-disable-next-line no-console
  console.log('database reset');
}

async function main() {
  await resetDB();
  await insertAdmin();
  const users = await insertUsers();
  const recettes = await insertRecettes();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

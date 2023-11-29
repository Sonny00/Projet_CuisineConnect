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
      type: 'Plat principal',
    },
  });
  const recette2 = await prisma.recette.create({
    data: {
      title: 'Spaghetti Carbonara',
      description:
        "Un plat de pâtes italien classique avec une sauce crémeuse à base d'œufs, de pancetta et de parmesan.",
      instructions:
        "1. Faites cuire les spaghettis selon les instructions sur l'emballage.\n2. Dans une poêle, faites revenir la pancetta jusqu'à ce qu'elle soit croustillante.\n3. Mélangez les œufs, le parmesan râpé et le poivre dans un bol.\n4. Égouttez les spaghettis cuits, ajoutez-les à la poêle avec la pancetta, puis versez le mélange d'œufs et mélangez bien.",
      ingredients:
        'ingredients :\n- Spaghettis\n- Pancetta\n- Œufs\n- Parmesan râpé\n- Poivre noir',
      type: ' Plat principal',
    },
  });

  const recette3 = await prisma.recette.create({
    data: {
      title: 'Salade César',
      description:
        'Une salade rafraîchissante avec de la laitue, des croûtons, du parmesan et une délicieuse sauce César.',
      instructions:
        '1. Lavez et déchirez la laitue en morceaux.\n2. Ajoutez des croûtons, du parmesan râpé et du poulet grillé si vous le souhaitez.\n3. Arrosez de sauce César et mélangez.',
      ingredients:
        'Ingrédients :\n- Laitue romaine\n- Croûtons\n- Parmesan râpé\n- Poulet grillé (facultatif)\n- Sauce César',
      type: ' Entrée',
    },
  });

  const recette4 = await prisma.recette.create({
    data: {
      title: 'Ratatouille',
      description:
        "Un plat provençal délicieux composé d'aubergines, de courgettes, de poivrons et de tomates.",
      instructions:
        "1. Coupez tous les légumes en morceaux.\n2. Faites revenir l'oignon et l'ail dans de l'huile d'olive, puis ajoutez les légumes.\n3. Laissez mijoter jusqu'à ce que les légumes soient tendres, puis saupoudrez d'herbes de Provence.",
      ingredients:
        'Ingrédients :\n- Aubergine\n- Courgette\n- Poivron\n- Oignon\n- Tomates\n- Ail\n- Herbes de Provence',
      type: ' Plat principal',
    },
  });

  const recette5 = await prisma.recette.create({
    data: {
      title: 'Tarte aux pommes',
      description:
        'Une délicieuse tarte aux pommes sucrée avec une touche de cannelle.',
      instructions:
        "1. Préchauffez le four à 180 °C.\n2. Abaissez la pâte dans un moule à tarte.\n3. Épluchez, coupez et disposez les pommes sur la pâte.\n4. Saupoudrez de sucre et de cannelle, puis ajoutez des petits morceaux de beurre.\n5. Faites cuire au four jusqu'à ce que la tarte soit dorée.",
      ingredients:
        'Ingrédients :\n- Pâte brisée\n- Pommes\n- Sucre\n- Cannelle\n- Beurre',
      type: ' Dessert',
    },
  });

  const recette6 = await prisma.recette.create({
    data: {
      title: 'Sushi au Saumon',
      description:
        'Des sushis frais et délicieux au saumon, parfaits pour les amateurs de cuisine japonaise.',
      instructions:
        "1. Cuisez le riz à sushi selon les instructions sur l'emballage, puis laissez-le refroidir.\n2. Coupez le saumon en fines tranches.\n3. Étalez une fine couche de riz sur une feuille de nori, ajoutez une tranche de saumon, puis roulez le tout en un sushi.\n4. Coupez les rouleaux en morceaux et servez avec du wasabi et de la sauce soja.",
      ingredients:
        'Ingrédients :\n- Riz à sushi\n- Saumon\n- Feuilles de nori\n- Wasabi\n- Sauce soja',
      type: ' Plat principal',
    },
  });

  const recette7 = await prisma.recette.create({
    data: {
      title: 'Curry de Poulet',
      description:
        "Un curry de poulet épicé et savoureux, parfait pour réchauffer les soirées d'hiver.",
      instructions:
        "1. Faites revenir l'oignon dans de l'huile d'olive jusqu'à ce qu'il soit doré.\n2. Ajoutez le poulet coupé en morceaux et faites-le cuire jusqu'à ce qu'il soit doré.\n3. Ajoutez le curry en poudre, le lait de coco, les légumes de votre choix et laissez mijoter jusqu'à ce que le tout soit bien cuit.\n4. Servez avec du riz basmati.",
      ingredients:
        'Ingrédients :\n- Blancs de poulet\n- Oignon\n- Curry en poudre\n- Lait de coco\n- Légumes de votre choix\n- Riz basmati',
      type: ' Plat principal',
    },
  });

  const recette8 = await prisma.recette.create({
    data: {
      title: 'Salade de Quinoa',
      description:
        "Une salade saine et colorée à base de quinoa, de légumes et d'une vinaigrette légère.",
      instructions:
        "1. Cuisez le quinoa selon les instructions sur l'emballage, puis laissez-le refroidir.\n2. Coupez des légumes frais tels que des concombres, des tomates, des poivrons et des oignons rouges en petits dés.\n3. Préparez une vinaigrette légère à base d'huile d'olive, de jus de citron, de sel et de poivre.\n4. Mélangez le quinoa, les légumes et la vinaigrette dans un grand saladier.",
      ingredients:
        "Ingrédients :\n- Quinoa\n- Concombres\n- Tomates\n- Poivrons\n- Oignons rouges\n- Huile d'olive\n- Jus de citron\n- Sel et poivre",
      type: ' Entrée',
    },
  });

  const recette9 = await prisma.recette.create({
    data: {
      title: 'Tacos au Bœuf',
      description:
        'Des tacos délicieusement garnis de bœuf haché, de légumes et de garnitures au choix.',
      instructions:
        "1. Faites cuire le bœuf haché avec des épices mexicaines jusqu'à ce qu'il soit bien cuit.\n2. Préparez des garnitures telles que des tomates en dés, de la laitue râpée, de la crème sure et du fromage râpé.\n3. Réchauffez les tortillas de maïs, puis garnissez-les de bœuf, de garnitures et de sauce au choix.",
      ingredients:
        'Ingrédients :\n- Bœuf haché\n- Épices mexicaines\n- Tomates\n- Laitue\n- Crème sure\n- Fromage râpé\n- Tortillas de maïs',
      type: ' Plat principal',
    },
  });

  const recette10 = await prisma.recette.create({
    data: {
      title: 'Gâteau au chocolat',
      description: 'Un délicieux gâteau au chocolat moelleux et fondant.',
      instructions:
        '1. Préchauffez le four à 180 °C.\n2. Mélangez la farine, le cacao en poudre, le sucre, la levure, le sel et le beurre fondu dans un bol.\n3. Ajoutez les œufs et mélangez bien.\n4. Versez la pâte dans un moule beurré et fariné.\n5. Faites cuire au four pendant 25-30 minutes.\n6. Laissez refroidir avant de déguster.',
      ingredients:
        'Ingrédients :\n- Farine\n- Cacao en poudre\n- Sucre\n- Levure chimique\n- Sel\n- Beurre fondu\n- Œufs',
      type: 'Dessert',
    },
  });

  const recette11 = await prisma.recette.create({
    data: {
      title: 'Tiramisu',
      description:
        'Un dessert italien classique composé de biscuits imbibés de café et de crème au mascarpone.',
      instructions:
        '1. Mélangez le mascarpone, le sucre et les jaunes d’œufs dans un bol.\n2. Battez les blancs d’œufs en neige et incorporez-les au mélange.\n3. Trempez les biscuits dans le café et disposez-les dans un plat.\n4. Étalez une couche de crème sur les biscuits.\n5. Répétez l’opération jusqu’à ce que le plat soit plein.\n6. Saupoudrez de cacao en poudre et réfrigérez pendant au moins 4 heures.',
      ingredients:
        'Ingrédients :\n- Mascarpone\n- Sucre\n- Œufs\n- Biscuits\n- Café\n- Cacao en poudre',
      type: 'Dessert',
    },
  });

  const recette12 = await prisma.recette.create({
    data: {
      title: 'Tarte aux fraises',
      description:
        'Une délicieuse tarte aux fraises avec une croûte de biscuits Graham.',
      instructions:
        '1. Préchauffez le four à 180 °C.\n2. Mélangez les biscuits Graham écrasés et le beurre fondu.\n3. Étalez le mélange dans un moule à tarte et faites cuire au four pendant 10 minutes.\n4. Laissez refroidir, puis ajoutez la garniture aux fraises.\n5. Réfrigérez pendant au moins 2 heures avant de servir.',
      ingredients:
        'Ingrédients :\n- Biscuits Graham\n- Beurre fondu\n- Garniture aux fraises',
      type: 'Dessert',
    },
  });

  const recette13 = await prisma.recette.create({
    data: {
      title: 'Salade de fruits',
      description:
        'Une salade de fruits fraîche et savoureuse avec des fraises, des bananes, des oranges et des pommes.',
      instructions:
        '1. Coupez les fruits en morceaux.\n2. Mélangez-les dans un saladier.\n3. Ajoutez du jus de citron et du sucre si vous le souhaitez.\n4. Réfrigérez pendant au moins 1 heure avant de servir.',
      ingredients:
        'Ingrédients :\n- Fraises\n- Bananes\n- Oranges\n- Pommes\n- Jus de citron\n- Sucre',
      type: 'Dessert',
    },
  });

  const recette14 = await prisma.recette.create({
    data: {
      title: 'Salade de pommes de terre',
      description:
        'Une salade de pommes de terre fraîche et savoureuse avec des oignons, de la mayonnaise et de la moutarde.',
      instructions:
        '1. Faites cuire les pommes de terre dans de l’eau bouillante jusqu’à ce qu’elles soient tendres.\n2. Épluchez et coupez les pommes de terre en morceaux.\n3. Mélangez les pommes de terre avec des oignons, de la mayonnaise et de la moutarde.\n4. Réfrigérez pendant au moins 1 heure avant de servir.',
      ingredients:
        'Ingrédients :\n- Pommes de terre\n- Oignons\n- Mayonnaise\n- Moutarde',
      type: 'Entrée',
    },
  });

  const recette15 = await prisma.recette.create({
    data: {
      title: 'Salade de pâtes',
      description:
        'Une salade de pâtes fraîche et savoureuse avec des tomates, des concombres et des olives.',
      instructions:
        '1. Faites cuire les pâtes selon les instructions sur l’emballage.\n2. Coupez les tomates et les concombres en morceaux.\n3. Mélangez les pâtes avec les tomates, les concombres et les olives.\n4. Ajoutez de l’huile d’olive, du vinaigre balsamique, du sel et du poivre si vous le souhaitez.\n5. Réfrigérez pendant au moins 1 heure avant de servir.',
      ingredients:
        'Ingrédients :\n- Pâtes\n- Tomates\n- Concombres\n- Olives\n- Huile d’olive\n- Vinaigre balsamique\n- Sel et poivre',
      type: 'Entrée',
    },
  });

  return [
    recette1,
    recette2,
    recette3,
    recette4,
    recette5,
    recette6,
    recette7,
    recette8,
    recette9,
    recette10,
    recette11,
    recette12,
    recette13,
    recette14,
    recette15,
  ];
}

async function resetDB() {
  const usersToDelete = await prisma.user.findMany();

  for (const user of usersToDelete) {
    await prisma.commentaire.deleteMany({
      where: {
        userId: user.id,
      },
    });
  }

  await prisma.user.deleteMany({});
  await prisma.commentaire.deleteMany({});
  await prisma.recette.deleteMany({});
  await prisma.user.deleteMany({});
  // console.log('database reset');
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

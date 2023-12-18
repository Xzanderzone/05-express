export const recipe = [
  {
    name: "hugo",
    time: 75,
    ingredients: ["lots", "of", "stuff", "but", "no", "idea", "tbh"],
    guide: ["order", "it", "online"],
    tag: ["chicken", "cheese", "pasta"],
    favorite: true,
    count: 0,
  },
  {
    name: "martini",
    time: 15,
    ingredients: ["lots", "of", "stuff", "but", "no", "idea", "tbh"],
    guide: ["order", "it", "online"],
    tag: ["veal", "pasta"],
    favorite: false,
    count: 10,
  },
  {
    name: "margarita",
    time: 35,
    ingredients: ["lots", "of", "stuff", "but", "no", "idea", "tbh"],
    guide: ["order", "it", "online"],
    tag: ["veal", "pasta"],
    favorite: false,
    count: 15,
  },
  {
    name: "manhattan",
    time: 25,
    ingredients: ["lots", "of", "stuff", "but", "no", "idea", "tbh"],
    guide: ["order", "it", "online"],
    tag: ["mixed meat", "pasta"],
    favorite: true,
    count: 0,
  },
  {
    name: "earl Grey tea",
    time: 45,
    ingredients: ["lots", "of", "stuff", "but", "no", "idea", "tbh"],
    guide: ["order", "it", "online"],
    tag: ["mixed meat", "pasta"],
    favorite: true,
    count: 0,
  },
  {
    name: "herbal tea",
    time: 55,
    ingredients: ["lots", "of", "stuff", "but", "no", "idea", "tbh"],
    guide: ["order", "it", "online"],
    tag: "fruit",
    tag: ["veal", "pasta"],
    favorite: false,
    count: 2,
  },
  {
    name: "ginger ale",
    time: 65,
    ingredients: ["lots", "of", "stuff", "but", "no", "idea", "tbh"],
    guide: ["order", "it", "online"],
    tag: ["veal", "vegatable"],
    favorite: false,
    count: 69,
  },
  {
    name: "lemonade",
    time: 795,
    ingredients: ["lots", "of", "stuff", "but", "no", "idea", "tbh"],
    guide: ["order", "it", "online"],
    tag: ["veal", "potato"],
    favorite: true,
    count: 420,
  },
  {
    name: "traffic Light",
    time: 85,
    ingredients: ["lots", "of", "stuff", "but", "no", "idea", "tbh"],
    guide: ["order", "it", "online"],
    tag: ["veal", "rice"],
    favorite: true,
    count: 0,
  },
];
export const updateCount = (id, increment = 1) => {
  if (id > 0 && id < recipe.length && typeof increment == "integer")
    recipe[id].count += increment;
};
export const addRecipe = (name, time, ingredients, guide, tag, favorite) => {
  recipe.forEach((element) => {
    if (element.name === name) return false;
  });
  recipe.push({ name, time, ingredients, guide, tag, favorite });
  return true;
};

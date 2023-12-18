import express from "express";
import "dotenv/config";
import { addRecipe, updateCount, recipe } from "./recipe.js";
const API = process.env.API_KEY;
const app = express();
const PORT = process.env.PORT || 3000;
const checkApiKey = (req, res, next) => {
  if (req.params.api == API) next();
  else res.status(403).send(`incorrect api key!`);
};

app.get("/", (req, res) => {
  console.log("index");
  res.send({ code: 200, msg: "type /info in the url for instructions" });
});
app.get("/info", (req, res) => {
  res.send({
    code: 200,
    msg: "Welcome to the 'food'API ! \r\n enter your api-key in the url /mykey/ \r\n specify where youd like to go( /posts,/favorite ) and the id or name youd like to retrieve /hugo \r\n it should look something like http://localhost:3000/your-key/posts/hugo",
  });
});
//works but not permanent (gone when server reboots)
addRecipe(
  "belgian fries with mexicano",
  10,
  ["fries", "mexicano"],
  [
    "plug in deepfrier and let it heat up",
    "throw the food in there",
    "now take it out.",
    "enjoy good food",
  ],
  ["divine", "healthy"]
);
app.post("/posts/new", checkApiKey, (req, res) => {
  if (
    addRecipe(
      req.body.name,
      req.body.time,
      req.body.ingredients,
      req.body.guide,
      req.body.tag,
      req.body.favorite
    )
  )
    res.send(`recipe ${req.body.name} added successfully!`);
  else res.send(`something went wrong! recipe already exists`);
});

app.get("/:api/posts", checkApiKey, (req, res) => {
  console.log("recipe");
  res.send(recipe);
});
const favorite = (req, res, next) => {
  if (req.params.name === "favorite") {
    console.log("favorite");
    let post = [];
    for (let i = 0; i < recipe.length; i++)
      if (recipe[i].favorite) post.push(recipe[i]);
    if (post == undefined) res.send("No favorites set!");
    else res.send(post);
  } else next();
};

const popular = (req, res, next) => {
  if (req.params.name === "popular") {
    console.log("popular");
    let duplicate = recipe.slice().sort((b, a) => a.count - b.count);
    res.send(duplicate);
  } else next();
};

app.get(`/:api/posts/:name`, checkApiKey, favorite, popular, (req, res) => {
  let post = [];
  const id = parseInt(req.params.name);
  if (id <= recipe.length && id >= 0) {
    post = recipe[id];
    updateCount(id, 1); //still not a permenent change (same as recipe[id].count++ )
  } else
    recipe.forEach((element) => {
      if (element.name.indexOf(req.params.name) != -1) {
        post.push(element);
        element.count++;
      }
    });
  if (post == undefined)
    res
      .status(404)
      .send("post not found! are you sure you typed it correctly?");
  else res.send(post);
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

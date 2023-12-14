import recipe from "./recipe.js";
import express, { json } from "express";
import "dotenv/config";
const API = process.env.API_KEY;
const app = express();
const PORT = process.env.PORT || 3000;

const checkApiKey = (req, res, next) => {
  if (req.params.api == API) next();
  else res.status(403).send(`incorrect api key!`);
};

app.get("/", (req, res) => {
  res.send({ code: 200, msg: "ok" });
});
app.get("/info", (req, res) => {
  res.send(`Welcome to the 'food'API ! \r\n enter your api-key in the url /mykey/ \n
    specify where youd like to go( /posts ) and the id or name youd like to retrieve /hugo \n
    it should look something like http://localhost:3000/2007/posts/hugo`);
});
app.get("/posts", (req, res) => {
  res.send(recipe);
});
app.post("/posts/new", checkApiKey, (req, res) => {
  const newPost = {
    name: req.body.name,
    time: req.body.time,
    ingredients: req.body.ingredients,
    guide: req.body.guide,
  };
  recipe.push(newPost);
});
app.get(`/:api/posts/:name`, checkApiKey, (req, res) => {
  let post = [];
  const id = parseInt(req.params.name);
  if (id <= recipe.length && id >= 0) post = recipe[id];
  else post = recipe.find((post) => post.name === req.params.name);
  if (post == undefined) res.status(404).send("post not found!");
  else res.send(post);
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

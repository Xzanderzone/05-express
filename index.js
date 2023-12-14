import recipe from "./recipe.js";
import express, { json } from "express";
import "dotenv/config";
const api = process.env.API_KEY;
const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
const checkApiKey = (req, res, next) => {
  if (true) next();
};
app.get("/", checkApiKey, (req, res) => {
  res.send({ code: 200, msg: "ok" });
});

app.get("/", (req, res) => {
  res.send({ code: 200, msg: "ok" });
});

app.post("/login", (req, res) => {
  res.status(403);
});

app.get("/posts", (req, res) => {
  res.send(recipe);
});
app.post("/posts/new", (req, res) => {
  const newPost = {
    name: req.body.name,
    time: req.body.time,
    ingredients: req.body.ingredients,
    guide: req.body.guide,
  };
  recipe.push(newPost);
});
app.get(`/${api}/posts/:name`, (req, res) => {
  console.log(req.params.name, api);
  let post = [];
  const id = parseInt(req.params.name);
  if (id <= recipe.length && id >= 0) post = recipe[id];
  else post = recipe.find((post) => post.name === req.params.name);
  if (post == undefined) res.send("post not found!");
  res.send(post);
});

app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});

import express from "express";

import { Context, Requests } from "./builders";
import { MongoClient } from "./connections";

const port = process.env.PORT;
const app = express();
app.use(express.json());

MongoClient.connect();

const context = Context.build();
Requests.build(app, context);

app.listen(port, () => {
  console.log(`Charpentier listening at http://localhost:${port}`);
});


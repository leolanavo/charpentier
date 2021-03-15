import express from 'express';
import mongoose from 'mongoose';

import { buildContext, buildRequests } from './builders';

mongoose.connect('mongodb://mongo:27017');

type HTTP_METHODS = "get" | "post"

const basePath = '../../core';
const context = buildContext(basePath);
const requests = buildRequests(basePath);

const app = express();

app.use(express.json());

const port = 3000;

requests.forEach(({ config, handler }) => {
  const method = config.method.toLowerCase();
  app[method as HTTP_METHODS](config.route, (req, res) => {
    return handler(req, res, context);
  });
});

app.listen(port, () => {
  console.log(`Charpentier listening at http://localhost:${port}`);
});


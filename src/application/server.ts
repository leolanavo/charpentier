import express from 'express';

import { buildContext, buildRequests } from './builders';

type HTTP_METHODS = "get" | "post"

const basePath = '../../core';
const context = buildContext(basePath);
const requests = buildRequests(basePath);

const app = express();
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


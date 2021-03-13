import express from 'express';

import { context, requestHandlers } from './build';

const app = express();
const port = 3000;

type HTTP_METHODS = "get" | "post"

requestHandlers.forEach(({ config, handler }) => {
  const method = config.method.toLowerCase();
  app[method as HTTP_METHODS](config.route, (req, res) => {
    return handler(req, res, context);
  });
});

app.listen(port, () => {
  console.log(`Charpentier listening at http://localhost:${port}`);
});


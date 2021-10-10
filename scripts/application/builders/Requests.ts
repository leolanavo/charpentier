import { Express } from 'express';

import { RequestHandler, Context } from '../types';
import proccessFiles from './utils';

class Requests {
  private static requests: RequestHandler[] = [];
  private static basePath = process.env.BASE_PATH as string;

  constructor () {};

  public static build(app: Express, context: Context) {
    if (!Requests.requests.length) {
      proccessFiles(this.basePath, Requests.requests, this.isRequestHandler);

      Requests.requests.forEach(({ config, handler }) => {
        app[config.method](config.route, (req, res) => {
          return handler(req, res, context);
        });
      });
    }

    return Requests.requests;
  };

  private static isRequestHandler(importedFile: any) {
    return importedFile.config &&
      importedFile.handler &&
      importedFile.config.method &&
      importedFile.config.route;
  }
}

export { Requests };


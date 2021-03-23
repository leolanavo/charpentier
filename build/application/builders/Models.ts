import { model } from 'mongoose';

import { Model } from '../types';
import proccessFiles from './utils';

type MongoModel = ReturnType<typeof model>;

class Models {
  private static models: Record<string, MongoModel>;
  private static basePath = process.env.BASE_PATH as string;

  constructor () {};

  public static build() {
    if (!Models.models) {
      Models.models = {};
      const fileModels: Model[] = [];

      proccessFiles(this.basePath, fileModels, this.isModel);

      fileModels.forEach(({ name, schema }) => {
        Models.models[name] = model(name, schema);
      });

    }

    return Models.models;
  };

  private static isModel(importedFile: any) {
    return importedFile.name && importedFile.schema;
  }
}

export { Models };


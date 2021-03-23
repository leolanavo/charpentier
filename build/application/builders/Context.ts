import { Publish } from './Publish';
import { Models } from './Models';

interface CharpContext {
  models: typeof Models['models'];
  publish: typeof Publish['publish'];
}

class Context {
  private static context: CharpContext;

  constructor () {};

  public static build() {
    if (!Context.context) {
			const models = Models.build();
			const publish = Publish.build({ models });

      Context.context = { models, publish };
    }

    return Context.context
  };
}

export { Context };


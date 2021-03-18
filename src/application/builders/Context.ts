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
      Context.context = {
        models: Models.build(),
        publish: Publish.build(Context.context),
      };
    }

    return Context.context
  };
}

export { Context };


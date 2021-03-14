import { Response, Request } from 'express';

const config = {
  method: 'GET',
  route: '/',
  name: 'userCreation',
};

function handler(_req: Request, res: Response, context: any) {
  const payload = { id: 1 };
  context.publish('USER_CREATED', payload);
  res.status(200).json(payload);
}

export {
  config,
  handler
}


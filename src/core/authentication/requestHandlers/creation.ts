import { Response, Request } from 'express';

const config = {
  method: 'POST',
  route: '/user',
  name: 'userCreation',
};

function handler(req: Request, res: Response, context: any) {
	console.log(req.body);
	console.log(context.models);

	const user = new context.models.User({ ...req.body });
	user.save();

  context.publish('USER_CREATED', user);
  res.status(200).json(user);
}

export {
  config,
  handler
}


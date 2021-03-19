import { Response, Request } from 'express';

const config = {
  method: 'post',
  route: '/user',
};

async function handler(req: Request, res: Response, context: any) {
	const { User } = context.models;

	const userFind = await User.findOne({
		email: req.body.email
	});

	if (userFind) {
		res.status(401).send();
		return;
	}

	const user = new User({ ...req.body });
	context.publish('USER.NEW', user);

  res
		.status(201)
		.json(user)
}

export {
  config,
  handler
}


const config = {
  topic: 'USER.NEW'
}

function handler(payload: any, context: any) {
	const { User } = context.models;
	const user = new User(payload);
	user.save();
}

export {
  config,
  handler
}


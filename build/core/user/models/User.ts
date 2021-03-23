import { Schema } from 'mongoose';

const name = 'User';

const schema = new Schema({
	name: 'string',
	email: 'string',
	password: 'string'
});

export {
	name,
	schema
}


import { Schema } from 'mongoose';

const name = 'User';

const schema = new Schema({
	name: 'string',
	email: 'string'
});

export {
	name,
	schema
}


import mongoose from 'mongoose';

let client: Promise<typeof mongoose>;

function buildMongoClient() {
	if (!client) {
		client = mongoose.connect('mongodb://mongo:27017', {
			user: process.env.MONGO_USERNAME,
			pass: process.env.MONGO_PASSWORD,
		});
	}

	return client;
}

export default buildMongoClient;


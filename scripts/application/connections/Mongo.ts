import mongoose from 'mongoose';

class MongoClient {
	private static client: Promise<typeof mongoose>;

	constructor() {}

	public static connect() {
		if (!MongoClient.client) {
			const host = process.env.MONGO_HOST;
			const port = process.env.MONGO_PORT;

			MongoClient.client = mongoose.connect(`mongodb://${host}:${port}`, {
				user: process.env.MONGO_USERNAME,
				pass: process.env.MONGO_PASSWORD,
			});
		}

		return MongoClient.client;
	}
}

export default MongoClient;


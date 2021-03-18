import { KafkaClient as DefaultKafkaClient } from 'kafka-node';


class KafkaClient {
	private static client: DefaultKafkaClient;

	constructor () {}

	public static connect() {
			if (!KafkaClient.client) {
				const host = process.env.KAFKA_HOST;
				const port = process.env.KAFKA_PORT;

				KafkaClient.client = new DefaultKafkaClient({
					kafkaHost: `${host}:${port}`,
				});
			}

			return KafkaClient.client;
	}
}

export default KafkaClient;


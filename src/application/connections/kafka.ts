import { KafkaClient } from 'kafka-node';

let client: KafkaClient;

function buildKafkaClient() {
	if (!client) {
		const host = process.env.KAFKA_HOST;
		const port = process.env.KAFKA_PORT;

		client = new KafkaClient({
			kafkaHost: `${host}:${port}`,
		});
	}

	return client;
};

export default buildKafkaClient;

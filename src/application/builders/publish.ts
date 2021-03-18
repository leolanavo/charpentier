import { Producer } from 'kafka-node';

import { buildKafkaClient } from '../connections'

import { MessageHandler } from '../types';
import proccessFiles from './utils';

function newMessage(topic: string, payload: string | Record<string, any>) {
	const messages = typeof payload === 'string'
		? payload
		: JSON.stringify(payload);

  return [{ topic, messages }];
}

function isMessageHandler(importedFile: any) {
	return importedFile.config &&
		importedFile.handler &&
		importedFile.config.topic;
}

function buildPublishForMonolith(basePath: string, context: any) {//{{{
	const messageHandlers: MessageHandler[] = [];
	proccessFiles(basePath, messageHandlers, isMessageHandler);

	const TOPICS: Record<string, any[]> = {};

	messageHandlers.forEach(({ config, handler }) => {
		const key = config.topic;
		if (!TOPICS[key]) TOPICS[key] = [];
		TOPICS[key].push(handler);
	});

	return function publish(topic: string, payload: Record<string, any>) {
		TOPICS[topic].forEach(h => h(payload, context));
	}
};//}}}

function buildPublishForMicroservices() {
	const client = buildKafkaClient();

	return function publish(topic: string, payload: Record<string, any>) {
		const producer = new Producer(client);
		producer.on('ready', () => {
			producer.send(
				newMessage(topic, payload),
				() => {}
			);
		})
	}
}

function buildPublish(basePath: string, context: any) {
	if (process.env.ARCHITECTURE === 'microservices') {
		return buildPublishForMicroservices();
	} else if (process.env.ARCHITECTURE === 'microservices') {
		return buildPublishForMonolith(basePath, context);
	}
}

export default buildPublish;


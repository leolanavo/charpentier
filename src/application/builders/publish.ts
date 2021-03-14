import { MessageHandler } from '../types';
import proccessFiles from './utils';

const messageHandlers: MessageHandler[] = [];

function isMessageHandler(importedFile: any) {
	return importedFile.config &&
		importedFile.handler &&
		importedFile.config.topic;
}

proccessFiles('../../core', messageHandlers, isMessageHandler);

const TOPICS: Record<string, any[]> = {};

messageHandlers.forEach(({ config, handler }) => {
  const key = config.topic;

  if (!TOPICS[key]) {
    TOPICS[key] = [];
  }

  TOPICS[key].push(handler);
});

function publish(topic: string, payload: Record<string, any>) {
	TOPICS[topic].forEach(h => h(payload));
}

export default publish;


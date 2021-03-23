import { Consumer as KafkaConsumer, Message } from 'kafka-node';

import { KafkaClient } from '../connections'
import { MessageHandler, Context, ARCHITECTURES } from '../types';
import proccessFiles from './utils';

class Consumers {
  private static basePath = process.env.BASE_PATH as string;
  private static consumers: KafkaConsumer[] = [];

  constructor () {}

  public static build(context: Context) {
    if (!this.consumers.length) {
      const client = KafkaClient.connect();
      const messageHandlers: MessageHandler[] = [];
      proccessFiles(this.basePath, messageHandlers, this.isMessageHandler);

      this.consumers = messageHandlers.map(({ config, handler }) => {
        const consumer = new KafkaConsumer(client, [
          { topic: config.topic, partition: 0 }
        ], {});

        consumer.on('message', (msg: Message) => {
					const parsedMessage = JSON.parse(msg.value as string);
					handler(parsedMessage, context);
				});

        return consumer;
      });

			return this.consumers;
    }
  }

  private static isMessageHandler(importedFile: any) {
    return importedFile.config &&
      importedFile.handler &&
      importedFile.config.topic;
  }
}

export { Consumers };


import { Producer } from 'kafka-node';

import { KafkaClient } from '../connections'

import { MessageHandler, Context, ARCHITECTURES } from '../types';
import proccessFiles from './utils';

type KafkaMessage = string | Record<string, any>;
type PublishFunction = (topic: string, payload: Record<string, any>) => void;

class Publish {
  private static basePath = process.env.BASE_PATH as string;
  private static arch: ARCHITECTURES = process.env.ARCHITECTURE as ARCHITECTURES;
  private static publish: PublishFunction;

  constructor() {}

  public static build(context: Context) {
    if (this.arch === 'microservices') {
      return this.buildForMicroservices();
    } else {
      return this.buildForMonolith(context);
    }
  }

  private static buildForMonolith(context: Context) {//{{{
    if (!this.publish) {
      const messageHandlers: MessageHandler[] = [];
      const TOPICS: Record<string, any[]> = {};

      proccessFiles(this.basePath, messageHandlers, this.isMessageHandler);

      messageHandlers.forEach(({ config, handler }) => {
        const key = config.topic;
        if (!TOPICS[key]) TOPICS[key] = [];
        TOPICS[key].push(handler);
      });

      this.publish = (topic, payload) => {
        TOPICS[topic].forEach(h => h(payload, context));
      }
    }

    return this.publish;
  }//}}}

  private static buildForMicroservices() {
    if (!this.publish) {
      const client = KafkaClient.connect();

      this.publish = (topic, payload) => {
        const producer = new Producer(client);
        producer.on('ready', () => {
          producer.send(
            this.newKafkaMessage(topic, payload),
            () => {}
          );
        })
      }
    }

    return this.publish;
  }

  private static isMessageHandler(importedFile: any) {
    return importedFile.config &&
      importedFile.handler &&
      importedFile.config.topic;
  }

  private static newKafkaMessage(topic: string, payload: KafkaMessage) {
    const messages = typeof payload === 'string'
      ? payload
      : JSON.stringify(payload);

    return [{ topic, messages }];
  }
}

export { Publish };


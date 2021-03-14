import { Schema } from 'mongoose';

interface RequestHandlerConfig {
  route: string;
  method: 'POST' | 'GET';
}

type RequestHandlerFunction = (...args: any) => any;

export interface RequestHandler {
  config: RequestHandlerConfig;
  handler: RequestHandlerFunction
}

interface MessageHandlerConfig {
  topic: string;
}

type MessageHandlerFunction = (...args: any) => any;

export interface MessageHandler {
  config: MessageHandlerConfig;
  handler: MessageHandlerFunction;
}

export interface Model {
	name: string;
	schema: Schema;
}


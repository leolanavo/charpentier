import { Schema } from "mongoose";

type HTTP_METHODS = "get" | "post" | "patch" | "put" | "delete";

export type ARCHITECTURES = 'microservices' | 'monolith';

interface RequestHandlerConfig {
  route: string;
  method: HTTP_METHODS;
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

export type Context = any;


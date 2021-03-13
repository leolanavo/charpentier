import path from 'path';
import fs from 'fs';

import { RequestHandler, MessageHandler } from './types';

function isDir(path: string) {
  return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
}

function proccessFiles<T>(basePath: string, fileList: T[]) {
  const resolvedBasePath = path.resolve(__dirname, basePath);
  const files = fs.readdirSync(resolvedBasePath);

  files.forEach(f => {
    const filePath = path.resolve(resolvedBasePath, f);
    if (isDir(filePath)) {
      proccessFiles(filePath, fileList);
    } else {
      const file: T = require(filePath);
      fileList.push(file);
    }
  })
}

const requestHandlers: RequestHandler[] = [];
const messageHandlers: MessageHandler[] = [];

proccessFiles('requestHandlers', requestHandlers);
proccessFiles('messageHandlers', messageHandlers);

const TOPICS: Record<string, any[]> = {};

messageHandlers.forEach(({ config, handler }) => {
  const key = config.topic;

  if (!TOPICS[key]) {
    TOPICS[key] = [];
  }

  TOPICS[key].push(handler);
});

const context = {
  publish(topic: string, payload: Record<string, any>) {
    console.log('message published');
    TOPICS[topic].forEach(h => h(payload));
  }
};

export {
  context,
  requestHandlers
};


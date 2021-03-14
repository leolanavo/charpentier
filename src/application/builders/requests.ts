import { RequestHandler } from '../types';
import proccessFiles from './utils';

function isRequestHandler(importedFile: any) {
	return importedFile.config &&
		importedFile.handler &&
		importedFile.config.method &&
		importedFile.config.route;
}

function buildRequests(basePath: string) {
	const requestHandlers: RequestHandler[] = [];
	proccessFiles(basePath, requestHandlers, isRequestHandler);
	return requestHandlers;
}

export default buildRequests;


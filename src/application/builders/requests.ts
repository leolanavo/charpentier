import { RequestHandler } from '../types';
import proccessFiles from './utils';

const requestHandlers: RequestHandler[] = [];

function isRequestHandler(importedFile: any) {
	return importedFile.config &&
		importedFile.handler &&
		importedFile.config.method &&
		importedFile.config.route;
}

proccessFiles('../../core', requestHandlers, isRequestHandler);

export default requestHandlers;


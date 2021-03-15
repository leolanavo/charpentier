import { model } from 'mongoose';

import { Model } from '../types';
import proccessFiles from './utils';

function isModel(importedFile: Record<string, any>) {
	return importedFile.name && importedFile.schema;
}

function buildModels(basePath: string) {
	const models: Model[] = [];
	const mongoModels: Record<string, ReturnType<typeof model>> = {};

	proccessFiles(basePath, models, isModel);

	models.forEach(({ name, schema }) => {
		mongoModels[name] = model(name, schema);
	});

	return mongoModels;
};

export default buildModels;


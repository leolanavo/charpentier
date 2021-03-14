import { model } from 'mongoose';

import { Model } from '../types';
import proccessFiles from './utils';

function isModel(importedFile: Record<string, any>) {
	return importedFile.name && importedFile.schema;
}

function buildModels(basePath: string) {
	const models: Model[] = [];

	proccessFiles(basePath, models, isModel);

	return models.map(({ name, schema }) => {
		return model(name, schema);
	});
};

export default buildModels;


import { model, Schema } from 'mongoose';

import proccessFiles from './utils';

interface Model {
	name: string;
	schema: Schema;
}

function isModel(importedFile: Record<string, any>) {
	return importedFile.name && importedFile.schema;
}

const models: Model[] = [];

proccessFiles('../../core', models, isModel);

const mongooseModels = models.map(({ name, schema }) => {
	return model(name, schema);
});

export default mongooseModels;


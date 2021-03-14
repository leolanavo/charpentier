import buildPublish from './publish';
import buildModels from './models';

export default (basePath: string) => ({
	publish: buildPublish(basePath),
	models: buildModels(basePath),
});


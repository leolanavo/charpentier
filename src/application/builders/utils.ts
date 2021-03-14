import path from 'path';
import fs from 'fs';

function isDir(path: string) {
  return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
}

type ValidationFuction = (importedFile: any) => boolean;

function proccessFiles<T>(
	basePath: string,
	fileList: T[],
	filter: ValidationFuction
) {
  const resolvedBasePath = path.resolve(__dirname, basePath);
  const files = fs.readdirSync(resolvedBasePath);

  files.forEach(f => {
    const filePath = path.resolve(resolvedBasePath, f);
    if (isDir(filePath)) {
      proccessFiles(filePath, fileList, filter);
    } else {
      const file: T = require(filePath);
      if (filter(file)) {
        fileList.push(file);
        }
      }
  })
}

export default proccessFiles;


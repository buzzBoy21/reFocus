import fs from 'fs';
import path from 'path';
/**
 *
 * @param {string} relativeFilePath Path relative from storage folder in src. In the dist (when you build app) is in storage folder too
 * @returns {Promise<string>} This promise return the all content of file
 */
function readFile(relativeFilePath) {
   try {
      const isDev = process.env.NODE_ENV === 'development';
      const srcDir = isDev
         ? path.resolve(process.cwd(), 'src/storage')
         : path.resolve(process.cwd(), 'storage');
      const absolutePath = path.join(srcDir, relativeFilePath);
      console.log('absolutePath:' + absolutePath);
      return fs.promises.readFile(absolutePath, 'utf-8');
   } catch (e) {
      console.log(e);
      return e;
   }
}

export default readFile;

import { useState } from 'react';
/**
 *
 * @param {*} relativeFilePath
 * @returns {[function(): Promise<JSON>, function(string): Promise<void>, string]}
 *  - first index has the function to execute the reading. ->>This RETURN JSON <<-
 *  - second index has the function to execute the writing
 *  - third index has the currentValue that you have just read ->>value when you hasn't read yet: null<<-
 */
export default function useJsonFileHandler(relativeFilePath) {
   const [readingFileContent, setReadingFileContent] = useState(null);

   async function executeFileFunction() {
      return window.api.readFileCustom(relativeFilePath).then((valueAfterPromise) => {
         const json = JSON.parse(valueAfterPromise);
         setReadingFileContent(json);
         return json;
      });
   }
   return [
      executeFileFunction,
      (contentToWrite) => window.api.writeFileCustom(relativeFilePath, contentToWrite),
      readingFileContent,
   ];
}

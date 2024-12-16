import programIcons from '../../assets/allProgramsIcons';
/**
 *
 * @param {string} phrase
 * @returns {Promise<any> | false} The imported image module or false if no match is found
 */
export default async function findAndImportProgramImg(phrase) {
   try {
      for (let index = 0; index < programIcons.length; index++) {
         //if return something distinct to -1 was found
         const wasFind = phrase.toLowerCase().search(programIcons[index].wordToFind);
         console.log(wasFind != -1 && programIcons[index].fileName);
         if (wasFind != -1) {
            return await import('../../assets/icons/brands/' + programIcons[index].fileName);
         }
      }
      return false;
   } catch (error) {
      return false;
   }
}

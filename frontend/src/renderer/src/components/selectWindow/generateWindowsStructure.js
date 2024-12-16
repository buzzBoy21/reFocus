import { v4 as uuid } from 'uuid';

/**
 * Pure function that generates the IDs for the new window names and removes the windows that were closed.
 * @param {Array<string>} newWindowsNames - Contains all the names of the new current windows.
 * @param {Array<{id: string, nameWindow: string}>} prevWindowsNames - Contains the previous window names with their IDs.
 * @returns {Array<{id: string, nameWindow: string}>} Returns an array that concatenates valid old windows and new windows.
 *
 *
 */

export default function generateWindowsStructure(newWindowsNames, prevWindowsNames) {
   const windowsNamesToAdd = newWindowsNames.filter(
      (newWindowName) =>
         prevWindowsNames.find((prevWindowName) => prevWindowName.nameWindow === newWindowName) ==
         undefined
   );
   const windowsExistedAndExisting = newWindowsNames.filter((newWindowName) =>
      prevWindowsNames.find((prevWindowName) => prevWindowName.nameWindow === newWindowName)
   );

   const resultWithOutNewWIndows = prevWindowsNames.filter((prevWindow) => {
      return windowsExistedAndExisting.includes(prevWindow.nameWindow);
   });

   const result = resultWithOutNewWIndows.concat(
      windowsNamesToAdd.map((windowNameToAdd) => ({
         id: uuid(),
         nameWindow: windowNameToAdd,
      }))
   );
   return result;
}

import { createContext, useEffect, useState } from 'react';
import useJsonFileHandler from '../hook/useJsonFileHandler';
export const PersonalWindowsNames = createContext();

function PersonalWindowsNamesContext({ children }) {
   const [personalWindowsNames, setPersonalWindowsNames] = useState(null);
   const [readFile] = useJsonFileHandler('personalWindows.json');

   useEffect(() => {
      async function getPersonalWindowsNamesFromJSON() {
         const reading = await readFile();
         setPersonalWindowsNames(reading);
         console.log('context inicializado');
      }
      getPersonalWindowsNamesFromJSON();
   }, []);

   return (
      <PersonalWindowsNames.Provider value={[personalWindowsNames, setPersonalWindowsNames]}>
         {children}
      </PersonalWindowsNames.Provider>
   );
}

export default PersonalWindowsNamesContext;

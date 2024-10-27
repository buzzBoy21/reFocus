import { createContext, useEffect, useState } from 'react';
import useJsonFileHandler from '../hook/useJsonFileHandler';

export const TemplateContext = createContext();

const TemplateKeyboardContext = ({ children }) => {
   const [templateKeyboard, setTemplateKeyboard] = useState('');

   const [readFile] = useJsonFileHandler('currentKeyboardLayout.json');

   //When the async function readFile get the all files's value. setTemplateKeyboard will be rewrite. To the keyboard
   useEffect(() => {
      async function read() {
         setTemplateKeyboard(await readFile());
      }
      read();
   }, []);
   return (
      <TemplateContext.Provider value={[templateKeyboard, setTemplateKeyboard]}>
         {children}
      </TemplateContext.Provider>
   );
};

export default TemplateKeyboardContext;

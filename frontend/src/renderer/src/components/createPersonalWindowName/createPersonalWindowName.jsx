import InputText from '../inputText/inputText';
import Button from '../button/button';
import { useContext, useRef } from 'react';
import { PersonalWindowsNames } from '../../context/personalWindowsNamesContext';
import style from './createPersonalWindowName.module.css';
import useJsonFileHandler from '../../hook/useJsonFileHandler';

function CreatePersonalWindowName({ additionalFunction = () => {} }) {
   const [personalWindowsNames, setPersonalWindowsNames] = useContext(PersonalWindowsNames);
   const [, writeFile] = useJsonFileHandler('./personalWindows.json');
   const inputRef = useRef(null);

   function createNameWindow() {
      if (
         inputRef.current.value != '' &&
         !personalWindowsNames.windows.find((window) => window.name === inputRef.current.value) //if the same window.name hadn't been created previously
      ) {
         setPersonalWindowsNames((prevValue) => {
            const newWindowsNames = [...prevValue.windows, { name: inputRef.current.value }];

            const result = { ...prevValue, windows: newWindowsNames };

            writeFile(JSON.stringify(result));
            inputRef.current.value = '';
            return result;
         });
      }
   }
   return (
      <div className={style.containerCreatePersonalWindowsName}>
         <InputText labelText="Window noun" ref={inputRef} flexible={true} />
         <Button
            onClick={async () => {
               createNameWindow();
               additionalFunction();
            }}
         >
            Create window
         </Button>
      </div>
   );
}

export default CreatePersonalWindowName;

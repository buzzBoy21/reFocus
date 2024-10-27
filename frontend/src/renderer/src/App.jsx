import { useState } from 'react';
import KeyBoard from './components/Keyboard/KeyBoard';
import TemplateKeyBoardContext from './context/templateKeyBoardContext';
import style from './App.module.css';
import Button from './components/button/button';
import NewHotKeyContext from './context/newHotKeyContext';

function App() {
   const [step, setStep] = useState(0);
   let contentPage;
   if (step == 0) {
      contentPage = (
         <>
            <h1 className={style.primero}>Select your new hot key</h1>
            <KeyBoard />
         </>
      );
   }
   const handleButton = () => {
      setStep((prevValue) => ++prevValue);
   };
   return (
      <>
         <TemplateKeyBoardContext>
            <NewHotKeyContext>{contentPage}</NewHotKeyContext>
            <div className={style.menu}>
               <Button onClick={handleButton}>Next step </Button>
            </div>
         </TemplateKeyBoardContext>
      </>
   );
}

export default App;

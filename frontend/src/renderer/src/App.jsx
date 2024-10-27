import { useState } from 'react';
import TemplateKeyBoardContext from './context/templateKeyBoardContext';
import NewHotKeyContext from './context/newHotKeyContext';
import FirstStep from './pages/createHotKey/firstStep/firstStep';
import Button from './components/button/button';

function App() {
   const [step, setStep] = useState(0);
   let contentPage;
   const handleButton = () => {
      setStep((prevValue) => ++prevValue);
   };
   if (step == 0) {
      contentPage = (
         <>
            <FirstStep onClickNextStep={handleButton} />
         </>
      );
   } else if (step == 1) {
      contentPage = (
         <Button
            onClick={() => {
               setStep((prevValue) => --prevValue);
            }}
         >
            atras
         </Button>
      );
   }
   return (
      <>
         <TemplateKeyBoardContext>
            <NewHotKeyContext>{contentPage}</NewHotKeyContext>
         </TemplateKeyBoardContext>
      </>
   );
}

export default App;

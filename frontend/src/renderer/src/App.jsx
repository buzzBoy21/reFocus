import { memo, useState } from 'react';
import TemplateKeyBoardContext from './context/templateKeyBoardContext';
import NewHotKeyContext from './context/newHotKeyContext';
import FirstStep from './pages/createHotKey/firstStep/firstStep';
import SecondStep from './pages/createHotKey/secondStep/secondStep';

const App = memo(function App() {
   const [step, setStep] = useState(0);
   let contentPage;
   const handleNextButton = () => {
      setStep((prevValue) => ++prevValue);
   };
   const handlePrevButton = () => {
      setStep((prevValue) => --prevValue);
   };

   if (step == 0) {
      contentPage = (
         <>
            <FirstStep passToNextStep={handleNextButton} />
         </>
      );
   } else if (step == 1) {
      contentPage = <SecondStep goToPreviousStep={handlePrevButton} />;
   }
   return (
      <>
         <TemplateKeyBoardContext>
            <NewHotKeyContext>{contentPage}</NewHotKeyContext>
         </TemplateKeyBoardContext>
      </>
   );
});

export default App;

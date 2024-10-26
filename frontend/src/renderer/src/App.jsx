import Header from './components/Header/Header';
import KeyBoard from './components/Keyboard/KeyBoard';
import TemplateKeyBoardContext from './context/templateKeyBoardContext';

function App() {
   return (
      <>
         <Header></Header>
         <TemplateKeyBoardContext>
            <KeyBoard />
         </TemplateKeyBoardContext>
      </>
   );
}

export default App;

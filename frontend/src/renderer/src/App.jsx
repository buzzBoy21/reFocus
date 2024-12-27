import { memo, useState } from 'react';
import TemplateKeyBoardContext from './context/templateKeyBoardContext';
import NewHotKeyContext from './context/newHotKeyContext';
import FirstStep from './pages/createHotKey/firstStep/firstStep';
import SecondStep from './pages/createHotKey/secondStep/secondStep';
import ObtainedWindowsContext from './context/obtainedWindowsContext';
import Header from './components/Header/Header';
import Sidebar from './components/sidebar/sidebar';
import ShowSideBarContext from './context/ShowSideBarContext';
import { HashRouter, Route, Routes } from 'react-router';

const App = memo(function App() {
   return (
      <>
         <ObtainedWindowsContext>
            <TemplateKeyBoardContext>
               <ShowSideBarContext>
                  <Header></Header>
                  <Sidebar></Sidebar>
               </ShowSideBarContext>
               <NewHotKeyContext>
                  <Routes>
                     <Route path="/" element={<FirstStep />} />
                     <Route path="/second-step" element={<SecondStep />} />
                  </Routes>
               </NewHotKeyContext>
            </TemplateKeyBoardContext>
         </ObtainedWindowsContext>
      </>
   );
});

export default App;

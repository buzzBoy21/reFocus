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
import PersonalWindowsNamesContext from './context/personalWindowsNamesContext';
import PersonalWindows from './pages/personalWindows/PersonalWindows';
import CreatedHotKey from './pages/createdHotKey/createdHotKey';
import HandleMessage from './components/handleMessage/handleMessage';
const App = memo(function App() {
   return (
      <HandleMessage>
         <PersonalWindowsNamesContext>
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
                        <Route path="/personal-windows-names" element={<PersonalWindows />} />
                        <Route path="/created-hot-keys" element={<CreatedHotKey />} />
                     </Routes>
                  </NewHotKeyContext>
               </TemplateKeyBoardContext>
            </ObtainedWindowsContext>
         </PersonalWindowsNamesContext>
      </HandleMessage>
   );
});

export default App;

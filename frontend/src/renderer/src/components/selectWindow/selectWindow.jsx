import { useContext, useState } from 'react';
import style from './selectWindow.module.css';
import WindowItem from '../windowItem/windowItem';
import Loader from '../loader/loader';
import reloadSVG from '../../assets/reload.svg';
import generateWindowsStructure from './generateWindowsStructure';
import PropTypes, { array } from 'prop-types';
import { ObtainedWindows } from '../../context/obtainedWindowsContext';
import { HotKeyContext } from '../../context/newHotKeyContext';
import Button from '../button/button';
import CreatePersonalWindowName from '../createPersonalWindowName/createPersonalWindowName';
import { PersonalWindowsNames } from '../../context/personalWindowsNamesContext';

export default function SelectWindow({
   defaultPhrase = 'no selected',
   onlySelectOne,
   storeInKeyName, //used to obtain the default value, and storage in hotkey context
}) {
   const [previousWindowsName, setPreviousWindowsName] = useContext(ObtainedWindows); //to persist the data between pages
   const [hotkeyContext, updateHotKeyContext] = useContext(HotKeyContext);
   const [personalWindowsNames] = useContext(PersonalWindowsNames);

   const [currentAvailableWindows, setCurrentAvailableWindows] = useState(previousWindowsName); // {id:string,nameWindow:"string"}
   const [showSelectWindow, setShowSelectWindow] = useState(false);
   const [selectedWindow, setSelectedWindow] = useState(hotkeyContext[storeInKeyName]); //[{"id": idSelectedWindow,"nameWindow": selectedWindowName},...]
   const [idOtherPressedWindow, setIdOtherPressedWindow] = useState(
      onlySelectOne && hotkeyContext[storeInKeyName].length > 0
         ? hotkeyContext[storeInKeyName][0].id || ''
         : '' // default value from the context, used to get window id when you are rerendering the component this is when you press back and press next step
   ); // It's used when onlySelectOne is true, to know when the person click a window

   let insideOfInputWindow = null;

   function fetchGetAllWindowNames() {
      try {
         const fetchData = async () => {
            //This newWindowsNames contain repeat windows, we only need the news windows
            const newWindowsNames = await window.api.services.getAllWindowNames();
            const personalWindows = personalWindowsNames.windows.map((element) => element.name);

            if (newWindowsNames != undefined) {
               //when fetch is working
               setCurrentAvailableWindows((preValue) => {
                  console.log('prev', preValue);
                  const allWindowsIdsAndWindowsName = generateWindowsStructure(
                     [...newWindowsNames, ...personalWindows],
                     preValue
                  );
                  setPreviousWindowsName(allWindowsIdsAndWindowsName);
                  return allWindowsIdsAndWindowsName;
               });
            }
         };
         fetchData();
      } catch (error) {
         console.log(error);
      }
   }

   //get what will be inside of inputWindow
   if (selectedWindow.length > 0) {
      insideOfInputWindow = (
         <WindowItem
            windowAttributes={selectedWindow[0]}
            showPhrase={false}
            customInLineStyle={{ borderWidth: '0', width: '100%', height: '100%' }}
         ></WindowItem>
      );
   } else {
      insideOfInputWindow = <p className={style.phrase}>{defaultPhrase}</p>;
   }
   return (
      <>
         <button
            //When you selected at least one windowItem
            className={style.inputWindow}
            onClick={() => {
               fetchGetAllWindowNames();
               setShowSelectWindow(true);
            }}
         >
            {insideOfInputWindow}
         </button>
         {/* modal */}
         {showSelectWindow && (
            <div className={style.emergedWindow}>
               <header className={style.actions}>
                  <Button
                     className={[style.smallButtons, style.fontCloseButton].join(' ')}
                     onClick={() => {
                        setShowSelectWindow(false);
                        updateHotKeyContext(storeInKeyName, selectedWindow);
                     }}
                     animation={false}
                  >
                     X
                  </Button>
                  <Button
                     animation={false}
                     className={style.smallButtons}
                     onClick={() => {
                        fetchGetAllWindowNames();
                     }}
                     title="reload all windows "
                  >
                     <img
                        src={reloadSVG}
                        alt="reload image"
                        style={{ width: '100%', height: 'auto' }}
                     />
                  </Button>
               </header>
               <div className={style.windowToFocus}>
                  {currentAvailableWindows.length === 0 ? (
                     <>
                        <Loader />
                        <h2 style={{ marginTop: '5em' }}>
                           If you stay like this more than 2 seconds, you probably haven't turned on
                           the server.
                        </h2>
                     </>
                  ) : (
                     currentAvailableWindows.map((window) =>
                        onlySelectOne ? (
                           <WindowItem
                              key={window.id}
                              windowAttributes={window}
                              modifyParentState={setSelectedWindow}
                              alreadyPressed={selectedWindow.some(
                                 (element) => window.id == element.id
                              )}
                              onlySelectOne={onlySelectOne}
                              IdOtherPressedWindow={[idOtherPressedWindow, setIdOtherPressedWindow]}
                           />
                        ) : (
                           <WindowItem
                              key={window.id}
                              windowAttributes={window}
                              modifyParentState={setSelectedWindow}
                              alreadyPressed={selectedWindow.some(
                                 (element) => window.id == element.id
                              )}
                           />
                        )
                     )
                  )}
               </div>
            </div>
         )}
      </>
   );
}

SelectWindow.propTypes = {
   defaultPhrase: PropTypes.string,
   onlySelectOne: PropTypes.bool,
   storeInKeyName: PropTypes.string.isRequired,
};

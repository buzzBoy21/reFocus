import { useState } from 'react';
import style from './selectWindow.module.css';
import WindowItem from '../windowItem/windowItem';
import Loader from '../loader/loader';
import reloadSVG from '../../assets/reload.svg';
import generateWindowsStructure from './generateWindowsStructure';
import PropTypes from 'prop-types';

export default function SelectWindow({
   defaultPhrase = 'no selected',
   onlySelectOne,
   functionExecuteWhenCloseModal = () => {},
}) {
   const [currentAvailableWindows, setCurrentAvailableWindows] = useState([]);
   const [showSelectWindow, setShowSelectWindow] = useState(false);
   const [selectedWindow, setSelectedWindow] = useState([]); //[{"id": idSelectedWindow,"nameWindow": selectedWindowName},...]
   const [idOtherPressedWindow, setIdOtherPressedWindow] = useState(''); // It's used when onlySelectOne is true, to know when the person click a window
   let insideOfInputWindow = null;

   function fetchGetAllWindowNames() {
      try {
         const fetchData = async () => {
            //This newWindowsNames contain repeat windows, we only need the news windows
            const newWindowsNames = await window.api.services.getAllWindowNames();
            if (newWindowsNames != undefined) {
               //when fetch is working
               setCurrentAvailableWindows((preValue) => {
                  return generateWindowsStructure(newWindowsNames, preValue);
               });
            }
         };
         fetchData();
      } catch (error) {
         console.log(error);
      }
   }
   console.log('selectedwindow', selectedWindow);
   const getPressedWindowName = () => {
      return selectedWindow.map((idAndWidowName) => idAndWidowName['nameWindow']);
   };

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
         {showSelectWindow && (
            <div className={style.emergedWindow}>
               <header className={style.actions}>
                  <button
                     className={style.button}
                     onClick={() => {
                        setShowSelectWindow(false);
                        functionExecuteWhenCloseModal(getPressedWindowName());
                     }}
                  >
                     x
                  </button>
                  <button
                     className={style.button}
                     onClick={() => {
                        fetchGetAllWindowNames();
                     }}
                     title="reload all windows "
                  >
                     <img src={reloadSVG} alt="reload image" style={{ width: '100%' }} />
                  </button>
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
   onlySelectOne: PropTypes.bool,
   functionExecuteWhenCloseModal: PropTypes.func,
};
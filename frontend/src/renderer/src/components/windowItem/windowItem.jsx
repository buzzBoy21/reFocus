import { useEffect, useMemo, useState } from 'react';
import style from './windowItem.module.css';
import notFoundImg from '../../assets/notFound.svg';
import findAndImportProgramImg from './findProgramImg';
import PropTypes from 'prop-types';

export default function WindowItem({
   windowAttributes,
   alreadyPressed = false,
   borderColorWhenPressed = '#d36464',
   modifyParentState = false,
   showPhrase = true,
   customInLineStyle = {},
   onlySelectOne = false,
   IdOtherPressedWindow = [],
}) {
   const [isPressed, setIsPressed] = useState(alreadyPressed);
   const [importedImg, setImportedImg] = useState(false);
   function handleOnclick() {
      setIsPressed((prevVal) => {
         const newValue = !prevVal;

         return newValue;
      });
   }
   if (typeof modifyParentState === 'function') {
      useEffect(() => {
         // //if the window select has onlySelectOne=true and was pressed
         if (onlySelectOne && isPressed && IdOtherPressedWindow[0] != windowAttributes.id) {
            setIsPressed(false); //to unselect this windows automatically, when you press other key
         }
      }, [IdOtherPressedWindow[0]]); //This only is active when the user press other windowItem

      useEffect(() => {
         if (onlySelectOne) {
            // to modify the selectWindow state
            modifyParentState((prevValue) => {
               if (isPressed) {
                  //when you click on windows
                  IdOtherPressedWindow[1](windowAttributes.id);
                  return [windowAttributes];
               } else if (IdOtherPressedWindow[0] != windowAttributes.id) {
                  //when the useEffect of above was activated, remember the useEffect, It allow change the border color of the window to not select color
                  return prevValue;
               } else if (isPressed == false && IdOtherPressedWindow[0] == windowAttributes.id) {
                  //when you pressed a window, and press again to unselect that window
                  IdOtherPressedWindow[1]('');
                  return prevValue.filter((storedWindow) => storedWindow.id != windowAttributes.id);
               }
            });
         } else {
            // to modify the selectWindow state
            // if newValue = true -> write the inside it the nameWindow
            // if newValue = false -> erase nameWindow, which is inside of selectWindow state
            // If I don't write this in the useEffect -> Cannot update a component (SelectWindow) while rendering a different component (WindowItem). see -> https://nidhisharma639593.medium.com/react-bad-setstate-call-f540ee484ce4
            modifyParentState((prevValue) =>
               isPressed
                  ? [...prevValue, windowAttributes]
                  : prevValue.filter((storedWindow) => storedWindow.id != windowAttributes.id)
            );
         }
      }, [isPressed, modifyParentState]);
   }
   useEffect(() => {
      //Execute when component is mounting and when nameWindow was changed
      async function createCSS() {
         setImportedImg(await findAndImportProgramImg(windowAttributes.nameWindow));
      }
      createCSS();
   }, [windowAttributes]);

   return (
      <div
         className={style.containerWindowItem}
         onClick={handleOnclick}
         style={
            isPressed
               ? { borderColor: borderColorWhenPressed, ...customInLineStyle }
               : { ...customInLineStyle }
         }
      >
         {showPhrase ? <p>{windowAttributes.nameWindow}</p> : ''}

         {importedImg ? (
            <img src={importedImg.default} alt="program image" />
         ) : (
            <img src={notFoundImg} alt="not found img" />
         )}
      </div>
   );
}

WindowItem.propTypes = {
   windowAttributes: PropTypes.shape({ id: PropTypes.string, nameWindow: PropTypes.string })
      .isRequired,

   alreadyPressed: PropTypes.bool,
   borderColorWhenPressed: PropTypes.string,
   modifyParentState: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
   showPhrase: PropTypes.bool,
   customInLineStyle: PropTypes.object,
   onlySelectOne: PropTypes.bool,
   IdOtherPressedWindow: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])),
};

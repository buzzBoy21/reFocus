import React, { forwardRef, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import style from './InputKeyBoard.module.css';
import KeyBoard from '../Keyboard/KeyBoard';
import { HotKeyContext } from '../../context/newHotKeyContext';

const InputKeyBoard = forwardRef(function InputKeyBoard({ label = '', keyContextToUpdate }, ref) {
   const [valueContext, updateContext] = useContext(HotKeyContext);
   const [showKeyboard, setShowKeyboard] = useState(false);
   const [KeyPressed, setKeyPressed] = useState(
      //when the key was pressed, in other time. For example the when person press nextStep and then came back the keyboard has to mount again
      valueContext[keyContextToUpdate] === '' ? [] : valueContext[keyContextToUpdate].split('+')
   );

   return (
      <>
         <div>
            <label className={style.labelInputKeyboard}>{label}</label>
            <div
               ref={ref}
               className={style.inputText}
               onClick={() => {
                  setShowKeyboard(true);
               }}
            >
               {KeyPressed.map((keyValue, index) =>
                  ++index === KeyPressed.length && KeyPressed.length > 0 ? (
                     <span key={index}>{keyValue}</span>
                  ) : (
                     <React.Fragment key={index}>
                        <span>{keyValue}</span>
                        <span className={style.plus}> + </span>
                     </React.Fragment>
                  )
               )}
            </div>
         </div>
         <div className={style.emergedWindow}></div>
         {showKeyboard && (
            <div className={style.emergedWindows}>
               <button
                  className={style.button}
                  onClick={() => {
                     setShowKeyboard(false);
                     updateContext(keyContextToUpdate, KeyPressed.join('+'));
                  }}
               >
                  x
               </button>
               <KeyBoard pressKey={setKeyPressed} keysPressedByDefault={KeyPressed} />
            </div>
         )}
      </>
   );
});

InputKeyBoard.propTypes = {
   label: PropTypes.string,
};
export default InputKeyBoard;

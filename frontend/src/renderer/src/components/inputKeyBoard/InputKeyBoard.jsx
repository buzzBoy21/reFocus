import { forwardRef, useContext, useState } from 'react';
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

   console.log(showKeyboard);
   return (
      <>
         <label className={style.labelInputKeyboard}>{label}</label>
         <input
            className={style.inputText}
            type="text"
            ref={ref}
            onClick={() => {
               setShowKeyboard(true);
            }}
            readOnly
            value={KeyPressed.join(' + ')}
         />
         <div className={style.emergedWindow}></div>
         {showKeyboard && (
            <div className={style.emergedWindows} id="cacatua">
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

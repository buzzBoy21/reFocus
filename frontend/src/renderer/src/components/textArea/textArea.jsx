import { forwardRef, useState } from 'react';
import style from './textArea.module.css';
import PropTypes from 'prop-types';
const TextArea = forwardRef(function TextArea(
   { labelText, maxLength = 200, placeHolder = '', defaultValue },
   ref
) {
   const [valueTextArea, setValueTextArea] = useState(defaultValue ?? '');
   const [remainingWord, setRemainingWord] = useState(maxLength);

   return (
      <>
         <div>
            <div className={style.extraInfo}>
               <label htmlFor="textArea" className={style.textAreaLabel}>
                  {labelText}
               </label>
               <p className={style.remainingWord}>Remaning letters: {remainingWord}</p>
            </div>
            <textarea
               id="textArea"
               ref={ref}
               className={style.textArea}
               placeholder={placeHolder}
               maxLength={maxLength}
               onChange={(e) => {
                  setValueTextArea(e.target.value);
                  setRemainingWord(maxLength - parseInt(e.target.value.length));
               }}
               defaultValue={valueTextArea}
            ></textarea>
         </div>
      </>
   );
});

TextArea.propTypes = {
   labelText: PropTypes.string,
};

export default TextArea;

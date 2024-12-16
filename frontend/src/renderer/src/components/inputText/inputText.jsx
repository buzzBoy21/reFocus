import PropType from 'prop-types';
import style from './inputText.module.css';
import { forwardRef } from 'react';
/**
 * @param {string} props.labelText
 * @param {string} props.placeholder deafult value ""
 * @param {string} props.regx deafult value ""
 * @param {string} props.orientation row to have flex-direction:row, column:> flex-direction:column
 */
const InputText = forwardRef(function InputText(
   { labelText, placeholder = '', regx = null, orientation = 'row' },
   ref
) {
   return (
      <>
         <div
            className={
               orientation == 'row'
                  ? style['input-row']
                  : orientation == 'column'
                    ? style['input-column']
                    : ''
            }
         >
            <label htmlFor="nameHotKey">{labelText}</label>
            <input
               ref={ref}
               type="text"
               name="nameHotKey"
               id="nameHotKey"
               className={style.inputText}
               placeholder={placeholder}
               pattern={regx}
            />
         </div>
      </>
   );
});

InputText.propTypes = {
   labelText: PropType.string.isRequired,
   placeholder: PropType.string,
   regx: PropType.string,
   orientation: PropType.oneOf(['row', 'column']),
};

export default InputText;

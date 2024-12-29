import PropType from 'prop-types';
import style from './inputText.module.css';
import { forwardRef, useId } from 'react';
/**
 * @param {string} props.labelText
 * @param {string} props.placeholder deafult value ""
 * @param {string} props.regx deafult value ""
 * @param {string} props.orientation row to have flex-direction:row, column:> flex-direction:column
 */
const InputText = forwardRef(function InputText(
   {
      labelText,
      placeholder = '',
      regx = null,
      orientation = 'row',
      defaultValue,
      flexible = false,
   },
   ref
) {
   const idInputText = useId();

   return (
      <>
         <div
            style={flexible ? { flexWrap: 'wrap' } : {}}
            className={
               orientation == 'row'
                  ? style['input-row']
                  : orientation == 'column'
                    ? style['input-column']
                    : ''
            }
         >
            <label htmlFor={idInputText}>{labelText}</label>
            <input
               ref={ref}
               type="text"
               name="nameHotKey"
               id={idInputText}
               className={style.inputText}
               placeholder={placeholder}
               pattern={regx}
               defaultValue={defaultValue}
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

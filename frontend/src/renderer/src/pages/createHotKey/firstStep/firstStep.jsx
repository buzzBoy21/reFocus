import { useContext } from 'react';
import Button from '../../../components/button/button';
import KeyBoard from '../../../components/Keyboard/KeyBoard';
import style from './firstStep.module.css';
import PropTypes from 'prop-types';
import { HotKeyContext } from '../../../context/newHotKeyContext';

export default function FirstStep({ onClickNextStep }) {
   const [valueContext, updateContext] = useContext(HotKeyContext);
   function setContext(newValue) {
      updateContext('hotKey', newValue);
   }

   return (
      <>
         <h1 className={style.title}>Select your new hot key</h1>
         <KeyBoard whereStorPressedKeyValues={setContext} />
         <div className={style.menu}>
            <Button onClick={onClickNextStep}>Other button</Button>
         </div>
      </>
   );
}
FirstStep.propTypes = {
   onClickNextStep: PropTypes.func.isRequired,
};

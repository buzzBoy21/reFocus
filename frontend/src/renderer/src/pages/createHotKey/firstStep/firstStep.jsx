import { useContext, useState } from 'react';
import Button from '../../../components/button/button';
import KeyBoard from '../../../components/Keyboard/KeyBoard';
import style from './firstStep.module.css';
import PropTypes from 'prop-types';
import { HotKeyContext } from '../../../context/newHotKeyContext';
import { useNavigate } from 'react-router';
export default function FirstStep() {
   const navigate = useNavigate();

   const [valueContext, updateContext] = useContext(HotKeyContext);
   const [allKeyPressed, setAllKeyPressed] = useState(
      //when the key was pressed, in other time. For example the when person press nextStep and then came back the keyboard has to mount again
      valueContext.hotKey === '' ? [] : valueContext.hotKey.split('+')
   );

   function handleButton() {
      //You have to press at least 1 key
      if (allKeyPressed.length > 0) {
         updateContext('hotKey', allKeyPressed.join('+'));
         //pass to the next step
         navigate('/second-step');
      } else {
         //this will be said by Mibo (key avatar)
         console.log('press at least one key !!! 😓😓');
      }
   }

   return (
      <>
         <h1 className={style.title}>Select your new hot key</h1>
         <KeyBoard pressKey={setAllKeyPressed} keysPressedByDefault={allKeyPressed} />
         <div className={style.menu}>
            <Button onClick={handleButton}>Next step</Button>
         </div>
      </>
   );
}

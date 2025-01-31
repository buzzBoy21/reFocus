// Switch.js
import { useState } from 'react';
import style from './switch.module.css';
import PropTypes from 'prop-types';

const Switch = ({
   initialState = false,
   execute,
   label = '',
   tooltip = '',
   suspenseAction = false,
}) => {
   const [isOn, setIsOn] = useState(initialState);
   const [disable, setDisable] = useState(false);
   const handleToggle = () => {
      const newState = !isOn;
      if (suspenseAction) {
         setDisable(true);
         setIsOn(newState);
         execute(newState, setIsOn);
         setTimeout(() => {
            setDisable(false);
         }, 2000);
      } else {
         setIsOn(newState);
         execute(newState, setIsOn);
      }
   };

   return (
      <div className={style.mainDiv}>
         {label && <span className={style.label}>{label}</span>}
         <div className={style.switchContainer}>
            <label className={style.switch}>
               <input type="checkbox" checked={isOn} onChange={handleToggle} disabled={disable} />
               <span className={style.slider}></span>
            </label>
         </div>
         {tooltip && <span className={style.tooltip}>{tooltip}</span>}
      </div>
   );
};

Switch.propTypes = {
   initialState: PropTypes.bool,
   execute: PropTypes.func.isRequired,
   label: PropTypes.string,
   tooltip: PropTypes.string,
   suspenseAction: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

export default Switch;

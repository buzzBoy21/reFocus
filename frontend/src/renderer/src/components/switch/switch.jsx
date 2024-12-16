// Switch.js
import { useState } from 'react';
import style from './switch.module.css';
import PropTypes from 'prop-types';

const Switch = ({ initialState = false, execute, label = '', tooltip = '' }) => {
   const [isOn, setIsOn] = useState(initialState);

   const handleToggle = () => {
      const newState = !isOn;
      setIsOn(newState);
      execute(newState);
   };

   return (
      <div className={style.mainDiv}>
         {label && <span className={style.label}>{label}</span>}
         <div className={style.switchContainer}>
            <label className={style.switch}>
               <input type="checkbox" checked={isOn} onChange={handleToggle} />
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
};

export default Switch;

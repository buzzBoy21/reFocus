import style from './SkeletonLoader.module.css';

const Loader = ({ centerScreen = true }) => {
   return (
      <div
         className={[style.spinner, centerScreen ? style.spinnerCenter : style.normalSpinner].join(
            ' '
         )}
      >
         <div className={style.doubleBounce}></div>
         <div className={style.doubleBounce}></div>
      </div>
   );
};

export default Loader;

import reFocusIcon from '../../assets/reFocus_icon.png';
import style from './Header.module.css';
export default function Header() {
   return (
      <div className={style['frame-container']}>
         <img src={reFocusIcon} alt="reFocus Icon" height={'100%'} />
         <div className={style['controllers-element']}></div>
      </div>
   );
}

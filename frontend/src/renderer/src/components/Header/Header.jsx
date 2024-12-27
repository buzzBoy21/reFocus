import { useContext } from 'react';
import style from './Header.module.css';
import hamburgerIMG from './../../assets/icons/hamburger-menu.svg';
import { Sidebar as SideBarCon } from '../../context/ShowSideBarContext';

export default function Header() {
   const [showOrCloseSidebar, showingSideBar] = useContext(SideBarCon);
   return (
      <div className={style['frame-container']}>
         <button
            onClick={() => {
               showOrCloseSidebar();
            }}
         >
            {' '}
            <img src={hamburgerIMG} alt="hamburger" />
         </button>
      </div>
   );
}

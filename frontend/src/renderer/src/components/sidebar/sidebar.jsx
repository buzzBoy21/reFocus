import { useContext, useEffect } from 'react';
import style from './sidebar.module.css';
import { Sidebar as SideBarCon } from '../../context/ShowSideBarContext';
import Button from '../button/button';
import { NavLink, Link } from 'react-router';
import HomeImg from './../../assets/icons/home.svg';

function Sidebar() {
   const [showOrCloseSidebar, showingSideBar] = useContext(SideBarCon);
   useEffect(() => {
      console.log('hola');
   }, [showingSideBar]);
   return (
      <div
         style={showingSideBar ? { display: 'block' } : { display: 'none' }}
         className={style.sidebar}
      >
         <header className={style.headerSideBar}>
            <Link to={'/'}>
               <Button className={style.closeSideBar} animation={false}>
                  <img src={HomeImg} alt="home image" style={{ width: '80%', height: 'auto' }} />
               </Button>
            </Link>
            <Button
               className={style.closeSideBar}
               onClick={() => {
                  showOrCloseSidebar();
               }}
               animation={false}
            >
               X
            </Button>
         </header>
         <nav>
            <NavLink to={'/all-hot-keys'}>
               <Button animationDuration={'2s'}>created hot keys</Button>
            </NavLink>
            <NavLink to={'/settings'}>
               <Button animationDuration={'1.3s'}>Settings</Button>
            </NavLink>
         </nav>
      </div>
   );
}

export default Sidebar;

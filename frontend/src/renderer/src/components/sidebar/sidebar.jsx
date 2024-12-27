import { useContext, useEffect } from 'react';
import style from './sidebar.module.css';
import { Sidebar as SideBarCon } from '../../context/ShowSideBarContext';
import Button from '../button/button';
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
         <a href="./../pages/secondStep.jsx">asdfasd</a>
      </div>
   );
}

export default Sidebar;

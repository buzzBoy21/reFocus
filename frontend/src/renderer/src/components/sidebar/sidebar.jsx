import { Suspense, use, useContext, useEffect, useRef, useState } from 'react';
import style from './sidebar.module.css';
import { Sidebar as SideBarCon } from '../../context/ShowSideBarContext';
import Button from '../button/button';
import { NavLink, Link } from 'react-router';
import HomeImg from './../../assets/icons/home.svg';
import Switch from '../switch/switch';
import { HandleMessageContext } from '../../components/handleMessage/handleMessage';

function Sidebar() {
   const [showOrCloseSidebar, showingSideBar] = useContext(SideBarCon);
   const [serverIsRunning, setServerIsRunning] = useState(null);
   const absolutePath = useRef(null);
   const [writeMessage] = useContext(HandleMessageContext);
   const [path, setPath] = useState(null);

   useEffect(() => {
      const fetching = async () => {
         const isRunning = await window.api.services.serverIsRunning();
         console.log('isRunning', isRunning);
         setServerIsRunning(isRunning);
      };
      const getAbsolutePath = async () => {
         absolutePath.current = await window.api.getAbsolutePath();
      };
      fetching();
      getAbsolutePath();
   }, []);
   const handleServerRunning = (isOn, setSwitch) => {
      async function executeCommand() {
         try {
            if (isOn) {
               writeMessage('The server is on😃');

               const command = await window.api.executeCommand(
                  'start cmd /k "python ' + absolutePath.current + '\\..\\backend\\__init__.py"',
                  '\\backend\\__init__.exe'
               );
               setPath(absolutePath.current + '\\backend\\__init__.exe');

               console.log('--------------------------------------', command);
            } else {
               const serverIsOff = await window.api.services.getShutDownServer();
               if (serverIsOff === false) {
                  writeMessage('The server has already shut down😭');
               }
            }
         } catch (error) {
            setSwitch(false);
            throw new Error(error.message);
         }
      }
      executeCommand();
   };
   return (
      <div
         style={showingSideBar ? { display: 'block' } : { display: 'none' }}
         className={style.sidebar}
      >
         <header className={style.headerSideBar}>
            <Link to={'/'} onClick={showOrCloseSidebar}>
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
            <NavLink to={'/created-hot-keys'} onClick={showOrCloseSidebar}>
               <Button animationDuration={'2s'} className={style.buttonsOfNav}>
                  Created hot keys
               </Button>
            </NavLink>
            <NavLink to={'/personal-windows-names'} onClick={showOrCloseSidebar}>
               <Button animationDuration={'2s'} className={style.buttonsOfNav}>
                  Personal Windows
               </Button>
            </NavLink>
            <NavLink to={'/settings'} onClick={showOrCloseSidebar}>
               <Button animationDuration={'1.3s'} className={style.buttonsOfNav}>
                  Settings
               </Button>
            </NavLink>
            {path}
            <div className={style.options}>
               {serverIsRunning !== null && (
                  <Switch
                     initialState={serverIsRunning}
                     label="server is running"
                     execute={handleServerRunning}
                     suspenseAction={1000}
                  ></Switch>
               )}
            </div>
         </nav>
      </div>
   );
}

export default Sidebar;

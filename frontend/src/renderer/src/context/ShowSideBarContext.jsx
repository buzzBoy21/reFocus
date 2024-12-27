import { createContext, useState } from 'react';

export const Sidebar = createContext();

export default function ShowSideBarContext({ children }) {
   const [showingSideBar, setShowingSideBar] = useState(false);

   const showOrCloseSidebar = () => {
      setShowingSideBar((prev) => !prev);
   };

   return (
      <Sidebar.Provider value={[showOrCloseSidebar, showingSideBar]}>{children}</Sidebar.Provider>
   );
}

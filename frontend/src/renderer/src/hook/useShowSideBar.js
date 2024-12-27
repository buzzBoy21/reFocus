import { useState } from 'react';

export default function useShowSideBar() {
   const [showingSideBar, setShowingSideBar] = useState(false);

   const showOrCloseSidebar = () => {
      setShowingSideBar((prev) => !prev);
   };

   return [showOrCloseSidebar, showingSideBar];
}

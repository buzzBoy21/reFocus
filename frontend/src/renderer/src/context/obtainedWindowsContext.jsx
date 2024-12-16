import { createContext, useState } from 'react';
export const ObtainedWindows = createContext();

export default function ObtainedWindowsContext({ children }) {
   const [windowsNames, setWindowsNames] = useState([]); // the windows which are fetched by window.api.services.getAllWindowNames

   return (
      <ObtainedWindows.Provider value={[windowsNames, setWindowsNames]}>
         {children}
      </ObtainedWindows.Provider>
   );
}

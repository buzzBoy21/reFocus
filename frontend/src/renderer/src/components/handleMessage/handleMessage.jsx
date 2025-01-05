import { createContext, useEffect, useRef, useState } from 'react';
import Avatar from '../avatar/avatar';
export const HandleMessageContext = createContext();

function HandleMessage({ children }) {
   const [message, setMessage] = useState({ errorMessage: '', message: '' });
   const writeMessage = (newMessage) => {
      setMessage((prev) => ({ ...prev, message: newMessage }));
   };

   const writeErrorMessage = (error) => {
      setMessage((prev) => ({ ...prev, errorMessage: error.message }));
   };

   useEffect(() => {
      setTimeout(() => {
         if (message.errorMessage != '' || message.message != '') {
            setMessage({ errorMessage: '', message: '' });
         }
      }, 4000);
   }, [message]);

   return (
      <HandleMessageContext.Provider value={[writeMessage, writeErrorMessage, message]}>
         <Avatar errorPhrase={message.errorMessage ?? ''} normalMessage={message.message}></Avatar>
         {children}
      </HandleMessageContext.Provider>
   );
}

export default HandleMessage;

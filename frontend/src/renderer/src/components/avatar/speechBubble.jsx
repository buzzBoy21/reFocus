import { useEffect, useState } from 'react';
import style from './speechBubble.module.css';
function SpeechBubble({ errorMessage, normalMessage }) {
   const [messageVisible, setMessageVisible] = useState(true);
   const [message, setMessage] = useState({ errorPhrase: '', message: '' }); // To show the last phrase when the speech bubble is going down:
   // First, the context changes the value, and here we delay that change until the speech bubble is out of view.

   useEffect(() => {
      console.log({ 'valor errorMessage': errorMessage, normalMessage: normalMessage });
      if (errorMessage != '' || normalMessage != '') {
         setMessage({ errorPhrase: errorMessage, message: normalMessage });
         setMessageVisible(true);
      }
      if (errorMessage == '' && normalMessage == '') {
         setMessageVisible(false);
         setTimeout(() => {
            // to delay the erase data
            setMessage({ errorPhrase: '', message: '' });
         }, 200);
      }
   }, [normalMessage, errorMessage]);

   return (
      <div className={`${style.bubbleContainer} ${messageVisible ? style.visible : ''}`}>
         <div className={style.bubble}>
            <p className={style.text}>{message.message}</p>
            <p className={style.error + ' ' + style.shakingText}>{message.errorPhrase}</p>
         </div>
      </div>
   );
}

export default SpeechBubble;

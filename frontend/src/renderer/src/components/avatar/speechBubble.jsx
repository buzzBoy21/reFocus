import { useContext, useEffect, useRef, useState } from 'react';
import style from './speechBubble.module.css';
import { HandleMessageContext } from '../handleMessage/handleMessage';

function SpeechBubble({ errorMessage, normalMessage }) {
   const [messageVisible, setMessageVisible] = useState(true);
   const [message, setMessage] = useState({ errorPhrase: '', message: '' }); // To show the last phrase when the speech bubble is going down:

   const timeOuts = useRef([]); // store all timeOut will be generated

   const [, , , reset] = useContext(HandleMessageContext);
   useEffect(() => {
      if (errorMessage != '' || normalMessage != '') {
         setMessage({ errorPhrase: errorMessage, message: normalMessage });
         setMessageVisible(true); //show speech bubble
         reset(); //reset to default value -> "" empty string
         // the text is still showing due to the message doesn't change

         const hideText = new Promise((resolve) => {
            timeOuts.current.push(
               setTimeout(() => {
                  //after 4seconds the meessage will be hide
                  setMessageVisible(false);
                  resolve();
               }, 4000)
            );
         });
         hideText.then(() => {
            timeOuts.current = [];
            //if the promise is completed, all timeOut will be erased.
         });
      }
      console.log(timeOuts.current);
      return () => {
         if (timeOuts.current.length > 1) {
            //If you generate any error before completing the setTimeout.
            //the previous setTimeOuts which have NOT been completed will be erased
            //Remember the array will be reset to when any setTimeout is completed
            for (let index = 0; index < timeOuts.current.length; index++) {
               if (index === timeOuts.current.length - 1) {
                  break;
               }
               clearTimeout(timeOuts.current[index]);
            }
         }
      };
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

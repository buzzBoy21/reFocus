import style from './avatar.module.css';
import momiAvatar from '../../assets/momi.png';
import { useEffect, useRef, useState } from 'react';
import SpeechBubble from './speechBubble';
import sadMomiAvatar from '../../assets/sad-momi.png';

function Avatar({ errorPhrase, normalMessage }) {
   const [emotion, setEmotion] = useState(momiAvatar);

   useEffect(() => {
      if (errorPhrase !== '') {
         //The avatar is normal because there is no error.
         setEmotion(sadMomiAvatar);
      }
   }, [errorPhrase]);

   return (
      <>
         <div className={style.containerAvatar + ' ' + style.bottomLeft}>
            <img src={emotion} alt="momi image" height={'100%'} width={'auto'} />
            <SpeechBubble
               errorMessage={errorPhrase}
               normalMessage={normalMessage}
               executeWhenHide={() => {
                  setEmotion(momiAvatar);
               }}
            />
         </div>
      </>
   );
}

export default Avatar;

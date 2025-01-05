import style from './avatar.module.css';
import momiAvatar from '../../assets/momi.png';
import { useEffect, useRef, useState } from 'react';
import SpeechBubble from './speechBubble';
import sadMomiAvatar from '../../assets/sad-momi.png';

function Avatar({ errorPhrase, normalMessage }) {
   const [emotion, setEmotion] = useState(momiAvatar);

   useEffect(() => {
      setEmotion(sadMomiAvatar);
      if (errorPhrase == '') {
         //The avatar is normal because there is no error.
         setEmotion(momiAvatar);
      }
   }, [errorPhrase]);

   return (
      <>
         <div className={style.containerAvatar + ' ' + style.bottomLeft}>
            <img src={emotion} alt="momi image" height={'100%'} width={'auto'} />
            <SpeechBubble errorMessage={errorPhrase} normalMessage={normalMessage} />
         </div>
      </>
   );
}

export default Avatar;

import { useContext, useEffect, useState } from 'react';
import style from './createdHotKey.module.css';
import HotKey from '../../components/hotKey/hotKey';
import { HandleMessageContext } from '../../components/handleMessage/handleMessage';

function CreatedHotKey() {
   const [, writeError] = useContext(HandleMessageContext);
   const [allHotKeys, setAllHotKeys] = useState([]);
   useEffect(() => {
      async function fetchHotKeys() {
         const result = await window.api.services.getAllHotKeys();
         console.log(result);
         if (result == undefined) {
            writeError(new Error('The server is not initialized 😢😢'));
         } else {
            setAllHotKeys(result);
         }
      }
      fetchHotKeys();
   }, []);
   return (
      <div className={style.page}>
         <div className={style.content}>
            <h1>All hot keys</h1>
            <div className={style.allHotKeys}>
               {allHotKeys.length === 0 ? (
                  <p>there is not hot key yet</p>
               ) : (
                  allHotKeys.map((hotKey, index) => (
                     <HotKey
                        key={index}
                        hotKeyName={hotKey.hot_key_name}
                        hotKeyDescription={hotKey.hot_key_description}
                        keyToActiveHotKey={hotKey.key_to_active_auto_hot_keys}
                        hotKeyJSONfromServer={hotKey}
                        windowNameToFocus={hotKey.window_name_to_focus}
                        windowNameToBack={hotKey.window_name_to_back}
                        windowWhereExecute={hotKey.windows_where_execute}
                     />
                  ))
               )}
            </div>
         </div>
      </div>
   );
}

export default CreatedHotKey;

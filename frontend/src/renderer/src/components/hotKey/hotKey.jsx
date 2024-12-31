import { useEffect, useRef, useState } from 'react';

import style from './hotKey.module.css';
import KeyList from '../keyList/keyList';
import PropTypes from 'prop-types';
import MinimalHotKey from '../MinimalHotKey/minimalHotKey';
import findAndImportProgramImg from '../windowItem/findProgramImg';
import notFoundImg from '../../assets/notFound.svg';

function HotKey({
   hotKeyName,
   hotKeyDescription,
   keyToActiveHotKey,
   hotKeyJSONfromServer,
   windowNameToFocus,
   windowNameToBack,
}) {
   const [showAllInfo, setShowAllInfo] = useState(false);
   const [height, setHeight] = useState(null);
   const [allImage, setImage] = useState({
      windowToFocus: false,
      windowToBack: false,
      windowWhereExecute: false,
   });

   const hueContainer = useRef(null);

   useEffect(() => {
      async function importAllWindowImages() {
         let result = {
            windowToFocus: null,
            windowToBack: null,
         };

         result.windowToFocus = (await findAndImportProgramImg(windowNameToFocus)).default;

         if (windowNameToBack === '') {
            result.windowToBack = '';
         } else {
            result.windowToBack = (await findAndImportProgramImg(windowNameToBack)).default;
         }

         setImage(result);
      }
      setHeight(getComputedStyle(hueContainer.current).height);
      importAllWindowImages();
   }, []);

   return (
      <>
         <div ref={hueContainer} style={{ position: 'relative', height: height }}>
            {!showAllInfo && (
               <MinimalHotKey
                  onClick={() => {
                     setShowAllInfo((prev) => !prev);
                  }}
                  hotKeyName={hotKeyName}
                  hotKeyDescription={hotKeyDescription}
                  keyToActiveHotKey={keyToActiveHotKey}
                  hotKeyJSONfromServer={hotKeyJSONfromServer}
                  imageWindowNameToFocus={allImage.windowToFocus}
                  titleImageWindowNameToFocus={windowNameToFocus}
               />
            )}
            {showAllInfo && (
               <div
                  className={style.hotKeyContainer}
                  onClick={() => {
                     setShowAllInfo(false);
                  }}
               >
                  <p>{hotKeyName}</p>
                  {hotKeyDescription != '' && (
                     <p>
                        {hotKeyDescription.length > 60
                           ? hotKeyDescription.slice(0, 60) + '...'
                           : hotKeyDescription}
                     </p>
                  )}

                  <div className={style.keys}>
                     <p>key value: </p>
                     <KeyList stringKeys={keyToActiveHotKey}></KeyList>
                  </div>

                  <p>window to focus</p>
                  <img
                     src={allImage.windowToFocus ?? notFoundImg}
                     alt=""
                     title={windowNameToFocus}
                  />

                  <p>window to back</p>
                  {windowNameToBack ? (
                     <img
                        src={allImage.windowNameToBack ?? notFoundImg}
                        alt=""
                        title={windowNameToFocus}
                     />
                  ) : (
                     'no one'
                  )}

                  <button
                     className={style.eraseButton}
                     onClick={async () =>
                        await window.api.services.deleteHotKey(hotKeyJSONfromServer)
                     }
                  >
                     Delete
                  </button>
               </div>
            )}
         </div>
      </>
   );
}
HotKey.propTypes = {
   hotKeyName: PropTypes.string.isRequired,
   hotKeyDescription: PropTypes.string.isRequired,
   keyToActiveHotKey: PropTypes.string.isRequired,
   hotKeyJSONfromServer: PropTypes.shape({
      key_to_active_auto_hot_keys: PropTypes.string.isRequired,
      hot_key_name: PropTypes.string.isRequired,
      hot_key_description: PropTypes.string.isRequired,
      key_to_press_when_focused: PropTypes.string.isRequired,
      window_name_to_focus: PropTypes.string.isRequired,
      window_name_to_back: PropTypes.string.isRequired,
      windows_where_execute: PropTypes.arrayOf(PropTypes.string).isRequired,
      execute_on_target: PropTypes.bool.isRequired,
      flexible_search: PropTypes.bool.isRequired,
   }).isRequired,
};
export default HotKey;

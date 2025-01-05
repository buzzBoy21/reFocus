import KeyList from '../keyList/keyList';
import style from './minimalHotKey.module.css';
import PropTypes from 'prop-types';
import notFoundImg from '../../assets/notFound.svg';

function MinimalHotKey({
   hotKeyName,
   hotKeyDescription,
   keyToActiveHotKey,
   hotKeyJSONfromServer,
   imageWindowNameToFocus,
   titleImageWindowNameToFocus,
   onClick,
}) {
   return (
      <>
         <div className={style.hotKeyContainer} onClick={onClick}>
            <p>{hotKeyName}</p>
            {hotKeyDescription === '' ? null : (
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
            <img src={imageWindowNameToFocus} alt="" title={titleImageWindowNameToFocus} />

            <button
               className={style.eraseButton}
               onClick={async (e) => {
                  e.stopPropagation(); //to don't execute onClick function when you press button
                  await window.api.services.deleteHotKey(hotKeyJSONfromServer);
               }}
            >
               Delete
            </button>
         </div>
      </>
   );
}
MinimalHotKey.propTypes = {
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
export default MinimalHotKey;

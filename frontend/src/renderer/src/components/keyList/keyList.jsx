import style from './keyList.module.css';

function KeyList({ stringKeys, separator = '+' }) {
   return (
      <div className={style.keyListContainer}>
         {stringKeys.split(separator).map((eachKey, index, arrayKey) => (
            <>
               <div className={style.pressedKeys} key={index}>
                  {eachKey}
               </div>
               {index === arrayKey.length - 1 ? '' : <span>+</span>}
            </>
         ))}
      </div>
   );
}

export default KeyList;

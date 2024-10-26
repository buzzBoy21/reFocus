import { useContext, useEffect, useRef, useState } from 'react';
import style from './KeyBoard.module.css';
import { TemplateContext } from '../../context/templateKeyBoardContext';
import { StyleSheet, css } from 'aphrodite';
import KeyCapOrSpace from '../KeyCapOrSpace/KeyCapOrSpace';
import useFullScreenChange from '../../hook/useFullScreenChange';
function KeyBoard() {
   const refNormalKey = useRef(null);
   const refKeyBoard = useRef(null);
   const [template] = useContext(TemplateContext);
   const [normalKeyHeight, setNormalKeyHeight] = useState(null);
   const [normalKeyBorder, setNormalKeyBorder] = useState(null);
   const [gapKeyboard, setGapKeyboard] = useState(null);
   const templateExist = template.keys != undefined && template.keys != null;

   useEffect(() => {
      const funcion = async function () {
         console.log(await useFullScreenChange(), 'ejecucionooooo');
      };
      funcion();
   }, []);

   //This code is online execute when element is rendering-> when template was updated
   if (template['styleKeyboard'] != undefined) {
      console.log(template);
      template['styleKeyboard'].gridTemplateRows = `repeat(${template['partsInHeight']},'1fr'})`; //Don't affect permanently to state
      template['styleKeyboard'].gridTemplateColumns = `repeat(${template['partsInWidth']},1fr)`; //Don't affect permanently to state
   }
   const styles = StyleSheet.create({
      styleKeyboard: template['styleKeyboard'] ?? {},
   });

   useEffect(() => {
      //When It mounts, set the default value
      console.log('aqi');
      if (refNormalKey.current && refKeyBoard.current) {
         const styleNormalKey = getComputedStyle(refNormalKey.current);
         const height = styleNormalKey.height;
         const heightParse = parseFloat(height.substring(0, height.length - 2)); //remove px word
         const borderTop = styleNormalKey.borderTopWidth;
         const borderBottom = styleNormalKey.borderBottomWidth;
         const border = {
            top: parseFloat(borderTop.substring(0, borderTop.length - 2)), //remove px word
            bottom: parseFloat(borderBottom.substring(0, borderBottom.length - 2)), //remove px word
         };

         const gap = getComputedStyle(refKeyBoard.current).gap;
         const gapParse = parseFloat(gap.substring(0, height.length - 2)); //remove px word
         setNormalKeyHeight(heightParse);
         setGapKeyboard(gapParse);
         setNormalKeyBorder(border);

         setGapKeyboard(gapParse);

         const handleResize = () => {
            const styleNormalKey = getComputedStyle(refNormalKey.current);
            const height = styleNormalKey.height;
            const heightParse = parseFloat(height.substring(0, height.length - 2)); //remove px word
            const borderTop = styleNormalKey.borderTopWidth;
            const borderBottom = styleNormalKey.borderBottomWidth;
            const border = {
               top: parseFloat(borderTop.substring(0, borderTop.length - 2)), //remove px word
               bottom: parseFloat(borderBottom.substring(0, borderBottom.length - 2)), //remove px word
            };
            console.log(getComputedStyle(refNormalKey.current), 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');

            const gap = getComputedStyle(refKeyBoard.current).gap;
            const gapParse = parseFloat(gap.substring(0, height.length - 2));
            //When this happens, It will make a rendering of al key
            setNormalKeyHeight(heightParse);
            setNormalKeyBorder(border);
            setGapKeyboard(gapParse);
         };
         //active the listener
         window.addEventListener('resize', handleResize);

         // remove the event listener when the component unmounts
         return () => {
            window.removeEventListener('resize', handleResize);
         };
      }
   }, [refNormalKey.current, refKeyBoard.current]);

   function generateKeyBoard(keyAttribute, index) {
      if (keyAttribute.type == 'key') {
         return (
            <KeyCapOrSpace
               //only ref the key which have referenceKey property
               ref={keyAttribute.referenceKey == undefined ? null : refNormalKey}
               key={index}
               keyValue={keyAttribute.keyValue}
               pressedStyle={keyAttribute.pressedStyle ?? template.generalPressedStyle}
               normalSize={{
                  normalSizeFromTemplate: template.normalKeySize,
                  heightNormalKey: normalKeyHeight,
                  gap: gapKeyboard,
                  border: normalKeyBorder,
               }}
               size={keyAttribute.customSize ?? 'normal'}
               style={keyAttribute.customKeyStyle ?? template.generalKeyStyle}
               letterStyle={
                  keyAttribute.customLetterStyle ?? template.generalLetterStyle ?? null
                  //¿no customLetterStyle? -> ¿no generalLetterStyle? -> null. Null will be used to  defaultLetterStyle
               }
               type={keyAttribute.type ?? 'key'}
            >
               {keyAttribute.lettersKey ?? 'no letter'}
            </KeyCapOrSpace>
         );
      } else {
         return (
            <KeyCapOrSpace
               key={index}
               normalSize={{
                  normalSizeFromTemplate: template.normalKeySize,
                  heightNormalKey: normalKeyHeight,
                  gap: gapKeyboard,
                  border: normalKeyBorder,
               }}
               size={keyAttribute.customSize ?? 'normal'}
               style={keyAttribute.customSpaceStyle ?? template.generalSpaceStyle}
               type={keyAttribute.type}
            />
         );
      }
   }
   return (
      <div className={style['keyboard-container']}>
         <div
            ref={refKeyBoard}
            className={[style['basis-keyboard-layout'], css(styles.styleKeyboard)].join(' ')}
         >
            {templateExist
               ? //exist template
                 template.keys[0].row
                  ? //use row format in JSON
                    template.keys.map((keysOnRow) =>
                       keysOnRow.row.map((keyAttribute, index) =>
                          generateKeyBoard(keyAttribute, index)
                       )
                    )
                  : //use keys without row
                    template.keys.map((keyAttribute, index) =>
                       generateKeyBoard(keyAttribute, index)
                    )
               : 'make the json badly'}
         </div>
      </div>
   );
}

export default KeyBoard;

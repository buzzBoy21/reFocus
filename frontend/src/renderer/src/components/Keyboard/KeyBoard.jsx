import { useContext, useEffect, useRef, useState } from 'react';
import style from './KeyBoard.module.css';
import { TemplateContext } from '../../context/templateKeyBoardContext';
import { StyleSheet, css } from 'aphrodite';
import KeyCapOrSpace from '../KeyCapOrSpace/KeyCapOrSpace';
function KeyBoard({ whereStorPressedKeyValues }) {
   const refNormalKey = useRef(null);
   const refKeyBoard = useRef(null);
   const [template] = useContext(TemplateContext);

   //---
   const [normalKeyHeight, setNormalKeyHeight] = useState(null); //store the current normalKey height
   const [normalKeyBorder, setNormalKeyBorder] = useState(null); //store the current normalKey width border
   const [gapKeyboard, setGapKeyboard] = useState(null); //store the current normalKey height

   //check if the component load the styleKeyboard of TemplateContext the loading is async
   if (template['styleKeyboard'] != undefined) {
      // When the template styleKeyboard is loading, it means that all templates have been loaded.

      //change the styleKeyboard to config the mount of rows and columns
      template['styleKeyboard'].gridTemplateRows = `repeat(${template['partsInHeight']},'1fr'})`; //Don't affect permanently to state
      template['styleKeyboard'].gridTemplateColumns = `repeat(${template['partsInWidth']},1fr)`; //Don't affect permanently to state
   }

   //loading the styleKeyboard this can be changed by the previous conditional
   const styles = StyleSheet.create({
      styleKeyboard: template['styleKeyboard'] ?? {},
   });

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

   useEffect(() => {
      //When It mounts, change the default value of useState normalKeyHeight, normalKeyBorder (top border and bottom border) and gapKeyboard

      if (refNormalKey.current && refKeyBoard.current) {
         handleResize(); // Change normalKeyHeight, normalKeyBorder, and gapKeyboard to the current values.
         // When we resize the screen, the border, height of normal keys, and the keyboard gap may change.
         // These changes can cause custom keys to have a different height than normal keys.
         // To resolve this, each key with a customSize will automatically adjust its height,
         // which is calculated based on the current values of normalKeyHeight, normalKeyBorder, and gapKeyboard. This happen into createSize function of  each KeyCapsOrSpace

         //active the listener this updates automatically the states
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

   //detect if the template has keys
   const templateExist = template.keys != undefined && template.keys != null;
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

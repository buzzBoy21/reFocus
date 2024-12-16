import { forwardRef, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import PropTypes from 'prop-types';
import createSize from './defaultSize';
import styleCSS from './KeyCap.module.css';

const KeyCapOrSpace = forwardRef(function KeyCapOrSpace(props, ref) {
   const {
      children,
      type,
      keyValue,
      size,
      normalSize,
      style,
      letterStyle,
      pressedStyle,
      onClick,
      defaultPressed = false, //when the key was pressed, in other time. For example the when person press nextStep and then came back the keyboard has to mount again
   } = props;

   const [isPressed, setIsPressed] = useState(defaultPressed);
   let styles = '';

   //to change to active the pressed class
   async function handlerKey() {
      setIsPressed((prev) => !prev);
      if (isPressed) {
         //if is pressed means the value is in state allKeyPressed in FirstStep component
         //then we have to remove because the state will change to false
         //this onClick is the setAllKeyPressed function from FirstStep
         onClick((prevValue) => {
            return prevValue.filter((value) => value != keyValue);
         });
      } else {
         //add new value
         onClick((prevValue) => [...prevValue, keyValue]);
      }
   }

   //make the classes that will be used
   styles = StyleSheet.create({
      size: createSize(size, normalSize),
      //when you don't write the pressedStyle prop return {}
      pressed: pressedStyle ?? {},
      style: style,
      //when you don't write the letterStyle prop return {}
      letterStyle: letterStyle ?? {},
   });
   return type == 'key' ? (
      <div
         ref={ref}
         onClick={handlerKey}
         className={[css(styles.size), isPressed ? css(styles.pressed) : css(styles.style)].join(
            ' '
         )}
      >
         <span
            className={
               styles.letterStyle === null ? styleCSS.defaultLetterStyle : css(styles.letterStyle)
            }
         >
            {children}
         </span>
      </div>
   ) : (
      <div className={[css(styles.size), css(styles.style)].join(' ')}></div>
   );
});

// /**
//  * Validates that a specific prop is required and of a specific type when `type` is `'key'`.
//  * @param {*} props all props of the component
//  * @param {*} propName The name of the prop to validate
//  * @param {*} componentName The name of the component where this rule applies
//  * @param {*} typeAccept The expected type of the prop
//  */
// const requiredWhenIsKey = (props, propName, componentName, typeAccept) => {
//    if (props.type === 'key') {
//       // Check if the prop exists
//       if (!props[propName]) {
//          return new Error(
//             `The prop \`${propName}\` is required in \`${componentName}\` when \`type\` is 'key'.`
//          );
//       }
//       // Check if the prop is of the correct type
//       if (typeof props[propName] !== typeAccept) {
//          return new Error(
//             `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Expected a ${typeAccept} when \`type\` is 'key'.`
//          );
//       }
//    }
//    // No error returned means the validation passed
// };

// Define PropTypes for KeyCapOrSpace component
// KeyCapOrSpace.propTypes = {
//    type: PropTypes.oneOf(['key', 'space']).isRequired, // 'key' or 'space' is required
//    keyValue: (props, propName, componentName) =>
//       requiredWhenIsKey(props, propName, componentName, 'string'), // Required only if type is 'key'
//    children: (props, propName, componentName) =>
//       requiredWhenIsKey(props, propName, componentName, 'string'), // Required only if type is 'key'
//    size: PropTypes.string.isRequired, // size is always required
//    normalSize: PropTypes.shape({
//       aspectRatio: PropTypes.string.isRequired,
//       gridColumn: PropTypes.string.isRequired,
//       gridRow: PropTypes.string.isRequired,
//    }).isRequired, // normalSize object is required
//    style: PropTypes.object.isRequired, // style object is required
//    letterStyle: (props, propName, componentName) =>
//       requiredWhenIsKey(props, propName, componentName, 'object'), // Required only if type is 'key'
//    pressedStyle: (props, propName, componentName) =>
//       requiredWhenIsKey(props, propName, componentName, 'object'), // Required only if type is 'key'
// };
export default KeyCapOrSpace;

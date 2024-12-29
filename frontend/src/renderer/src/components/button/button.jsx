import PropTypes, { object, string } from 'prop-types';
import style from './button.module.css';
import { StyleSheet, css } from 'aphrodite';

export default function Button({
   children,
   onClick,
   paddingTopAndBottom = null, //can use any unit
   fontSize = '1em', //can use any unit and the words: large, ect
   widthPerLetter = '12', //this is px
   animationDuration = null,
   className = '',
   animation = true,
   title = '',
   inlineStyle = {},
}) {
   let allLetter = null;
   let allLetterDelay = null;
   let widthInPx = null;
   let key = null;
   let styles = null;

   if (typeof children === 'string') {
      allLetter = children.split('');
      allLetterDelay = {};

      //when animation is playing the width doen't change
      widthInPx = allLetter.length * widthPerLetter;

      for (let index = 0; index < allLetter.length; index++) {
         key = 'delayAnimation' + index;
         allLetterDelay[key] = {
            'animation-delay': `${index * 100}ms`,
            fontSize: fontSize,
            animationDuration: animationDuration && animationDuration, //If animationDuration is null aphrodite will not use it
         };
      }
      styles = StyleSheet.create(allLetterDelay);
   }

   return (
      <button
         title={title}
         onClick={onClick}
         className={[style['button-style'], className].join(' ')}
         style={
            paddingTopAndBottom
               ? { padding: `${paddingTopAndBottom} 0`, width: `${widthInPx}px`, ...inlineStyle }
               : animation == true
                 ? { width: `${widthInPx}px`, ...inlineStyle }
                 : { ...inlineStyle }
         }
      >
         {animation
            ? allLetter.map((letter, index) => (
                 <span key={index} className={css(styles[`delayAnimation${index}`])}>
                    {letter}
                 </span>
              ))
            : children}
      </button>
   );
}

Button.propTypes = {
   children: PropTypes.oneOf([string, object]),
   onClick: PropTypes.func,
   padding: PropTypes.string,
};

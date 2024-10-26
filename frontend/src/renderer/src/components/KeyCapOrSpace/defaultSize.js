/**
 * Returns the grid size based on the specified key size and normal key size.
 *
 * @param {string} keySize - The size category for the key, which can be 'normal', 'wide-horizontal', 'wide-vertical', 'square', or 'space'.
 * @param {Object} normalKeySize - An object containing the grid size for a normal key.
 * @param {string} aspectRatio - Don't use hear
 * @param {string} normalKeySize.gridColumn - The column span for a normal key.
 * @param {string} normalKeySize.gridRow - The row span for a normal key.
 *
 * @returns {Object} An object containing the gridColumn and gridRow properties representing the size for the specified key size.
 *
 * @throws {Error} Throws an error if the provided keySize does not match any predefined categories.
 */
export default function createSize(size, normalSizeKey) {
   let result;
   const normalSize = normalSizeKey.normalSizeFromTemplate;
   const heightNormalKey = normalSizeKey.heightNormalKey;
   const keyboardGap = normalSizeKey.gap;
   const border = normalSizeKey.border;
   switch (size) {
      case 'normal':
         result = {
            aspectRatio: normalSize['aspectRatio'], //aspect ratio
            gridColumn: `span ${normalSize['gridColumn']}`, // width size to normal keys
            gridRow: `span ${normalSize['gridRow']}`, // width size to normal keys
         };
         break;

      case 'wide-horizontal':
         result = {
            gridColumn: `span ${normalSize['gridColumn'] * 2}`, // expand the width to double the normalSize
            gridRow: `span ${normalSize['gridRow']}`, // has the same height as normalSize
         };
         break;

      case 'wide-vertical':
         result = {
            gridColumn: `span ${normalSize['gridColumn']}`, // has the same width as normalSize
            gridRow: `span ${normalSize['gridRow'] * 2}`, // expand the height to double the normalSize
         };
         break;

      case 'square':
         result = {
            gridColumn: `span ${normalSize['gridColumn'] * 2}`, // expand the width to double the normalSize
            gridRow: `span ${normalSize['gridRow'] * 2}`, // expand the height to double the normalSize
         };
         break;

      case 'space':
         result = {
            gridColumn: `span ${normalSize['gridColumn'] * 6}`, // Expand the width to match the space key, which is 6 times normalsize.
            gridRow: `span ${normalSize['gridRow']}`, // has the same height as normalSize
         };

         break;
      default:
         {
            //border or KeyboardGap normalSize was changed the default value don't return the result
            //The interpreter will pass again when the states of this values is change this happens when:
            //- states was updated
            //- contenxt was update (this means was changed the layout keyboard)
            if (border != null && keyboardGap != null && normalSize != null) {
               console.log(border);
               const pattern = /^(?!0)(\d+)\/(?!0)(\d+)$/;
               const isValid = pattern.test(size);
               const [heightSize, widthSize] = size.split('/');
               const gridRowNormalKey = parseInt(normalSize['gridRow']);
               let height = '';

               //How many normal keys in axe Y fill the current key
               const howManyNormalKeyFill = heightSize / gridRowNormalKey; //1 is fil the same 1.5 is filling one normal key and half

               const passedTroughGaps = howManyPassedThroughGaps(howManyNormalKeyFill);
               const { passedTopBorder, passedBottomBorder } =
                  howManyPassedThroughBordes(howManyNormalKeyFill);

               height = {
                  gridColumn: `span ${widthSize}`, // is the number of filled column
                  gridRow: `span ${heightSize}`, // is the number of filled key
                  height: `${howManyNormalKeyFill * heightNormalKey + keyboardGap * passedTroughGaps + border.top * passedTopBorder + border.bottom * passedBottomBorder}px`,
                  boxSizing: 'border-box',
               };

               if (isValid) {
                  result = height;
                  // console.log(heightNormalKey, parseInt(heightSize), keyboardGap, 'ssssssssss');
               } else {
                  throw new Error(
                     'size: Online admit: \nnormal\nwide-horizontal\nwide-vertical\nsquare\nspace\nnumber/number -> the number must be HIGHER than 0 and NO DECIMAL number'
                  );
               }
            } else {
               result = {};
            }
         }
         break;
   }
   return result;
}

function howManyPassedThroughGaps(howManyNormalKeyFill) {
   let result = 0;
   const truncateValue = Math.trunc(howManyNormalKeyFill);
   if (howManyNormalKeyFill == truncateValue) {
      result = howManyNormalKeyFill - 1;
   } else {
      result = truncateValue;
   }
   return result;
}

function howManyPassedThroughBordes(howManyNormalKeyFill) {
   let result = { passedTopBorder: 0, passedBottomBorder: 0 };
   const truncateValue = Math.trunc(howManyNormalKeyFill);

   if (howManyNormalKeyFill == truncateValue) {
      result.passedTopBorder = truncateValue;
      result.passedBottomBorder = truncateValue;
   } else {
      result.passedTopBorder = truncateValue + 1;
      result.passedBottomBorder = truncateValue;
   }
   return result;
}

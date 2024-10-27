import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Context for managing hotkey settings in the application.
 *
 * This context provides a state object containing hotkey configurations and a function to update
 * the attributes of this state. It can be consumed in child components using `useContext(HotKeyContext)`.
 *
 * @returns {[Object, function]} - Returns the current state of the context and the function
 * to update the context attributes.
 *
 * @example
 * const [hotKeyState, updateHotKey] = useContext(HotKeyContext);
 */
export const HotKeyContext = createContext();

export default function NewHotKeyContext({ children }) {
   const [valueContext, setValueContext] = useState({
      hotKey: null,
      nameHotKey: null,
      keyToPress: null,
      windowWhereActive: [],
      WindowWhereExecuteKeys: null,
      intelligenceSearch: true,
   });
   /**
    * Updates the context value by setting a specific attribute to a new value.
    *
    * This function uses the `setValueContext` function to update the state in a context provider.
    * It creates a new state object by spreading the previous state and updating the specified attribute.
    *
    * @param {string} attributeName - The name of the attribute to update in the context state.
    * @param {*} newValue - The new value to set for the specified attribute.
    *
    * @returns {void} - This function does not return a value.
    */
   function updateAttribute(attributeName, newValue) {
      setValueContext((prevValue) => {
         return { ...prevValue, [attributeName]: newValue };
      });
   }

   return (
      <HotKeyContext.Provider value={[valueContext, updateAttribute]}>
         {children}
      </HotKeyContext.Provider>
   );
}

NewHotKeyContext.propTypes = {
   children: PropTypes.node.isRequired,
};

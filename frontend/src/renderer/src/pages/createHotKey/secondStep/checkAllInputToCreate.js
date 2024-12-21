/**
 * Validates the input values required to create a hotkey configuration.
 *
 * @param {Object} contextValue - The context containing the configuration values.
 * @param {string} contextValue.nameHotKey - The name of the hotkey to be created.
 * @param {string} contextValue.hotKey - The key or combination of keys to activate the hotkey.
 * @param {string} contextValue.keyToPress - The key or combination of keys that will be automatically pressed.
 * @param {Array<string>} contextValue.windowToFocus - The list of windows to focus on.
 * @returns {boolean} - Returns `true` if all inputs are valid.
 * @throws {Error} - Throws an error with a specific message if any validation fails.
 */
export default function checkAllInputToCreate(contextValue) {
   console.log('hola', contextValue);
   if (contextValue.nameHotKey === '') {
      throw new Error('You have to write a name.');
   }

   if (contextValue.hotKey === '') {
      throw new Error('You have to select at least one key to activate the hotkey.');
   }

   if (contextValue.windowToFocus.length === 0) {
      throw new Error('You have to select at least one window to focus.');
   }

   return true;
}

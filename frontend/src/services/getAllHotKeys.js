/**
 * Fetches all the configured hotkeys from the server.
 *
 * @function
 * @returns {Promise<Object[]>} A promise that resolves to an array of hotkey objects.
 * Each object contains the following properties:
 * - `key_to_active_auto_hot_keys` {string}: The key combination that activates the hotkey (e.g., "shift+w+a+b").
 * - `hot_key_name` {string}: The name of the hotkey (e.g., "Open Application").
 * - `hot_key_description` {string}: A description of what the hotkey does (e.g., "This hotkey opens the specified application.").
 * - `key_to_press_when_focused` {string}: The key to press when the target window is focused (e.g., "b").
 * - `window_name_to_focus` {string}: The name of the window to focus when the hotkey is activated (e.g., "Obsidian").
 * - `window_name_to_back` {string}: The name of the window to return to after execution (empty if not specified).
 * - `windows_where_execute` {Array<string>}: A list of window names where the hotkey can be executed (empty if not specified).
 * - `execute_on_target` {boolean}: Whether to execute the hotkey on the target window.
 * - `flexible_search` {boolean}: Whether to allow flexible search for the window name.
 *
 * @throws {Error} If the fetch request fails or the server responds with a non-OK status.
 */
function getAllHotKeys() {
   return fetch('http://localhost:8080/get-all-hot-keys', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
   })
      .then((response) => {
         if (response.ok) {
            return response.json();
         } else {
            return new Error(`Error: ${response.status}`);
         }
      })
      .then((data) => data)
      .catch((error) => {
         console.log(error);
      });
}

export default getAllHotKeys;

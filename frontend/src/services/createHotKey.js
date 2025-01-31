/**
 *
 * @param {json} bodyData
 * @returns {Promise<bool>} return true is post was successful and false in case of fail
 */
export default function postCreateHotKey(bodyData) {
   return fetch('http://localhost:8080/create-hot-key', {
      method: 'POST',

      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         key_to_active_auto_hot_keys: bodyData.hotKey,
         hot_key_name: bodyData.nameHotKey,
         hot_key_description: bodyData.description,

         key_to_press_when_focused: bodyData.keyToPress,
         window_name_to_focus: bodyData.windowToFocus[0].nameWindow,
         window_name_to_back:
            bodyData.windowToBack.length === 0 ? '' : bodyData.windowToBack[0].nameWindow,
         windows_where_execute: bodyData.windowWhereActive.map((item) => item.nameWindow), //remove the id
         execute_on_target: bodyData.executeOnTargetWindow,
         flexible_search: bodyData.intelligenceSearch,
         flexible_search_to_back: bodyData.intelligenceSearchToBack,
      }),
   })
      .then((response) => {
         console.log(response.ok);
         if (response.ok) {
            return response.json();
         }
      })
      .then((responseParse) => {
         if (responseParse.response === false) {
            throw new Error('Check if you are selecting unsupported keys: example window: key.');
         }
         return responseParse.response;
      })
      .catch((error) => {
         if (error instanceof TypeError && error.message === 'fetch failed') {
            return new Error(`The server is off. You can turn it on from the sidebar.`);
         }
      });
}

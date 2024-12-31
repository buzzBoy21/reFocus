/**
 *
 * @param {json} bodyData
 * @returns {Promise<bool>} return true is post was successful and false in case of fail
 */
export default function postCreateHotKey(bodyData) {
   console.log('bodyData', bodyData);
   console.log('bodyData', bodyData.windowToFocus[0].nameWindow);
   return fetch('http://localhost:8080/create-hot-key', {
      method: 'POST',

      headers: {
         'Content-Type': 'application/json, charset=UTF-8',
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
      }),
   })
      .then((response) => {
         if (response.ok) {
            return response.json();
         } else {
            return new Error(`Error: ${response.status}`);
         }
      })
      .then((responseParse) => {
         return responseParse.response;
      })
      .catch((error) => {
         console.log(error);
      });
}

function deleteHotKey(bodyData) {
   console.log(
      JSON.stringify({
         key_to_active_auto_hot_keys: bodyData.key_to_active_auto_hot_keys,
         hot_key_name: bodyData.hot_key_name,
         hot_key_description: bodyData.hot_key_description,

         key_to_press_when_focused: bodyData.key_to_press_when_focused,
         window_name_to_focus: bodyData.window_name_to_focus,
         window_name_to_back: bodyData.window_name_to_back,
         windows_where_execute: bodyData.windows_where_execute, //remove the id
         execute_on_target: bodyData.execute_on_target,
         flexible_search: bodyData.flexible_search,
         flexible_search_to_back: bodyData.flexible_search_to_back,
      })
   );
   return fetch('http://localhost:8080/delete-hot-key', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         key_to_active_auto_hot_keys: bodyData.key_to_active_auto_hot_keys,
         hot_key_name: bodyData.hot_key_name,
         hot_key_description: bodyData.hot_key_description,

         key_to_press_when_focused: bodyData.key_to_press_when_focused,
         window_name_to_focus: bodyData.window_name_to_focus,
         window_name_to_back: bodyData.window_name_to_back,
         windows_where_execute: bodyData.windows_where_execute, //remove the id
         execute_on_target: bodyData.execute_on_target,
         flexible_search: bodyData.flexible_search,
         flexible_search_to_back: bodyData.flexible_search_to_back,
      }),
   })
      .then((response) => {
         if (!response.ok) {
            return new Error(`Error ${response.status}`);
         }
      })
      .catch((Error) => {
         console.log(Error);
      });
}

export default deleteHotKey;

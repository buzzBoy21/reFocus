# What do

This is used when you want create a new Hot Key controller by APIREST

# Parameters

- **key_to_active_auto_hot_keys\***:keys would press user to active hotkey
- **hot_key_name\*** (str):name of the hot key is used by user to identify the hot key
- **hot_key_description**? (str): description to add more information to each hot key
- **key_to_press_when_focused\*** (str):Keys to press automatically on the windows which will be focused.
- **window_name_to_focus\*** (str):window's name to focus
- **window_name_to_back**? (str):window's name to back after,key_to_press_when_focused will be activated
- **windows_where_execute**? (array[str]): if you want execute the hotkey only in some windows
- **execute_on_target\*** (bool): if you want to execute the hotkey on the targeted window (window_name_to_focus).

  - true: execute on target window (window_name_to_focus)
  - false: no execute on target window (window_name_to_focus)

- **flexible_search**? (bool): search the name of targeted window by substring matching It use window_name_to_focus (substring) and the whole window name.
  - true: active flexible search
  - false: no active flexible search

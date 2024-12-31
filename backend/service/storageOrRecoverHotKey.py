from .jsonFileHandler import JsonFileHandler
from model.hotKeys import HotKey
from .windowUtils import WindowUtils
from .changeFocusAndAction import ChangeFocusAndAction

class StorageOrRecoverHotKey():
    """
        Is used when hotkey are being created to stock the hotkey and when the server start to recover all hotkey was saved
    """
    def __init__(self , relativePathFile):
        self._jsonHandler=JsonFileHandler(relativePathFile)

    def reCreateAllHotKeys(self):
        """
            Recreates all stored hotkeys.This is being used on server startup..
        """
        allStoragedHotKeys=self._jsonHandler.read_json()
        allStoragedHotKeys=self._jsonHandler.read_json()["allStorage"]
        for storagedHotKey in allStoragedHotKeys:
            #its the same code of createHotKeyController
            key_to_active_fuction=storagedHotKey["key_to_active_auto_hot_keys"]
            hot_key_name = storagedHotKey["hot_key_name"]
            hot_key_description = storagedHotKey.get("hot_key_description", "")

            key_to_press_when_focus = storagedHotKey["key_to_press_when_focused"]
            window_name_to_focus = storagedHotKey["window_name_to_focus"]
            window_name_to_back = storagedHotKey.get("window_name_to_back", "")
            windows_where_execute = storagedHotKey.get("windows_where_execute", [])
            execute_on_target = storagedHotKey.get("execute_on_target", False)
            flexible_search = storagedHotKey.get("flexible_search", False)


            #detect if key_to_active_fuction have alt or ctrl
            modifierKeys = "ctrl" in key_to_active_fuction or "alt" in key_to_active_fuction

            fuctionToExecute=ChangeFocusAndAction(key_to_press_when_focus,
                                                    window_name_to_focus,
                                                    window_name_to_back,
                                                    windows_where_execute,
                                                    execute_on_target,
                                                    modifierKeys,
                                                    flexible_search)
            HotKey.createAndAddToHotKeyList(key_to_active_fuction,
                                    fuctionToExecute.executeReFocus,
                                    hot_key_name,
                                    hot_key_description)
    
    def storageHotKey(self,ChangeFocusAndActionObject:ChangeFocusAndAction,HotKeyObject:HotKey,flexibleSearch):
        """
            Stores the created hotkey in the db.json file
        """
        keyToActiveHotKey= HotKeyObject.keysToPress
        nameHotKey = HotKeyObject.nameHotKey
        description = HotKeyObject.description

        keyToPressWhenFocused = ChangeFocusAndActionObject.keyToPressWhenFocused
        nameWindowToFocus = ChangeFocusAndActionObject.nameWindowToFocus
        nameWindowToBack = ChangeFocusAndActionObject.nameWindowToBack
        windowsWhereExecute = ChangeFocusAndActionObject.windowsWhereExecute
        executeOnTarget = ChangeFocusAndActionObject.executeOnTarget

        newHotKey={
            "key_to_active_auto_hot_keys": keyToActiveHotKey,
            "hot_key_name": nameHotKey,
            "hot_key_description": description,
            "key_to_press_when_focused": keyToPressWhenFocused,
            "window_name_to_focus": nameWindowToFocus,
            "window_name_to_back": nameWindowToBack,
            "windows_where_execute": windowsWhereExecute,
            "execute_on_target": executeOnTarget,
            "flexible_search": flexibleSearch,
        }

        storagedHotKeys:list=self._jsonHandler.read_json()["allStorage"]
        storagedHotKeys.append(newHotKey)
        
        self._jsonHandler.update_json("allStorage",storagedHotKeys)
    def getAllHoyKeys(self):
        return self._jsonHandler.read_json()["allStorage"]
    
    def rawStorageHotKey(self, hotKeysDict:dict):
        self._jsonHandler.update_json("allStorage",hotKeysDict)


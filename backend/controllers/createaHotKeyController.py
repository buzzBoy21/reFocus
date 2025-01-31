from server.requestInfo import RequestInfo
from model.hotKeys import HotKey
from service.changeFocusAndAction import ChangeFocusAndAction
from service.windowUtils import WindowUtils
from service.storageOrRecoverHotKey import StorageOrRecoverHotKey
from config.settings import generalSettings

import json
def createaHotKeyController(parameterRequest:RequestInfo):
    """
        This is used when you want create a new Hot Key controller by APIREST
    """

    paramBody=parameterRequest.fromBody()
    key_to_active_fuction=paramBody["key_to_active_auto_hot_keys"]
    hot_key_name=paramBody["hot_key_name"]
    hot_key_description=paramBody.get("hot_key_description","")

    key_to_press_when_focus = paramBody["key_to_press_when_focused"]
    window_name_to_focus = paramBody["window_name_to_focus"]
    window_name_to_back = paramBody.get("window_name_to_back","")
    windows_where_execute = paramBody.get("windows_where_execute",[])
    execute_on_target = paramBody.get("execute_on_target",False)
    flexible_search=paramBody.get("flexible_search",False)
    flexible_search_to_back=paramBody.get("flexible_search_to_back",False)

    try:
        #detect if key_to_active_fuction have alt or ctrl
        modifierKeys = "ctrl" in key_to_active_fuction or "alt" in key_to_active_fuction
        
        fuctionToExecute=ChangeFocusAndAction(key_to_press_when_focus,
                                                window_name_to_focus,
                                                window_name_to_back,
                                                windows_where_execute,
                                                execute_on_target,
                                                modifierKeys,
                                                flexible_search,
                                                flexible_search_to_back)
        
        newHotKey=HotKey.createAndAddToHotKeyList(key_to_active_fuction,
                                fuctionToExecute.executeReFocus,
                                hot_key_name,
                                hot_key_description)
        
        handlerStorageNewHotKey=StorageOrRecoverHotKey(generalSettings["dbFile"])

        handlerStorageNewHotKey.storageHotKey(fuctionToExecute,newHotKey)

        return json.dumps({"response":True})
    except Exception as genericException:
        return json.dumps({"response":False})
        pass

    
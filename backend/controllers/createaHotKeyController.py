from server.requestInfo import RequestInfo
from model.hotKeys import HotKey
from service.changeFocusAndAction import ChangeFocusAndAction
from service.windowUtils import WindowUtils
import json
def createaHotKeyController(parameterRequest:RequestInfo):
    

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

    existWindowsToFocus= WindowUtils.WindowExist(window_name_to_focus,flexible_search)

    #detect if key_to_active_fuction have alt or ctrl
    modifierKeys = "ctrl" in key_to_active_fuction or "alt" in key_to_active_fuction

    if(existWindowsToFocus):

        fuctionToExecute=ChangeFocusAndAction(key_to_press_when_focus,
                                              existWindowsToFocus,
                                              window_name_to_back,
                                              windows_where_execute,
                                              execute_on_target,
                                              modifierKeys)
        HotKey.createAndAddToHotKeyList(key_to_active_fuction,
                                fuctionToExecute.executeReFocus,
                                hot_key_name,
                                hot_key_description)
        return json.dumps({"response":True})
    else:
        return json.dumps({"response":False})

    
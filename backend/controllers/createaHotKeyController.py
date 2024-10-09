from server.requestInfo import RequestInfo
from model.hotKeys import HotKey
from service.changeFocusAndAction import ChangeFocusAndAction
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

    fuctionToExecute=ChangeFocusAndAction(key_to_press_when_focus,window_name_to_focus,window_name_to_back,windows_where_execute,execute_on_target)
    hotKey=HotKey.createAndAddToHotKeyList(key_to_active_fuction,
                               fuctionToExecute.executeReFocus,
                               hot_key_name,
                               hot_key_description)

    HotKey.addToHotKeyList(hotKey)
    
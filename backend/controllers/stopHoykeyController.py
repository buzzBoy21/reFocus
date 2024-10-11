import json
from server.requestInfo import RequestInfo
from model.hotKeys import HotKey
def stopHotKeyController(parameterRequest:RequestInfo):
    result={"response":False}
    identificator=parameterRequest.fromUrl().get('hot-key-identificator',"")
    print(identificator)
    if identificator != "":
        hotkeyObject:HotKey =HotKey.searchHotKey(int(identificator))
        #if the hoy key is stopped return False
        result['response']=hotkeyObject.stopHotKey()
        
    return json.dumps(result)
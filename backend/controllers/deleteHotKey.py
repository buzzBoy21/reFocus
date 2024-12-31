from server.requestInfo import RequestInfo
from model.hotKeys import HotKey
from service.changeFocusAndAction import ChangeFocusAndAction
from service.windowUtils import WindowUtils
from service.storageOrRecoverHotKey import StorageOrRecoverHotKey
from config.settings import generalSettings
import json




def deleteHotKey(parameterRequest:RequestInfo):
    
    hotKeyToEliminate=parameterRequest.fromBody()
    print("es",hotKeyToEliminate)
    handleStoragedHotKeys = StorageOrRecoverHotKey(generalSettings["dbFile"])
    print(2)
    allHotKeys:list = handleStoragedHotKeys.getAllHoyKeys()
    print(3)
    
    #hotKey != hotKeyToEliminate is true when you copy the hotKey into resultHotKeys
    resultHotKeys = [hotKey for hotKey in allHotKeys if hotKey != hotKeyToEliminate]
    print(4)

    handleStoragedHotKeys.rawStorageHotKey(resultHotKeys)
    print(5)

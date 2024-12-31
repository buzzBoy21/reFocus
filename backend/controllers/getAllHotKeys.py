import json
from server.requestInfo import RequestInfo
from model.hotKeys import HotKey
from service.storageOrRecoverHotKey import StorageOrRecoverHotKey
from config.settings import generalSettings

def getAllHotKeys(parameterRequest:RequestInfo):
    inputOutPutHandler = StorageOrRecoverHotKey(generalSettings["dbFile"])
    allHoyKeys= inputOutPutHandler.getAllHoyKeys()
    
    return json.dumps(allHoyKeys)
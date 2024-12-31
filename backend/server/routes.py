from controllers.getAllWindowsNamesController import geAllWindowsNamesController
from controllers.createaHotKeyController import createaHotKeyController
from controllers.stopHoykeyController import stopHotKeyController
from controllers.getAllHotKeys import getAllHotKeys
from controllers.deleteHotKey import deleteHotKey

GETroutes={
    "/get-all-windows-names":geAllWindowsNamesController,
    "/stop-hot-key":stopHotKeyController,
    "/get-all-hot-keys":getAllHotKeys,
}

POSTroutes={
    "/create-hot-key":createaHotKeyController,
    "/delete-hot-key":deleteHotKey
}

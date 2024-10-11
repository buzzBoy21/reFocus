from controllers.getAllWindowsNamesController import geAllWindowsNamesController
from controllers.createaHotKeyController import createaHotKeyController
from controllers.stopHoykeyController import stopHotKeyController

GETroutes={
    "/get-all-windows-names":geAllWindowsNamesController,
    "/stop-hot-key":stopHotKeyController,
}

POSTroutes={
    "/create-hot-key":createaHotKeyController
}

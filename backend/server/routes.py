from controllers.getAllWindowsNames import geAllWindowsNames
from controllers.createaHotKeyController import createaHotKeyController
GETroutes={
    "/get-all-windows-names":geAllWindowsNames,
    
}

POSTroutes={
    "/create-hot-key":createaHotKeyController
}

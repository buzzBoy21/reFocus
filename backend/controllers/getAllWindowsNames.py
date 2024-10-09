import pygetwindow as gw
import json
def geAllWindowsNames():
    windows = gw.getAllWindows()

    windowsNames=[]
    for window in windows:
        if window.title != "":
            windowsNames.append(window.title)
    return json.dumps(windowsNames)
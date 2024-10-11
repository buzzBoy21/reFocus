import json
from service.windowUtils import WindowUtils
def geAllWindowsNamesController():
    return json.dumps(WindowUtils.getAllWindowsNames())
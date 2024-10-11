import pygetwindow as gw
class WindowUtils():
    @staticmethod
    def getAllWindowsNames()->dict:
        windows= gw.getAllWindows()
        windowsNames=[]
        for window in windows:
            if window.title != "":
                windowsNames.append(window.title)
        return windowsNames
    
    @staticmethod
    def getActiveWindowName():
        return gw.getActiveWindow().title
    
    @staticmethod
    def WindowExist(windowName:str,flexibleSearch:bool)->str | int:
        """
            Parameter meaning:
            - windowName: The window you want to check for existence.
            - flexibleSearch:
                - true  : It will check whether the windowName parameter is found within the same window name and stop when the first match is found. This is do it with lower case character
                - false : It only matches when the windowName value is completely the same as another window's name.

            Return:
            - windowName: str -> If it exists.
            - False -> If it does not exist.
        """
        windowsNames=WindowUtils.getAllWindowsNames()

        if(flexibleSearch):
            windowName=windowName.lower()

            for windowSystemName in windowsNames:

                if(windowName in windowSystemName.lower()):
                    return windowSystemName
        else:

            for windowSystemName in windowsNames:
                if(windowName==windowSystemName):
                    return windowSystemName

        return False
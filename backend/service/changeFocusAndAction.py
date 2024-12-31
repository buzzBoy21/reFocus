
from pywinauto import Application
import time
import keyboard
from .windowUtils import WindowUtils


class ChangeFocusAndAction():
    def __init__(self,keyToPressWhenFocused:str,nameWindowToFocus:str,nameWindowToBack:str="",windowsWhereExecute:list[str]=[], executeOnTarget=False,modifierKeys=False,flexibleSearch=True):
        """
            Parameters' meaning :
            - keyToPressWhenFocused: Keys to press automatically on the windows which will be focused. -> obligatory
            - nameWindowToFocus: windows name to focus -> obligatory
            - nameWindowToBack: windows name to back -> optional
            - windowsWhereExecute: windows where is allowed execute reFocus -> optional : DefaultValue:without names
            - executeOnTarget: If you want that refocus execute on the traget focus -> optional: DefaultValue:False
            - modifierKeys: If you will use a hotKey which active by modifierKeys (ctrl, alt): read why in _changeFocusAndAction function
        """
        self.keyToPressWhenFocused = keyToPressWhenFocused
        self.nameWindowToFocus = nameWindowToFocus
        self.nameWindowToBack = nameWindowToBack
        self.windowsWhereExecute:list[str]=windowsWhereExecute
        self.executeOnTarget=executeOnTarget  
        self.modifierKeys=modifierKeys
    def executeReFocus(self):
        """
            Contains the condition that allows or denies the execution of the reFocus action.
        """
        canbeExecute=True

        # If enter in this conditional -> means you don't want execute the keysToPress when you focus on the nameWindowToFocus
        if not self.executeOnTarget:
            # if you are on the window taht is the target don't execute _changeFocusAndAction
            canbeExecute=not self._focusedOverWindowToFocus()
        print("can be execute", canbeExecute) 

        if canbeExecute :
                
            #This conditional let execute 
            # if you dont specify any windowsWhereExecute
            # or 
            # if you specify some windowsWhereExecute you have to focus one of the windowsWhereExecute to execute _changeFocusAndAction
            if len(self.windowsWhereExecute)==0 or self._focusedOnWindowsWhereExecute():

                    self._changeFocusAndAction()
                        
    def _changeFocusAndAction(self):
        """
            Principal action of refocus, change windows, execute the key, and back to other window
        """
        try:
            app = Application().connect(title=self.nameWindowToFocus)
            window = app.window(title=self.nameWindowToFocus)
            window.set_focus()

            #Why this? -> read under
            if self.modifierKeys:
                #I have to use this flag because if you press a modifier Key/s + anotherKey/s, 
                # when the SO will detected the press ctrl if you dont realease before the execution of keyboard.press(self.keyToPressWhenFocused)
                # and the SO DETECT you PRESS the keyToPressWhenFocused and the modifier Key/s


                # its necesary realease at least the modifier you press, but I release ctrl, alt to not decrease the reading experience and less complexity
                # simulate the release of key
                               
                keyboard.send("ctrl",do_release=True, do_press=False)
                keyboard.send("alt",do_release=True, do_press=False)
                keyboard.send(self.keyToPressWhenFocused,do_press=True,do_release=True)

            else:
                keyboard.send(self.keyToPressWhenFocused,do_press=True,do_release=True)

            if self.nameWindowToBack != "":
                app = Application().connect(title=self.nameWindowToBack)
                window2 = app.window(title=self.nameWindowToBack)
                window2.set_focus()

        except Exception as e:
            print(f"Error: {str(e)}")
            raise Exception("general error in changeFocusAndAction.py") from e
        
    def _focusedWindowTitle()->str:
        """
        Return the name of windows which you are focusing
        """
        return WindowUtils.getActiveWindowName()

    def _focusedOverWindowToFocus(self):
        """
        Tell you if SO are focusing over the target Window, this is the windows will be focused
        """

        if ChangeFocusAndAction._focusedWindowTitle() ==self.nameWindowToFocus:
            return True
        return False

    def _focusedOnWindowsWhereExecute(self):
        for eachWindow in self.windowsWhereExecute:
            if eachWindow== self._focusedWindowTitle():
                return True
        return False
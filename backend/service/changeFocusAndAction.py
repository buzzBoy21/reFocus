
from pywinauto import Application
import time
import keyboard
from .windowUtils import WindowUtils


class ChangeFocusAndAction():
    def __init__(self,keyToPressWhenFocused:str,nameWindowToFocus:str,nameWindowToBack:str="",windowsWhereExecute:list[str]=[], executeOnTarget=False,modifierKeys=False):
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
        self.windowsWhereExecute=windowsWhereExecute
        self.executeOnTarget=executeOnTarget  
        self.modifierKeys=modifierKeys
    def executeReFocus(self):
        """
            Contains the condition that allows or denies the execution of the reFocus action.
        """
        # this means you want execute the keysToPress when you focus the windows
        canbeExecute=True
        if not self.executeOnTarget:
            # if you are on the window which is the target don't execute
            canbeExecute=not self._focusedOverWindowToFocus()
            print(canbeExecute,"canbeexecute",self._focusedOverWindowToFocus())
        print(canbeExecute,"canbeexecute") 
        if canbeExecute :
                
                #This conditional let execute if thre is no windowsWhereExecute or there are windowsWhereExecute avoid execute when you aren't on the windowsWhereExecute
                if len(self.windowsWhereExecute)==0 or self.windowsWhereExecute==self._focusedWindowTitle():

                        self._changeFocusAndAction()
                        
    def _changeFocusAndAction(self):
        """
            Principal action of refocus
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
                keyboard.press(self.keyToPressWhenFocused)

            else:
                keyboard.press(self.keyToPressWhenFocused)
                 
            
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
        print("aaaaaa",ChangeFocusAndAction._focusedWindowTitle(),self.nameWindowToFocus)

        if ChangeFocusAndAction._focusedWindowTitle() ==self.nameWindowToFocus:
            return True
        return False


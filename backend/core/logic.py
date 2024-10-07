from utils  import parseInfo,focusedWindowTitle
from pywinauto import Application
import pyautogui as auto
from pynput import keyboard
import pygetwindow as gw


class keyBoardLogic:

    def __init__(self,chainKeys:str,keyToPressWhenFocused:str,nameWindowToFocus:str,nameWindowToBack:str='',windowsWhereExecute:str=True):
        self.chainKeys = chainKeys
        self.DEDAULT_VALUE_KEYS = chainKeys
        self.keyToPressWhenFocused = keyToPressWhenFocused
        self.nameWindowToFocus = nameWindowToFocus
        self.nameWindowToBack = nameWindowToBack
        self.ignoreKey=False
        self.windowsWhereExecute=windowsWhereExecute
       

    def handleLogicPressed(self,key):
        #ignoreKey is true when you have press all and when dont execute reFocus 
        # and
        # if you are on the window which is the target don't execute
        if not self.ignoreKey and not self._focusedOverWindowToFocus():
            #This conditional will avoid change the value of chainKeys[index]["value"] when you aren't on the windowsWhereExecute, if you select the windowsWhereExecute
            if self.windowsWhereExecute==True or self.windowsWhereExecute==focusedWindowTitle():
                
                for index,objectKey in enumerate(self.chainKeys):

                    for eachConditionalValue in objectKey["keys"]:
                        # If the keys is false the interprete change the value to false and go out of loop 
                        
                        print("Pasa todos los filtros. tecla pulsada-> ",key)
                        print("Pasa todos los filtros. Condicional de tecla pulsada-> ",eachConditionalValue)
                        print("Resultado de conditional",key == eachConditionalValue)
                        if key == eachConditionalValue:
                            #If never go here the objectKey["value"] is True then that key is pressed
                            # when is false the key is not pressed
                            if not self.chainKeys[index]["value"]:
                                
                                self.chainKeys[index]["value"]=True                    

                print("al presionar tecla->",self.chainKeys)

                if self._allKeysPressed():
                    self._changeFocusAndAction()
        
    def handleLogicReleased(self,key):
        if self.ignoreKey:
            self.ignoreKey = False

        
        for index,objectKey in enumerate(self.chainKeys):

            for eachConditionalValue in objectKey["keys"]:
                # If the keys is false the interprete change the value to false and go out of loop 
                if key == eachConditionalValue:
                    #If never go here the objectKey["value"] will be always True
                    # when is false
                    if self.chainKeys[index]["value"]:

                        self.chainKeys[index]["value"]=False 
        print("al soltar tecla->",self.chainKeys)

    def _allKeysPressed(self):
        # ingnoreKey is True means before the hot-keys was preesed 
        if self.ignoreKey:
            return False
        # when self.chainKeys has all value True return True or else False
        
        for eachKey in self.chainKeys:
            if not eachKey['value']:
                return False
            
        self.ignoreKey = True
        return True
    
    def _changeFocusAndAction(self):
        try:
            app = Application().connect(title=self.nameWindowToFocus)
            window = app.window(title=self.nameWindowToFocus)
            window.set_focus()
          
            auto.press(self.keyToPressWhenFocused)
            
            # if self.nameWindowToBack != '':
            #     app = Application().connect(title=self.nameWindowToBack)
            #     window2 = app.window(title=self.nameWindowToBack)
            #     window2.set_focus()
            #     auto.press('backspace')

  
        except Exception as e:
            print("---------------------------------------------------------------------------")
            print(f"Error: {str(e)}")
            print("---------------------------------------------------------------------------")

            pass

    def _focusedOverWindowToFocus(self):
        """
        Tell you if SO are focusing over the target Window, this is the windows will be focused
        """
        if focusedWindowTitle() ==self.nameWindowToFocus:
            return True
        return False
 
 
 
firstWindow="💥¿Qué es el BITCOIN y como funciona? 🪙| 📢¿Cuánto vale y cómo INVERTIR en BITCOIN?🎯 - YouTube - Brave"
seconsWIndows="known_hosts - Notepad"

elementos=parseInfo('a+enter')
ketController= keyBoardLogic(elementos,'playpause',firstWindow,seconsWIndows)

def block_key():

    with keyboard.Listener(on_press=ketController.handleLogicPressed,on_release=ketController.handleLogicReleased) as listener:
        listener.join()
        
block_key()

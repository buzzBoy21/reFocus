from types import FunctionType
import keyboard

class HotKey:
    hotKeys = set()  # Class attribute
    lastId = 0  # Class attribute

    def __init__(self, keysToPress: str, functionToExecute: FunctionType, nameHotKey, description):
        # let listen the keyboard
        self.listenerHotKey = keyboard.add_hotkey(keysToPress, functionToExecute,suppress=True,trigger_on_release=True)
        self.nameHotKey = nameHotKey
        self.description = description
        HotKey.lastId += 1
        self.identificator = HotKey.lastId
        self.isStoped=False

        #These tow atributtes only is used to remake with startHotKeyAgain fuction
        # this is for the elimination of object by fuction keyboard.remove_hotkey(self.listenerHotKey)
        self.keysToPress=keysToPress
        self.functionToExecute=functionToExecute
    
    @staticmethod
    def addToHotKeyList(hotKey):
        HotKey.hotKeys.add(hotKey)
    
    @staticmethod
    def amountHotKeys():
        return len(HotKey.hotKeys)
    
    @staticmethod
    def searchHotKey(searcherBy:str|int)-> any:
        """
        Search into HotKey.hotKeys the hotkey by name or id\n

        return:\n
        - HotKey: if Hotkey was found\n
        - False: if HotKey was not found\n
        """
        print("buscar",searcherBy)
        if type(searcherBy) is str:
            for hotkey in HotKey.hotKeys:
                #searcherBy is string
                if searcherBy in hotkey.nameHotKey:
                    return hotkey
            return False
        elif type(searcherBy) is int:
            for hotkey in HotKey.hotKeys:
                #searcherBy is ID
                if searcherBy == hotkey.identificator:
                    return hotkey
            return False
        else:
            raise TypeError("function searchHotKey only allow like parameter : str or int")
    
    @staticmethod
    def createAndAddToHotKeyList(keysToPress,fuction,nameHotKey,descriptionHotKey)-> 'HotKey':    
        """
        Creates a new HotKey instance and adds it to the HotKey list.

        Return the hot key has been created
        """
        print("dentro1")
        print(keysToPress)
        print(fuction)
        print(nameHotKey)
        print(descriptionHotKey)
        newHotKey=HotKey(keysToPress,fuction,nameHotKey,descriptionHotKey)
        print("dentro2")

        HotKey.addToHotKeyList(newHotKey)
        print("dentro3")

        return newHotKey
    def beginAllListenerKeyboard(self):
        keyboard.wait(suppress=True)
  
    def stopHotKey(self)->bool:
        """
        return:
            - True -> if action do it
            - False -> if action do not it
        """
        if self.isStoped==False:
            #Removes a previously hooked hotkey. Must be called with the value returned by add_hotkey
            keyboard.remove_hotkey(self.listenerHotKey)
            #remove the reference
            self.listenerHotKey=None
            self.isStoped=True
            return True
        else:
            return False
    def startHotKeyAgain(self):
         self.listenerHotKey= keyboard.add_hotkey(self.keysToPress, self.functionToExecute,suppress=True)
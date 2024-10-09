from types import FunctionType
import keyboard

class HotKey:
    hotKeys = set()  # Class attribute
    lastId = 0  # Class attribute

    def __init__(self, keysToPress: str, functionToExecute: FunctionType, nameHotKey, description):
        # let listen the keyboard
        self.listenerHotKey = keyboard.add_hotkey(keysToPress, functionToExecute,suppress=True)
        self.nameHotKey = nameHotKey
        self.description = description
        HotKey.lastId += 1
        self.identificator = HotKey.lastId
    
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
        if type(searcherBy) is str:
            for hotkey in HotKey.hotKeys:
                if searcherBy in hotkey.nameHotKey:
                    return hotkey
            return False
        elif type(searcherBy) is int:
            for hotkey in HotKey.hotKeys:
                if searcherBy in hotkey.identificator:
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
        newHotKey=HotKey(keysToPress,fuction,nameHotKey,descriptionHotKey)
        HotKey.addToHotKeyList(newHotKey)
        return newHotKey
    def beginAllListenerKeyboard(self):
        keyboard.wait()
    
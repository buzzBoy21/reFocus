from pynput import keyboard
import unicodedata
import pygetwindow as gw

def parseInfo(chainCharacters:str):
    #this variable will by 
    conditionalVariable=[]
    arrayAllCharacter=chainCharacters.split('+')

    switch = {
        #generic keys to Mac or Linux or Windows
        'capsLock': {"keys": [keyboard.Key.caps_lock], "value": False},
        'tab': {"keys": [keyboard.Key.tab], "value": False},
        
        'enter': {"keys": [keyboard.Key.enter], "value": False},
        'backspace': {"keys": [keyboard.Key.backspace], "value": False},
        
        'SO': {"keys": [keyboard.Key.cmd], "value": False},  # Si 'SO' se refiere a otra tecla, cámbiala aquí.
        
        'space': {"keys": [keyboard.Key.space], "value": False},
        
        'insert': {"keys": [keyboard.Key.insert], "value": False},
        'home':{"keys": [keyboard.Key.home], "value": False},
        'home':{"keys": [keyboard.Key.end], "value": False},
        'page_up':{"keys": [keyboard.Key.page_up], "value": False},
        'page_down':{"keys": [keyboard.Key.page_down], "value": False},
        'delete':{"keys": [keyboard.Key.delete], "value": False},
        'num_lock':{"keys": [keyboard.Key.num_lock], "value": False},
        
        #arrows
        'arrow_up': {"keys": [keyboard.Key.up], "value": False},
        'arrow_down': {"keys": [keyboard.Key.down], "value": False},
        'arrow_left': {"keys": [keyboard.Key.left], "value": False},
        'arrow_right': {"keys": [keyboard.Key.right], "value": False},
        

        'ctrl': {"keys": [keyboard.Key.ctrl_r, keyboard.Key.ctrl_l], "value": False},
        'ctrl_l': {"keys": [keyboard.Key.cmd_l], "value": False},
        'ctrl_r': {"keys": [keyboard.Key.ctrl_r], "value": False},
        'shift': {"keys": [keyboard.Key.shift_l, keyboard.Key.shift_r], "value": False}, 
        'shift_r': {"keys": [keyboard.Key.shift_r], "value": False},
        'shift_l': {"keys": [keyboard.Key.shift_l], "value": False},

        #mac
        'comand':{"keys": [keyboard.Key.cmd_l, keyboard.Key.cmd_r], "value": False},
        'comand_l':{"keys": [keyboard.Key.cmd_l], "value": False},
        'comand_r':{"keys": [keyboard.Key.cmd_r], "value": False},
    }

    # Recorrer cada elemento de la cadena y verificar en el "switch"
    for letterIndex in range(len(arrayAllCharacter)):
        key = arrayAllCharacter[letterIndex]
        if key in switch:
            conditionalVariable.append(switch[key])
        else:
            conditionalVariable.append({"keys":[keyboard.KeyCode.from_char(key)],"value":False})
    return conditionalVariable


def focusedWindowTitle()->str:
    """
    Return the name of windows which you are focusing
    """
    return gw.getActiveWindow().title
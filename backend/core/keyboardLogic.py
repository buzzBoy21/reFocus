from pywinauto import Application
import pyautogui as auto
import keyboard

def changeFocusAndAction():
    firstWindow="💥¿Qué es el BITCOIN y como funciona? 🪙| 📢¿Cuánto vale y cómo INVERTIR en BITCOIN?🎯 - YouTube - Brave"

    try:
        app = Application().connect(title=firstWindow)
        window = app.window(title=firstWindow)
        window.set_focus()
        
        auto.press('space')
        
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

# Define la acción cuando se detecta la combinación 'ctrl + a'
hotKey=keyboard.add_hotkey('ctrl+a', changeFocusAndAction)

# Mantén el programa corriendo
keyboard.wait('esc')  # Espera hasta que se presione 'esc'
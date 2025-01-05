import keyboard

print("press esc to exit")

def on_key_event(event):
    print(f"pressed key:'{event.name}'")

# Escucha eventos de teclas presionadas.
keyboard.hook(on_key_event,True)

# Mantén el programa corriendo hasta que se presione la tecla 'esc'.
keyboard.wait('esc')

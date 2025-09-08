import random
from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.label import Label

class NumerosDeLaSuerte(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(orientation='vertical', padding=20, spacing=10, **kwargs)
        self.titulo = Label(
            text="Tus 20 opciones de la suerte para hoy\nLotería Nacional Dominicana", 
            font_size=22, halign="center"
        )
        self.add_widget(self.titulo)

        self.resultado = Label(
            text="", 
            font_size=22, 
            halign="center", 
            valign="middle",
            size_hint=(1, .3)
        )
        self.add_widget(self.resultado)

        self.generar_btn = Button(
            text="Generar Números", 
            font_size=20, 
            size_hint=(1, .2), 
            background_color=(0.4, 0.74, 0.55, 1)
        )
        self.generar_btn.bind(on_press=self.generar_numeros)
        self.add_widget(self.generar_btn)

        self.resp = Label(
            text="¡Juega siempre con responsabilidad!", 
            font_size=16, 
            color=(.5, .5, .5, 1)
        )
        self.add_widget(self.resp)

        self.generar_numeros()

    def generar_numeros(self, *args):
        numeros = set()
        while len(numeros) < 20:
            n = f"{random.randint(0, 99):02d}"
            numeros.add(n)
        numeros_ordenados = sorted(numeros)
        self.resultado.text = ", ".join(numeros_ordenados)

class NumerosDeLaSuerteApp(App):
    def build(self):
        return NumerosDeLaSuerte()

if __name__ == '__main__':
    NumerosDeLaSuerteApp().run()
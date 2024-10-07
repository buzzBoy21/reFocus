
from http.server import BaseHTTPRequestHandler
import inspect

class HandleRoute:
    httpRquest=""
    def __constructor__(self,httpRequest:BaseHTTPRequestHandler):
        self.httpRquest=httpRequest

    @staticmethod
    def _makeHeader(self):
        HandleRoute.httpRquest.send_header("content-Type", "text/plain")
        HandleRoute.httpRquest.end_headers()

    @staticmethod
    def _makeBody(self,value:str):
        HandleRoute.wfile.write(value.encode())

    
    def createHandler(self,function):
        def core():
            try:
                HandleRoute._makeHeader()
                
                # if fuction return something
                if inspect.getsource(function):
                    HandleRoute._makeBody(function())
                else:
                    HandleRoute._makeBody("")

                
            #When fuction is don't return the correct type
            except AttributeError  as e:
                HandleRoute._makeHeader(f"Error: Probably happend for wrong type return of fuction:\n{e}")
                pass
        return core
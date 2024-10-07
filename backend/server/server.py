from http.server import BaseHTTPRequestHandler
import inspect
from backend.exceptions.serverExceptions import OneOrZeroAtributtes

def caca():
    return "pinocho"
def pipi(cacatua):

    return f"{1+2}"


class HandleServer(BaseHTTPRequestHandler):  
    routeGet = {'/caca/pinocho':caca,'/caca':pipi}
    routePost = {'':True}
  


    def initServer(self):
        self.server.serve_forever()

    def _stopServer(self):
        self.server.shutdown()
        print("server shutdowned")

    def _makeHeader(self):
        self.send_header("content-Type", "application/json")
        self.end_headers()

    def _makeBody(self,value:str):
        self.wfile.write(value.encode())

    def _okResponse(self):
        self.send_response(200)

    def _wrongResponse(self,message:str,code:int=400,explain="No explications"):
        self.send_error(code,message,explain)

    def do_GET(self):
        try:
            #get the handle with key name
            handler = self.routeGet.get(self.path)

            sig = inspect.signature(handler)
         
        
            paramsFuctionDeclarated={}
            # list all params of declaration fucction
            for name,param in sig.parameters.items():
                paramsFuctionDeclarated[name]=param

           
            parameterAmount=len(paramsFuctionDeclarated)
            # if there is one handle
            if handler:
                if parameterAmount==0:
                    self._okResponse()
                    self._makeHeader()
                    
                    # if fuction return something
                    self._makeBody(handler())
                elif parameterAmount==1:
                    self._okResponse()
                    self._makeHeader()
                    
                    # if fuction return something
                    self._makeBody(handler(self))
                else:
                    raise OneOrZeroAtributtes(f"the fuction which is writed in json GET must have 0 or 1 parameter\n If you write one is to get the url parameter")
                
            else:
                self._wrongResponse("Not Found url",404)
            #When fuction is don't return the correct type
            
        except AttributeError  as typeException:
            print(f"Error: Probably happend for wrong type return of fuction:\n{typeException}")
            self._wrongResponse(f"Error: Probably happend for wrong type return of fuction:\n{typeException}",400)
            pass
        except OneOrZeroAtributtes  as oneOrZeroAtributtes:
            print(f"Error:\n{oneOrZeroAtributtes}")
            self._wrongResponse(f"Error:\n{oneOrZeroAtributtes}",400)
            pass
        except Exception  as genericException:
            print(f"Error:\n{genericException}")
            self._wrongResponse(f"Error:\n{genericException}",400)
            pass


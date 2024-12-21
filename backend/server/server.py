from http.server import BaseHTTPRequestHandler
import inspect
from typing import Any
from exceptions.serverExceptions import OneOrZeroAtributtes
from server.routes import GETroutes,POSTroutes

from server.requestInfo import RequestInfo


class HandleServer(BaseHTTPRequestHandler):  
    getRoutes = GETroutes
    postRoutes = POSTroutes
  
    def end_headers(self):
           # Agregar encabezado Content Security Policy
        super().end_headers()
        self.send_header("Content-Security-Policy", 
        "default-src 'self'; "
        "connect-src 'self' http://localhost:5173" 
        "script-src 'self'; "
        "style-src 'self'; " 
        "img-src 'self' data:; " 
        "font-src 'self';")
        # Agregar encabezados CORS
        self.send_header("Access-Control-Allow-Origin", "*")  # Permitir todos los orígenes (cambia '*' por tu origen específico si es necesario)
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")  # Métodos permitidos
        self.send_header("Access-Control-Allow-Headers", "Content-Type")  # Encabezados permitidos

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
        self.send_response(code)
        self.send_header('Content-Type', 'text/plain')
        self.end_headers()
        self.wfile.write(f"{message}\n{explain}".encode())

    def _buildAllResponse(self,routes:dict[str, Any]):
        #get the handle fuction when the route has params
        hasUrlAttr= '?' in self.path
        if hasUrlAttr:
            endpointWithOutAttr=self.path.split('?')[0]
            handler= routes.get(endpointWithOutAttr)
        else:
            
            #get the handle with key name
            handler = routes.get(self.path)

        paramsFuctionDeclarated={}
        
        #get the internal atributtes of declarated function 
        sig = inspect.signature(handler)
        # list all params of declaration fucction
        for name,param in sig.parameters.items():
            paramsFuctionDeclarated[name]=param

        
        parameterAmount=len(paramsFuctionDeclarated)
        # if there is one handle
        if handler:
            if parameterAmount==0:
                self._okResponse()
                self._makeHeader()
                
                result=handler()

                # if fuction return nothing
                if result == None:
                    self._makeBody("")
                else:
                    self._makeBody(result)

            elif parameterAmount==1:
                self._okResponse()
                self._makeHeader()
                
                result=handler(RequestInfo(self))

                # if fuction return nothing
                if result == None:
                    self._makeBody("")
                else:
                    self._makeBody(result)

            else:
                raise OneOrZeroAtributtes(f"the fuction which is writed in json GET must have 0 or 1 parameter\n If you write one is to get the url parameter")
            
        else:
            self._wrongResponse("Not Found url",404)

    def do_GET(self):
        try:
            self._buildAllResponse(self.getRoutes)

        #When fuction is don't return the correct type    
        except AttributeError  as typeException:
            print(f"Error: Probably happend for wrong type return of fuction:\n{typeException}")
            self._wrongResponse(f"Error: Probably happend for wrong type return of fuction:\n{typeException}",400)
            pass
        
        except OneOrZeroAtributtes  as oneOrZeroAtributtes:
            print(f"Error:\n{oneOrZeroAtributtes}")
            self._wrongResponse(f"Error:\n{oneOrZeroAtributtes}",400)
            pass 
        except TypeError as endointDontExist:
            print(f"Error:\n{endointDontExist}")
            self._wrongResponse(f"Error in Server.py: Probably the endpoint you wrote is wrong or you wrote wrong the http method\n{endointDontExist}",400)
        except Exception  as genericException:
            print(f"Error type<Exception> in server.py:{genericException}")
            self._wrongResponse(f"Error:\n{genericException}",400)
            pass
    
    def do_POST(self):
        try:
            
            self._buildAllResponse(self.postRoutes)

        #When fuction is don't return the correct type
        except AttributeError  as typeException:
            print(f"Error in Server.py: Probably happend for wrong type return of fuction you must return string:\n{typeException}")
            self._wrongResponse(f"Error in Server.py: Probably happend for wrong type return of fuction you must return string:\n{typeException}",400)
            pass
        except OneOrZeroAtributtes  as oneOrZeroAtributtes:
            print(f"Error:\n{oneOrZeroAtributtes}")
            self._wrongResponse(f"Error in Server.py:\n{oneOrZeroAtributtes}",400)
            pass
        except TypeError as endointDontExist:
            print(f"Error:\n{endointDontExist.__doc__}")
            self._wrongResponse(f"Error in Server.py: Probably the endpoint you wrote is wrong or you wrote wrong the http method\n{endointDontExist}",400)
        except Exception  as genericException:
            print(f"Error:\n{genericException}")
            self._wrongResponse(f"Error type<Exception> in Server.py:\n{genericException}",400)
            pass
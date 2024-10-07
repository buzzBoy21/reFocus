
from typing import TYPE_CHECKING
import json
if TYPE_CHECKING:
    from backend.server.server import HandleServer  # import only when iterpreter is checking types

class RequestInfo:

    def __init__(self,request:'HandleServer'):
        self.request=request

    def fromUrl(self):
        path_parts = self.request.path.split('?')
        query = path_parts[1] if len(path_parts) > 1 else '' 

        # Procesar los parámetros de la consulta
        query_params = {}
        if query:
            for param in query.split('&'):
                key_value = param.split('=')
                if len(key_value) == 2:
                    key = key_value[0]
                    value = key_value[1]
                    query_params[key] = value
        return query_params
    
    def fromBody(self):
        content_length = int(self.request.headers['Content-Length'])
        
        # if there is no body, i dont so this python throw an Error-> Expecting value: line 1 column 1 (char 0)
        bodyValue=self.request.rfile.read(content_length).decode()
        if bodyValue =="":
            body={}
        else:
            body = json.loads(bodyValue)
            
     
        post_params = {}
        if body:
            for key, value in body.items():
                 post_params[key] = value

        return post_params
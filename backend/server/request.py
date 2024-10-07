from server import HandleServer

class RequestInfo:
    request=None
    def __init__(request:HandleServer):
        RequestInfo.request=request

    @staticmethod
    def fromUrl():
        path_parts = RequestInfo.request.path.split('?')
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
    
    @staticmethod
    def fromUrl():
        content_length = int(RequestInfo.headers[''])

        body = RequestInfo.rfile.read(content_length).decode()

        post_params = {}
        if body:
            for param in body.split('&'):
                key_value = param.split('=')
                if len(key_value) == 2:
                    key = key_value[0]
                    value = key_value[1]
                    post_params[key] = value
        return post_params
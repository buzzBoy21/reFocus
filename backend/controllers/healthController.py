from server.requestInfo import RequestInfo
import json
def healthController(parameterRequest:RequestInfo):
    return json.dumps({"response":True})
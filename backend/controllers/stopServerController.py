import sys
import json
def stopServerController():
    try:
        return json.dumps({"response":True})
    finally:
        sys.exit()
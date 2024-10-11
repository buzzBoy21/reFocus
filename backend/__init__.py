__version__ = "0.1.0"

from server.server import HandleServer
from http.server import HTTPServer
from service.storageOrRecoverHotKey import StorageOrRecoverHotKey
from config.settings import generalSettings

"""
Backend module for the project.

This package contains the server and exception handling modules.
"""
host = "localhost"
port = 8080

handlerRecoverLastHotKey=StorageOrRecoverHotKey(generalSettings["dbFile"])
handlerRecoverLastHotKey.reCreateAllHotKeys()
server=HTTPServer((host, port), HandleServer)
print("hola")
server.serve_forever()


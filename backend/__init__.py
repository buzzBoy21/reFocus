__version__ = "0.1.0"

from server.server import HandleServer
from http.server import HTTPServer
  

"""
Backend module for the project.

This package contains the server and exception handling modules.
"""
host = "localhost"
port = 8080

server=HTTPServer((host, port), HandleServer)
print("hola")
server.serve_forever()




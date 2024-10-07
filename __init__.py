__version__ = "0.0.3"

from backend.server.server import HandleServer
from http.server import HTTPServer
  

"""
Backend module for the project.

This package contains the server and exception handling modules.
"""
host = "localhost"
port = 8080

server=HTTPServer((host, port), HandleServer)

server.serve_forever()

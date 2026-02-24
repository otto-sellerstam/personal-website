"""Showcases `one_ring_http` to build a simple HTTP server."""

import ssl

from one_ring_http.router import Router
from one_ring_http.server import HTTPServer
from one_ring_http.static import static_handler
from one_ring_loop import run

ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain("dev-cert.pem", "dev-key.pem")

router = Router()

router.set_fallback(static_handler("./static"))

server = HTTPServer(router=router, host="127.0.0.1", port=8000, ssl_context=ssl_context)

run(server.serve())

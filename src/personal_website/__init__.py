"""Personal website server built on one-ring-http."""

from __future__ import annotations

import ssl
from collections.abc import Generator
from typing import TYPE_CHECKING

from one_ring_http.request import Request
from one_ring_http.router import Router
from one_ring_http.server import HTTPServer
from one_ring_http.static import static_handler
from one_ring_loop import run

if TYPE_CHECKING:
    from pathlib import Path

    from one_ring_http.response import Response
    from one_ring_http.typedef import HTTPHandler
    from one_ring_loop.typedefs import Coro

_HTTP_NOT_FOUND = 404


def _invoke_handler(
    handler: HTTPHandler,
    request: Request,
) -> Coro[Response]:
    """Invokes an HTTPHandler, handling both generator and plain return types."""
    result = handler(request)
    if isinstance(result, Generator):
        return (yield from result)
    return result


def spa_static_handler(root: str | Path) -> HTTPHandler:
    """Wraps static_handler with SPA fallback to index.html for client-side routing."""
    _static = static_handler(root)

    def handler(request: Request) -> Coro[Response]:
        response = yield from _invoke_handler(_static, request)
        # If 404 and path has no file extension, serve index.html for SPA routing
        last_segment = request.path.rsplit("/", 1)[-1]
        if response.status_code == _HTTP_NOT_FOUND and "." not in last_segment:
            index_request = Request(
                method="GET",
                path="/",
                http_version=request.http_version,
                headers=request.headers,
                body=b"",
            )
            response = yield from _invoke_handler(_static, index_request)
        return response

    return handler


ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ssl_context.load_cert_chain("dev-cert.pem", "dev-key.pem")

router = Router()

router.set_fallback(spa_static_handler("./static"))

server = HTTPServer(router=router, host="127.0.0.1", port=8000, ssl_context=ssl_context)

run(server.serve())

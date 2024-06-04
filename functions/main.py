from firebase_functions import https_fn, options
from api import process_call
from typing import Any


@https_fn.on_request(
    region="europe-west1",
    cors=options.CorsOptions(cors_origins="*", cors_methods=["post"]),
    timeout_sec=120,
    memory=options.MemoryOption.MB_512,
    enforce_app_check=True
)
def query(req: https_fn.Request) -> Any:
    if req.method != "POST":
        return https_fn.Response(status=403, response="Forbidden")

    body_data = req.get_json(silent=True)
    response, status = process_call(body_data)
    return response

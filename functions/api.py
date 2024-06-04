from ai import ask, gpt4, get_tables_prompt
from io import StringIO


def _get_response(msg, status, df=None):
    return {
        "message": msg,
        "data": [] if df is None else df.to_dict('records'),
        "columns": [] if df is None else list(df.columns),
    }, status


def process_call(body_data):
    if body_data is None or "message" not in body_data:
        return _get_response("Wrong request.", 400)

    user_input = body_data["message"]
    find_tables_prompt = get_tables_prompt.replace("{user_input}", user_input)
    tables = gpt4.predict(find_tables_prompt).strip()
    if "NA" in tables:
        response = "My apologies, I do not have the information you are looking for."
        return _get_response(response, 200)

    tables_to_use = [t.strip() for t in tables.split(",")]
    print("Using table", tables_to_use[0])
    try:
        # response = ask(user_input)
        response, df = ask(user_input, tables_to_use[:1])
        print("Response", response)
        return _get_response(response, 200, df)
    except Exception as e:
        print(e)
        response = "I wasn't able to assist you with your request. Please rephrase the question and try again."
        return _get_response(response, 200)

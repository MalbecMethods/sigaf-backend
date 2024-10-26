import flask
from flask import request, jsonify



import ia

app = flask.Flask(__name__)

@app.route("/", methods=["POST"])
def test_ia():
    message = request.get_json()["titles"]
    chat_session = ia.model.start_chat(history=[])
    response = ia.send_message(chat_session, message)
    return jsonify(response.text)

# Start the server
if __name__ == "__main__":
    app.run(host="localhost", port=5000)

    print("Server running on port 5000")




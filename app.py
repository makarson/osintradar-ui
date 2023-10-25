from flask import Flask, render_template, request, jsonify
from osintradar import osintradar
app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/api/search', methods=['POST'])
async def search():
    response = osintradar(request.form.get('keyword'))

    return jsonify(response)

if __name__ == '__main__':
    app.run()

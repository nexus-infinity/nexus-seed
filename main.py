import os

app = Flask(__name__)

@app.route('/')
def home():
    return 'Welcome to Nexxus_Seed!'

if __name__ == '__main__':
    app.run(debug=True, port=os.getenv('PORT', 5000))

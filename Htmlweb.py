from flask import Flask, render_template, request, jsonify
import json
import numpy as np
from tensorflow import keras
from sklearn.preprocessing import LabelEncoder
import random
import pickle

app = Flask(__name__)

# Load chatbot model and data
model = keras.models.load_model('chat_model')

with open('tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

with open('label_encoder.pickle', 'rb') as enc:
    lbl_encoder = pickle.load(enc)

max_len = 25

with open("data_set.json") as file:
    data = json.load(file)

def get_bot_response(user_input):
    sequences = tokenizer.texts_to_sequences([user_input])
    padded_sequences = keras.preprocessing.sequence.pad_sequences(sequences, truncating='post', maxlen=max_len)
    result = model.predict(padded_sequences)
    tag = lbl_encoder.inverse_transform([np.argmax(result)])[0]

    for intent in data['intents']:
        if intent['tag'] == tag:
            response = np.random.choice(intent['responses'])
            return response

    return "I'm not sure how to respond to that."

@app.route('/')
def index():
    return render_template('tobe.html')
    


@app.route('/ask', methods=['POST'])
def ask():
    user_input = request.form['user_input']
    response = get_bot_response(user_input)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import face_recognition
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/compare-faces', methods=['POST'])
def compare_faces():
    try:
        print("Headers:", request.headers)
        print("Form Data Keys:", request.files.keys())

        # Retrieve files from request
        if 'image1' not in request.files or 'image2' not in request.files:
            print("Error: Missing image files")
            return jsonify({'error': 'Missing image files'}), 400

        image1 = request.files['image1']
        image2 = request.files['image2']

        # Save images temporarily
        image1_path = 'temp_image1.jpeg'
        image2_path = 'temp_image2.jpeg'
        image1.save(image1_path)
        image2.save(image2_path)

        # Load and process the images
        img1 = face_recognition.load_image_file(image1_path)
        img2 = face_recognition.load_image_file(image2_path)
        print('Images loaded successfully')

        # Get face encodings for the detected face locations
        face_encodings1 = face_recognition.face_encodings(img1)
        face_encodings2 = face_recognition.face_encodings(img2)

        if not face_encodings1:
            print("Error: No faces detected in image1.")
            return jsonify({'error': 'No faces detected in image1.'}), 400
        if not face_encodings2:
            print("Error: No faces detected in image2.")
            return jsonify({'error': 'No faces detected in image2.'}), 400

        face_encoding1 = face_encodings1[0]
        face_encoding2 = face_encodings2[0]

        # Compare the faces
        results = face_recognition.compare_faces([face_encoding1], face_encoding2)
        match = results[0]

        result = {
            'match': bool(match)
        }
        print(result)
        # Clean up temporary files
        os.remove(image1_path)
        os.remove(image2_path)

        return jsonify(result)

    except IndexError:
        print("Error: IndexError occurred, possibly no faces detected.")
        return jsonify({'error': 'Face encoding failed, possibly no faces detected.'}), 400
    except Exception as e:
        print("Error: Exception occurred", str(e))
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
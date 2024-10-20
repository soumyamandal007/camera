First , Go to cameraApp

cd cameraApp

write this command , npx expo start -c.   Install expo in your machine. Install Expo Go app in your mobile device.

Then , through the Expo Go application in your Mobile scan the QR code.

Your Frontend is running

Now go to Backend, cd .. and cd backend 

Install python 3.9 .
Create a virtual environment , python3.9 -m venv .venv
Activate the environment , source .venv/bin/activate (mac)

pip install flask flask-cors face-recognition

python app.py 

Create a ngrok account and follow the procedure in the offical documentation.
For macos,
brew install ngrok
ngrok config add-authtoken <TOKEN>
ngrok http http://localhost:5000

Then copy the address from [Forwarding                    https://84c5df474.ngrok-free.dev] to cameraApp/components/CameraComponent.tsx file's 
sendImagesToBackend function's axios post request 
const response = await axios.post(
        "https://dde9-2600-1700-5459-e800-ec07-76dc-29c2-6773.ngrok-free.app/compare-faces",
        formData,
        axiosConfig
      );

Then open your Expo Go app in mobile device and go to Details tab at the bottom. Click Go to Camera . and take your picture and wait for it. 

formData.append("image1", {
      uri: "https://drive.google.com/uc?export=download&id=1topSUm9CU_hXuTSnlggBBfCizhZp96D1",
      name: "image1.jpeg",
      type: "image/jpeg",
    } as any);


    here in the uri section you can put remote url of you picture's gdrive downloadable format and try it.
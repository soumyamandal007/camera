import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function CameraTab() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [photo, setPhoto] = useState<string | null>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const fileName = `${FileSystem.documentDirectory}photo_${Date.now()}.jpg`;
      if (photo) {
        await FileSystem.moveAsync({
          from: photo.uri,
          to: fileName,
        });
      } else {
        // Handle the case when photo is undefined
      }
      setPhoto(fileName);
      console.log("Taking the picture", fileName);
      await savePhotoURI(fileName);
      await sendImagesToBackend(fileName);
    }
  }
  async function sendImagesToBackend(photoUri: string) {
    let formData = new FormData();
    formData.append("image1", {
      uri: "https://drive.google.com/uc?export=download&id=1topSUm9CU_hXuTSnlggBBfCizhZp96D1",
      name: "image1.jpeg",
      type: "image/jpeg",
    } as any);
    formData.append("image2", {
      uri: photoUri, // The URI of the captured image
      name: "image2.jpeg",
      type: "image/jpeg",
    } as any);
    console.log("FormData being sent:", formData);
    const axiosConfig = {
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = await axios.post(
        "http://192.168.1.88:5000/compare-faces",
        formData,
        axiosConfig
      );
      console.log("Backend response:", response.data);
      showMatchResult(response.data.match);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error message:", error.message);
        console.error("Axios error code:", error.code);
        console.error(
          "Axios error response:",
          error.response ? error.response.data : "No response data"
        );
        console.error("Axios error config:", error.config);
      } else {
        console.error("General error sending images to backend:", error);
      }
    }
  }
  function showMatchResult(isMatch: boolean) {
    if (isMatch) {
      alert("The faces match!");
    } else {
      alert("The faces do not match.");
    }
  }
  async function savePhotoURI(uri: string) {
    try {
      const existingPhotos = await AsyncStorage.getItem("photos");
      const photoArray = existingPhotos ? JSON.parse(existingPhotos) : [];
      photoArray.push(uri);
      await AsyncStorage.setItem("photos", JSON.stringify(photoArray));
    } catch (error) {
      console.error("Error saving photo URI:", error);
    }
  }

  return (
    <View style={styles.container}>
      {photo ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => setPhoto(null)}
          >
            <Text style={styles.text}>Take Another</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Take Picture</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  previewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    width: "100%",
    height: "80%",
    resizeMode: "contain",
  },
});

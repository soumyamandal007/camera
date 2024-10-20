// File: app/camera/index.tsx

import { StyleSheet, View, Text } from "react-native";
import React from "react";
import CameraTab from "@/components/CameraComponent"; // Assuming CameraTab is the camera functionality

const CameraComponent = () => {
  return (
    <View style={styles.container}>
      <CameraTab />
    </View>
  );
};

export default CameraComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

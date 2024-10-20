import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import CameraComponent from "@/components/CameraComponent";

const Details = () => {
  return (
    <View>
      <Text>Profile Verification</Text>
      <Link href="/verification" style={{ color: "blue", padding: 10 }}>
        Go to Verification Camera
      </Link>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({});

import { useState, useEffect } from "react";
import { View, StyleSheet, Image, FlatList, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GalleryTab() {
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    loadPhotos();
  }, []);

  async function loadPhotos() {
    try {
      const storedPhotos = await AsyncStorage.getItem("photos");
      if (storedPhotos) {
        setPhotos(JSON.parse(storedPhotos));
      }
    } catch (error) {
      console.error("Error loading photos:", error);
    }
  }

  return (
    <View style={styles.container}>
      {photos.length > 0 ? (
        <FlatList
          data={photos}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
          numColumns={2}
          contentContainerStyle={styles.gallery}
        />
      ) : (
        <Text style={styles.message}>No photos to display</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  gallery: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
    resizeMode: "cover",
    borderRadius: 10,
  },
  message: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
  },
});

import React from "react";
import { Image } from "react-native";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GOOGLE_MAP_API } from "@env";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  console.log("key:", GOOGLE_MAP_API);
  return (
    <SafeAreaView style={tw``}>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/800px-Uber_logo_2018.png",
        }}
        style={{
          width: 100,
          height: 100,
          paddingLeft: 100,
          resizeMode: "contain",
        }}
      />
      <GooglePlacesAutocomplete
        placeholder="Where From?"
        styles={{ container: { flex: 0 }, textInput: { fontSize: 18 } }}
        minLength={2}
        onPress={(data, details) => console.log(data, details)}
        query={{
          key: GOOGLE_MAP_API,
          language: "en",
        }}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        onFail={(error) => console.log(error)}
      />

      <NavOptions />
    </SafeAreaView>
  );
};

export default HomeScreen;

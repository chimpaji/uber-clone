import React from "react";
import { Image } from "react-native";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GOOGLE_MAP_API } from "@env";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../slices/NavSlice";
import NavFavorite from "../components/NavFavorite";

const HomeScreen = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw``}>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Uber_logo_2018.png/800px-Uber_logo_2018.png",
        }}
        style={{
          width: 100,
          height: 100,
          marginLeft: 20,
          resizeMode: "contain",
        }}
      />
      <GooglePlacesAutocomplete
        placeholder="Where From?"
        styles={{ container: { flex: 0 }, textInput: { fontSize: 18 } }}
        minLength={2}
        returnKeyType="search"
        enablePoweredByContainer={false}
        onPress={(data, details = null) => {
          console.log(
            "data=>",
            data.description,
            "details=>",
            details?.geometry?.location
          );
          dispatch(
            setOrigin({
              location: details?.geometry?.location,
              description: data?.description,
            })
          );
          dispatch(setDestination(null));
          //place location address detail: data.description
          //lat long obejct: details?.geometry?.location
        }}
        query={{
          key: GOOGLE_MAP_API,
          language: "en",
        }}
        fetchDetails={true}
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={400}
        onFail={(error) => console.log(error)}
      />

      <NavOptions />
      <NavFavorite />
    </SafeAreaView>
  );
};

export default HomeScreen;

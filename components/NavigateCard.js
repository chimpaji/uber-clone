import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import tw from "tailwind-react-native-classnames";
import { setDestination } from "../slices/NavSlice";
import { GOOGLE_MAP_API } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import NavFavorite from "./NavFavorite";
import { Icon } from "react-native-elements";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const destination = useSelector((state) => state.nav.destination);
  const origin = useSelector((state) => state.nav.origin);

  return (
    <SafeAreaView style={tw`bg-white`}>
      <Text style={tw`text-center py-5 text-xl`}>Good Morning Chimpaji</Text>
      <View style={tw`border-t border-gray-200 bg-white`}>
        <View style={tw`bg-white`}>
          <GooglePlacesAutocomplete
            placeholder="Where To?"
            styles={toInputBoxStyles}
            minLength={2}
            enablePoweredByContainer={false}
            returnKeyType="search"
            onPress={(data, details = null) => {
              console.log("origin=>", origin, "destination=>", destination);
              console.log(
                "data=>",
                data.description,
                "details=>",
                details?.geometry?.location
              );
              dispatch(
                setDestination({
                  location: details?.geometry?.location,
                  description: data?.description,
                })
              );
              //place location address detail: data.description
              //lat long obejct: details?.geometry?.location
              navigation.navigate("RideOptionsCard");
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
          <NavFavorite />
        </View>
        <View style={tw`flex-row justify-evenly items-center w-full  py-2`}>
          <TouchableOpacity
            disabled={!destination ? true : false}
            onPress={() => {
              navigation.navigate("RideOptionsCard");
            }}
            style={tw`flex-row bg-black justify-center items-center w-24 p-4 rounded-full`}
          >
            <Icon type="font-awesome" name="car" color="white" size={16} />
            <Text style={tw` pl-2 text-white`}>Rides</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`flex-row  justify-center items-center w-24 p-4 rounded-full`}
          >
            <Icon
              type="ionicon"
              name="fast-food-outline"
              color="black"
              size={16}
            />
            <Text style={tw`pl-2 `}>Eats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});

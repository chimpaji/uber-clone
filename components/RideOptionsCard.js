import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";

const data = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiple: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiple: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiple: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState("");
  const travelTimeInformation = useSelector(
    (state) => state.nav.travelTimeInformation
  );
  return (
    <View style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={tw`absolute top-4 left-5 z-20`}
        >
          <Icon style="font-awesome" name="chevron-left" color="black" />
        </TouchableOpacity>
        <Text style={tw`text-center font-bold py-3 text-xl`}>
          Select a Ride
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiple, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-10 ${
              id === selected.id && "bg-gray-200"
            }`}
          >
            <Image
              source={{ uri: image }}
              style={{ width: 100, height: 100, resizeMode: "contain" }}
            />
            <View style={tw`-ml-6 flex items-center`}>
              <Text style={tw`text-xl font-bold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration?.text}</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat("en-gb", {
                style: "currency",
                currency: "GBP",
              }).format(
                (travelTimeInformation?.duration.value *
                  SURGE_CHARGE_RATE *
                  multiple) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      {selected?.id && (
        <TouchableOpacity style={tw``}>
          <Text style={tw`text-center text-white bg-black py-4 mb-6`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RideOptionsCard;

import { useNavigation } from "@react-navigation/core";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { useDispatch, useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import { setOrigin, setDestination } from "../slices/NavSlice";

const data = [
  {
    id: "123",
    icon: "home",
    location: "Home",
    originDes: "1a Goldsmiths Row, London E2 8QA, United Kingdom",
    originLoc: { lat: 51.53275231249163, lng: -0.06596005633085544 },
    destinationDes: "Code Street,London, UK",
    destinationLoc: {
      lat: 51.52255219316495,
      lng: -0.07081274386177669,
    },
  },
  {
    id: "456",
    icon: "briefcase",
    location: "Office",
    originDes:
      "Unit 1, Coin Street Neighbourhood Centre, 108 Stamford St, London SE1 9NH, United Kingdom",
    originLoc: { lat: 51.50634591632486, lng: -0.11066034755588214 },
    destinationDes: "London Eye,London, UK",
    destinationLoc: {
      lat: 51.5034241685664,
      lng: -0.11956443036813683,
    },
  },
];

const NavFavorite = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const ori = useSelector((state) => state.nav.origin);
  const dest = useSelector((state) => state.nav.destination);

  console.log("origin=>", ori);
  console.log("destinaiton=>", dest);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({
        item: {
          location,
          icon,
          destinationDes,
          destinationLoc,
          originDes,
          originLoc,
        },
      }) => (
        <TouchableOpacity
          style={tw`flex-row items-center p-5 border-b border-gray-200`}
          onPress={() => {
            dispatch(
              setOrigin({ location: originLoc, description: originDes })
            );
            dispatch(
              setDestination({
                location: destinationLoc,
                description: destinationDes,
              })
            );

            if (ori && dest) navigation.navigate("MapScreen");
          }}
        >
          <Icon
            name={icon}
            type="ionicon"
            color="white"
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            size={18}
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destinationDes}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavorite;

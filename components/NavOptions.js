import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const orgin = useSelector((state) => state.nav.origin);
  return (
    <FlatList
      style={tw`pl-5`}
      data={data}
      contentContainerStyle={{ justifyContent: "center" }}
      horizontal
      keyExtractor={(data) => data.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 h-60 `}
          disabled={!orgin ? true : false}
        >
          <View>
            <Image
              source={{ uri: item.image }}
              style={{ width: 120, height: 120, resizeMode: "contain" }}
            />
            <Text style={tw`font-bold mt-2 text-lg`}>{item.title}</Text>
            <Icon
              type="antdesign"
              name="arrowright"
              color="white"
              style={tw`mt-2 p-2 w-10 bg-black rounded-full`}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;

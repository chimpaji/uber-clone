import { useNavigation } from "@react-navigation/core";
import React from "react";
import { TouchableOpacity } from "react-native";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "tailwind-react-native-classnames";

const RideOptionsCard = () => {
  const navigation = useNavigation();
  return (
    <View style={tw`bg-white flex-grow pt-0 mt-0`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-4 left-5`}
          onPress={() => {
            navigation.navigate("NavigateCard");
          }}
        >
          <Icon style="font-awesome" name="chevron-left" color="black" />
        </TouchableOpacity>
        <Text style={tw`text-center font-bold py-3 text-xl`}>
          Select a Ride
        </Text>
      </View>
    </View>
  );
};

export default RideOptionsCard;

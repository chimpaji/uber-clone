import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";

const Map = () => {
  const origin = useSelector((state) => state?.nav?.origin);
  const { location, description } = origin;
  console.log(origin);
  return (
    <MapView
      style={tw`flex flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      <Marker
        coordinate={{ latitude: location.lat, longitude: location.lng }}
        title="Origin"
        identifier="origin"
        description={description}
        pinColor="#474744"
      />
    </MapView>
  );
};

export default Map;

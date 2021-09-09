import React, { useEffect, useRef } from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import tw from "tailwind-react-native-classnames";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAP_API } from "@env";

const Map = () => {
  const origin = useSelector((state) => state?.nav?.origin);
  const destination = useSelector((state) => state?.nav?.destination);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100,
      },
    });
  }, [origin, destination]);
  return (
    <MapView
      ref={mapRef}
      style={tw`flex flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin?.location?.lat,
        longitude: origin?.location?.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && (
        <Marker
          coordinate={{
            latitude: origin?.location?.lat,
            longitude: origin?.location?.lng,
          }}
          title="Origin"
          identifier="origin"
          description={origin?.description}
          pinColor="#000000"
        />
      )}
      {destination && (
        <Marker
          coordinate={{
            latitude: destination?.location?.lat,
            longitude: destination?.location?.lng,
          }}
          title="Destination"
          identifier="destination"
          description={destination?.description}
          pinColor="#000000"
        />
      )}
      {origin && destination && (
        <MapViewDirections
          lineDashPattern={[0]}
          origin={origin?.description}
          destination={destination?.description}
          apikey={GOOGLE_MAP_API}
          strokeColor="black"
          strokeWidth={3}
        />
      )}
    </MapView>
  );
};

export default Map;

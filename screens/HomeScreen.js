import React from "react";
import { View, Text } from "react-native";
import SideMenu from "../components/SideMenu";

export default function HomeScreen({ navigation }) {
  return (
    <SideMenu navigation={navigation}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>HOME SCREEN</Text>
      </View>
    </SideMenu>
  );
}

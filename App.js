// App.js
import 'react-native-gesture-handler';
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as NavigationBar from "expo-navigation-bar";

import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import ListsScreen from "./screens/ListsScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setBackgroundColorAsync("#6A1B9A");
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Main app */}
        <Stack.Screen name="Home" component={HomeScreen}  />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="Lists" component={ListsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomePage from "./screens/HomePage";
import WeeklyPage from "./screens/WeeklyPage";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomePage} />
        <Drawer.Screen name="Weekly" component={WeeklyPage} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

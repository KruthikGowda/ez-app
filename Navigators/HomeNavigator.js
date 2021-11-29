import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProductContainer from "../Screens/Prodcuts/ProductContainer";
import SingleProduct from "../Screens/Prodcuts/SingleProduct";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ProductContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDeatils"
        component={SingleProduct}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default function HomeNavigator() {
  return <MyStack />;
}
